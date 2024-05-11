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
import { Event } from "./event";
import { CommandType } from "../typings/command";
import { AppLogger } from "./Loggers/appLogger";
import { RegisterCommandsOptions } from "../typings/client";
import { getDirectories, getFiles, importFile } from "../helpers/helpers";


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
        
        const publics = [...coreCommands?.publics, ...pluginsCommands?.publics];
        const privates = [...coreCommands?.privates, ...pluginsCommands?.privates];

        this.on("ready", async () => {
            try {
                await this.registerCommands({ commands: publics });
                const guildIds = process.env.guildIds.split(',');

                for (let i = 0; i < guildIds?.length; i++) {
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
        const publics: CommandType[] = [];
        const privates: CommandType[] = [];

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

            await this.registerEventListenerFromDir(`${pluginDir}/events`);
            const commands = await this.getSlashCommandsFromDir(`${pluginDir}/commands`);
            commands && publics.push(...commands.publics);
            commands && privates.push(...commands.privates);
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
        if (!commands.length) {
            return;
        }

        if (guildId) {
            try {
                this.guilds.cache.get(guildId)?.commands.set(commands);
                console.info(`\nRegistered ${commands.length} commands to ${guildId}`);
            } catch {}

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
        let commandFiles = [];

        // Get all files from commands _dir
        try {
            commandFiles = await getFiles(dirPath);

            if (!commandFiles?.length) {
                console.warn("No commands found:", dirPath);
                return { publics, privates };
            }

        } catch {
            return { publics, privates };
        }


        for (let i = 0; i < commandFiles.length; i++) {
            const filePath = commandFiles[i];

            const regex = /^[^.]+\.js$|^[^.]+\.ts$/gm;
            let match = regex.exec(filePath);
            if (!match) continue;

            const command: CommandType = await importFile(filePath);

            if (!command.name) continue;

            this.emit('debug', JSON.stringify(command));
            this.commands.set(command.name, command);
            command.public
                ? publics.push(command)
                : privates.push(command);
        }

        return { publics, privates };
    }

    async registerEventListenerFromDir(dirPath: PathLike) {
        let eventFiles = [];

        // Get all files from commands _dir
        try {
            eventFiles = await getFiles(dirPath);

            if (!eventFiles?.length) {
                console.warn("No events found:", dirPath);
                return;
            }
        } catch {
            return;
        }

        for (let i = 0; i < eventFiles?.length; i++) {
            const filePath = eventFiles[i];

            const regex = /^[^.]+\.js$|^[^.]+\.ts$/gm;
            let match = regex.exec(filePath);
            if (!match) return;

            const event: Event<keyof ClientEvents> = await importFile(filePath);

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
[BETA] => Commande qui peut travailler, qui n'est pas complétement terminée et qui pourrrait échouer.\n\n`;

        str += `Some command are not yet finished [BETA] or implemented [N.A.]
[N.A.] => Command that is not yet implemented.
[BETA] => Command that can be run but could encounter some errors.\n\n\`\`\``;
        return str;
    }

    clientInteractionInfos(interaction: Interaction, logger: Console) {
        let sb = new String();
        sb.concat("\n\nNEW " + interaction.type + " INTERACTION: " + interaction.id);
        sb.concat("\n   Interaction-TS: " + interaction.createdTimestamp);
        sb.concat("\n   User: " + interaction.member.user.username);
        sb.concat("\n       ID: " + interaction.member.user.id);

        sb.concat("\n   Guild: " + interaction.guild.name);
        sb.concat("\n       ID: " + interaction.guild.id);

        sb.concat("\n\n       Logged-Members: ");
        let members = interaction.guild.presences.cache;
        members.forEach(member => {
            sb.concat("\n           ID: " + member.user.id);
            sb.concat("\n           User: " + member.user.username);
        });

        sb.concat("\n\n       All-Members: ");
        let members2 = interaction.guild.members.cache;
        members2.forEach(member => {
            sb.concat("\n           ID: " + member.user.id);
            sb.concat("\n           User: " + member.user.username);
        });

        logger.info(sb.toString());
    }
}
