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
    GatewayIntentBits,
    Partials
} from "discord.js";
import { client, ytFetch } from "..";
import { PathLike } from "fs";
import { resolve } from "path";
import { Event } from "./Event";
import { readdir, stat } from "node:fs/promises";
import { CommandType } from "../typings/Command";
import { AppLogger } from "./Loggers/AppLogger";
import { RegisterCommandsOptions } from "../typings/Client";
import { getDirectories, getFiles } from "../helpers/Helpers";


export class AppClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    clientsLoggers: Collection<string, AppLogger> = new Collection();
    devLogger: AppLogger = new AppLogger('dev', process.env.botToken);
    appLogger: AppLogger = new AppLogger('app', process.env.botToken, 'warn');

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessages
            ],
            partials: [Partials.Channel],
        });
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
        await this.registerEventListenerFromDir(`${__dirname}/../events/`);

        // Commands
        const coreCommands = await this.getSlashCommandsFromDir(`${__dirname}/../commands/`);
        const pluginsCommands = await this.registerPlugins();

        const publics = [...coreCommands.publics, ...pluginsCommands.publics];
        const privates = [...coreCommands.privates, ...pluginsCommands.privates];

        this.on("ready", async () => {
            try {
                await this.registerCommands({ commands: publics });
                const guildIds = process.env.guildIds.split(',');

                for (let i = 0; i < guildIds.length; i++) {
                    await this.registerCommands({
                        commands: privates,
                        guildId: guildIds[i]
                    });
                }
            } catch (error) {
                console.error("On ready error:", error)
            }
        });
    }

    async registerPlugins() {
        const publics = [];
        const privates = [];

        // Get all plugins directories
        const pluginBasePath = `${__dirname}/../../plugins/`;
        const pluginsDirectories = await getDirectories(pluginBasePath);

        if (!pluginsDirectories?.length) {
            console.warn("No plugins found:", pluginBasePath);
            return { publics, privates };
        }

        // Register event listeners and get commands definitions
        for (let i = 0; i < pluginsDirectories.length; i++) {
            const pluginDir = pluginsDirectories[i];
            console.info("\nLoading plugin:", pluginDir);

            await this.registerEventListenerFromDir(`${pluginDir}\\events`);
            const { publics: plu, privates: pri } = await this.getSlashCommandsFromDir(`${pluginDir}\\commands`);
            publics.push(plu);
            privates.push(pri);
        }

        return { publics, privates };
    }

    async registerBaseListener() {
        this.on('interactionCreate', (i) => {
            let id = i?.guildId;
            if (this.clientsLoggers?.has(id)) {
                let clientLogger = this.clientsLoggers.get(id).logger;
                this.clientInteractionInfos(i, clientLogger);
            }
        });

        this.on("debug", (m) => {
            console.debug(m);
            this.devLogger?.logger?.info(m);
        });

        this.on("warn", (m) => {
            console.warn(m);
            this.appLogger?.logger?.warn(m);
        });

        this.on("error", (m) => {
            console.error(m);
            this.appLogger?.logger?.error(m);
        });
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.info(`\nRegistered ${commands.length} commands to ${guildId}`);
            return;
        }

        this.application?.commands.set(commands);
        console.info(`Registered ${commands.length} global commands\n`);
    }

    addClientLogger(id: string) {
        if (!this.clientsLoggers?.has(id)) {
            this.clientsLoggers.set(id, new AppLogger('client', id, 'info'));
            this.emit('debug', `Your Client-logger: is online!`);
            this.emit('warn', `Client-logger ${id}: is online!`);
        }
        else {
            this.emit('warn', "Logger " + id + " already in the collection...");
            this.emit('debug', "This logger already have a stream...");
        }
    }

    logToClient(id: string, message: string) {
        if (this.clientsLoggers?.has(id)) {
            this.emit('debug', `Login to client ${id}: ` + message)
            this.clientsLoggers.get(id).logger.info(message);
        }
    }

    async getSlashCommandsFromDir(dirPath: PathLike) {

        const publics: CommandType[] = [];
        const privates: CommandType[] = [];

        // Get all files from commands _dir
        const commandFiles = await getFiles(dirPath);

        if (!commandFiles?.length) {
            console.warn("No commands found:", dirPath);
            return { publics, privates };
        }

        for (let i = 0; i < commandFiles.length; i++) {
            const filePath = commandFiles[i];

            const regex = /^[^.]+\.js$|^[^.]+\.ts$/gm;
            let match = regex.exec(filePath);
            if (!match) return;

            const command: CommandType = await this.importFile(filePath);

            if (!command.name) return;

            this.emit('debug', JSON.stringify(command));
            this.commands.set(command.name, command);
            command.public
                ? publics.push(command)
                : privates.push(command);
        }

        return { publics, privates };
    }

    async registerEventListenerFromDir(dirPath: PathLike) {

        // Get all files from events _dir
        const eventFiles = await getFiles(dirPath)

        if (!eventFiles?.length) {
            console.warn("No events found:", dirPath);
            return;
        }

        for (let i = 0; i < eventFiles?.length; i++) {
            const filePath = eventFiles[i];

            const regex = /^[^.]+\.js$|^[^.]+\.ts$/gm;
            let match = regex.exec(filePath);
            if (!match) return;

            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );

            this.on(event.event, event.run);
            console.log("\nRegistered", filePath);
        }
    }

    async getCommandsHelp(): Promise<string> {
        let str: string = "Here's the list of my available slash commands: \n\n";
        this.commands.forEach(element => {
            str += "\`\`\`Command: /" + element.name + "\n";
            str += "Description: " + element.description + "\`\`\`\n\n";
        });

        str += ` \`\`\`Certaines commandes ne sont pas terminées [N.A.] ou sont en version [BETA]. Regardez les decriptions.
[N.A.] => Commande qui n'est simplement en cours développement.
[BETA] => Commande qui peut travailler, qui n'est pas complétement terminée et qui pourrrait échouée.\n\n`;

        str += `Some command are not yet finnished [BETA] or implemented [N.A.]
[N.A.] => Command that is not yet implemented.
[BETA] => Command that can be run but could encounter some errors.\n\n\`\`\``;
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
