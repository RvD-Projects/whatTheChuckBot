/**
* $$$$$$$\  $$\                                               $$\       $$$$$\  $$$$$$\        $$\ 
* $$  __$$\ \__|                                              $$ |      \__$$ |$$  __$$\       $$ |
* $$ |  $$ |$$\  $$$$$$$\  $$$$$$$\  $$$$$$\   $$$$$$\   $$$$$$$ |         $$ |$$ /  \__|      $$ |
* $$ |  $$ |$$ |$$  _____|$$  _____|$$  __$$\ $$  __$$\ $$  __$$ |         $$ |\$$$$$$\        $$ |
* $$ |  $$ |$$ |\$$$$$$\  $$ /      $$ /  $$ |$$ |  \__|$$ /  $$ |   $$\   $$ | \____$$\       \__|
* $$ |  $$ |$$ | \____$$\ $$ |      $$ |  $$ |$$ |      $$ |  $$ |   $$ |  $$ |$$\   $$ |          
* $$$$$$$  |$$ |$$$$$$$  |\$$$$$$$\ \$$$$$$  |$$ |      \$$$$$$$ |$$\\$$$$$$  |\$$$$$$  |      $$\ 
* \_______/ \__|\_______/  \_______| \______/ \__|       \_______|\__|\______/  \______/       \__| 
*/

import {
    Client,
    Collection,
    Interaction,
    ClientEvents,
    ThreadChannelType,
    ApplicationCommandDataResolvable
} from "discord.js";
import { client, ytFetch } from "..";
import { PathLike } from "fs";
import { resolve } from "path";
import { Event } from "./Event";
import { readdir, stat } from "node:fs/promises";
import { CommandType } from "../typings/Command";
import { AppLogger } from "../tools/class/AppLogger";
import { RegisterCommandsOptions } from "../typings/client";


export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    clientsloggers: Collection<string, AppLogger> = new Collection();
    devlogger: AppLogger = new AppLogger('dev', process.env.botToken);
    applogger: AppLogger = new AppLogger('app', process.env.botToken, 'warn');

    constructor() {
        super({ intents: 32767 });
    }

    async start() {
        await this.registerModules();
        await this.registerBaseListener();

        await this.login(process.env.botToken);
        this.emit("warn", "\n\n|--------Bot is online!--------|\n\n");

        await ytFetch.getVideos();
        setInterval(async () => await ytFetch.getVideos(), 3600000);
    }


    async registerModules() {

        // Register Event Listeners from events _dir
        await this.registerEventListerFromDir(`${__dirname}/../events/`);

        // Commands
        const slashCommands = await this.getSlashCommandsFromDir(`${__dirname}/../commands/`);


        this.on("ready", async () => {
            let ids = process.env.guildIds.split(',');
            await ids.forEach(id => {
                this.registerCommands({
                    commands: slashCommands,
                    guildId: id
                });
                this.addClientLogger(id);
            });
        });
    }

    async registerBaseListener() {

        this.on('interactionCreate', (i) => {
            let id = i?.guildId;
            if (this.clientsloggers?.has(id)) {
                let clientLogger = this.clientsloggers.get(id).logger;
                this.clientInteractionInfos(i, clientLogger);
            }
        });

        this.on("debug", (m) => {
            console.debug(m);
            this.devlogger?.logger?.info(m);
        });

        this.on("warn", (m) => {
            console.warn(m);
            this.applogger?.logger?.warn(m);
            this.devlogger?.logger?.warn(m);
        });

        this.on("error", (m) => {
            console.error(m);
            this.applogger?.logger?.error(m);
            this.devlogger?.logger?.error(m);
        });
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            this.emit('warn', `Registering ${commands.length} commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            this.emit('warn', "Registering ${commands.length} global commands");
        }
    }


    resolveLogtoClient(id: string, message: string) {
        this.logToClient(id, message);
    }

    addClientLogger(id: string) {
        if (!this.clientsloggers?.has(id)) {
            this.clientsloggers.set(id, new AppLogger('client', id, 'info'));
            this.emit('debug', `Your Client-logger: is online!`);
            this.emit('warn', `Client-logger ${id}: is online!`);
        }
        else {
            this.emit('warn', "Logger " + id + " already in the collection...");
            this.emit('debug', "This logger already have a stream...");
        }
    }

    logToClient(id: string, message: string) {
        if (this.clientsloggers?.has(id)) {
            this.emit('debug', `Login to client ${id}: ` + message)
            this.clientsloggers.get(id).logger.info(message);
        }
    }

    async getSlashCommandsFromDir(dirPath: PathLike) {

        const slashCommands: ApplicationCommandDataResolvable[] = [];

        // Get all files from commands _dir
        const commandFiles = await this.getFiles(dirPath)
            .then(files => { console.warn(files); return files })
            .catch(e => console.error(e));

        await commandFiles?.forEach(async (filePath: string) => {

            const regex = /^[^.]+\.js$|^[^.]+\.ts$/gm;
            let match = regex.exec(filePath);
            if (!match) return;

            const command: CommandType = await this.importFile(filePath);

            if (!command.name) return;

            this.emit('debug', JSON.stringify(command));
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });
        return await slashCommands;
    }

    async registerEventListerFromDir(dirPath: PathLike) {

        // Get all files from events _dir
        const eventFiles = await this.getFiles(dirPath)
            .then(files => { console.warn(files); return files })
            .catch(e => console.error(e));

        await eventFiles.forEach(async (filePath) => {

            const regex = /^[^.]+\.js$|^[^.]+\.ts$/gm;
            let match = regex.exec(filePath);
            if (!match) return;

            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);
        });
    }

    async getCommandsHelp(): Promise<string> {
        let str: string = "Here's the list of my available slash commands: \n\n";
        this.commands.forEach(element => {
            str += "Command: /" + element.name + "\n";
            str += "Description: " + element.description + "\n\n";
        });

        str += `Certaines commandes ne sont pas terminées [N.A.] ou sont en version [BETA]. Regardez les decriptions.
[N.A.] => Commande qui n'est simplement pas encore devloppée.
[BETA] => Commande qui peut travailler, mais n'est pas complétement terminée ou elle pourrrait échouée.\n\n`;

        str += `Some command are not yet finnished [BETA] or implemented [N.A.]
[N.A.] => Command that is not yet implemented.
[BETA] => Command that can be run but could encounter some errors.\n\n`;
        return str;
    }


    /**
    *  __  ___     __  __              __        __         __                                  __    __   __                  __      __          __        __
    * /  |/  /__  / /_/ /_  ____  ____/ /____   / /_  ___  / /___ _      __   _________  __  __/ /___/ /  / /_  ___     ____ _/ /___  / /_  ____ _/ /____   / /
    * / /|_/ / _ \/ __/ __ \/ __ \/ __  / ___/  / __ \/ _ \/ / __ \ | /| / /  / ___/ __ \/ / / / / __  /  / __ \/ _ \   / __ `/ / __ \/ __ \/ __ `/ / ___/  / / 
    * / /  / /  __/ /_/ / / / /_/ / /_/ (__  )  / /_/ /  __/ / /_/ / |/ |/ /  / /__/ /_/ / /_/ / / /_/ /  / /_/ /  __/  / /_/ / / /_/ / /_/ / /_/ / (__  )  /_/  
    * /_/  /_/\___/\__/_/ /_/\____/\__,_/____/  /_.___/\___/_/\____/|__/|__/   \___/\____/\__,_/_/\__,_/  /_.___/\___/   \__, /_/\____/_.___/\__,_/_/____/  (_)   
    *                                                                                                                   /____/
    */


    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async getFiles(dir) {
        const subdirs = await readdir(dir);

        const files = await Promise.all(subdirs.map(async (subdir) => {
            const res = resolve(dir, subdir);
            return (await stat(res)).isDirectory() ? this.getFiles(res) : res;
        }));
        return await files.reduce((a, f) => a.concat(f), []);
    }

    async findGuildChannel(name: string, type: "GUILD_CATEGORY" | "GUILD_NEWS" | "GUILD_STAGE_VOICE" | "GUILD_STORE" | "GUILD_TEXT" | ThreadChannelType | "GUILD_VOICE") {
        return await client.channels.cache.find(c => c.type === type && c.name === name);
    }


    //TODO: Parse as Json or JsonStringified
    clientInteractionInfos(interaction: Interaction, logger: Console) {
        let message: string = "";
        message += String("\n\nNEW " + interaction.type + " INTERACTION: " + interaction.id);
        message += String("\n   Interaction-TS: " + interaction.createdTimestamp);
        message += String("\n   User: " + interaction.member.user.username);
        message += String("\n       ID: " + interaction.member.user.id);

        message += String("\n   Guild: " + interaction.guild.name);
        message += String("\n       ID: " + interaction.guild.id);

        message += String("\n\n       Logged-Members: ");
        let members = interaction.guild.presences.cache;
        members.forEach(member => {
            message += String("\n           ID: " + member.user.id);
            message += String("\n           User: " + member.user.username);
        });

        message += String("\n\n       All-Members: ");
        let members2 = interaction.guild.members.cache;
        members2.forEach(member => {
            message += String("\n           ID: " + member.user.id);
            message += String("\n           User: " + member.user.username);
        });

        logger.info(message);
    }
}
