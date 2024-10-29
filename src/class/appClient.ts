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
    GatewayIntentBits,
    Partials,
    ApplicationCommandDataResolvable
} from "discord.js";
import { PathLike } from "fs";
import { Event } from "./event";
import { CommandType } from "../typings/command";
import { AppLogger } from "./Loggers/appLogger";
import { getDirectories, getFiles, importFile } from "../helpers/helpers";


export class AppClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    clientsLoggers: Collection<string, AppLogger> = new Collection();
    devLogger: AppLogger = new AppLogger('dev', process.env.botToken);
    appLogger: AppLogger = new AppLogger('app', process.env.botToken, 'warn');

    constructor() {
        super({
            intents: [
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.AutoModerationExecution,
                GatewayIntentBits.AutoModerationConfiguration,

                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildMessagePolls,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildEmojisAndStickers,
            ],
            partials: [
                Partials.User,
                Partials.Channel,
                Partials.ThreadMember
            ],
        });
    }

    async start() {
        await this.registerModules();
        await this.registerBaseListener();
        await this.login(process.env.botToken);
    }

    async registerModules() {
        // Register Event Listeners from events _dir
        await this.registerEventListenerFromDir(`${__dirname}/../events/`);

        // Commands
        const coreCommands = await this.getSlashCommandsFromDir(`${__dirname}/../commands/`);
        const pluginsCommands = await this.registerPlugins();
        const commands = {
            publics: [...coreCommands?.publics, ...pluginsCommands?.publics],
            privates: [...coreCommands?.privates, ...pluginsCommands?.privates]
        }

        this.on("shardReady", async () => {
            try {
                await this.registerCommands(commands.publics, commands.privates);
            } catch (error) {
                console.error("On Shard-Ready error:", error)
            }

            console.info("|--------Bot is online!--------|\n\n");
        });
    }

    async registerPlugins() {
        const publics: CommandType[] = [];
        const privates: CommandType[] = [];

        // Get all plugins directories
        const pluginBasePath = `${__dirname}/../../plugins/`;
        const pluginsDirectories = await getDirectories(pluginBasePath);

        if (!pluginsDirectories?.length) {
            console.error("No plugins found:", pluginBasePath);
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

    async registerCommands(publics: ApplicationCommandDataResolvable[], privates: ApplicationCommandDataResolvable[]) {
        await this.application?.commands.set(publics);
        console.info(`Registered ${publics.length} global commands`);

        const guildIds = process.env.guildIds.split(',');
        for (let i = 0; i < guildIds.length; i++) {
            const guildId = guildIds[i];
            await this.application?.commands.set(privates, guildId);
            console.info(`Registered ${privates.length} commands to ${guildId}`);
        }
    }

    addClientLogger(id: string) {
        if (!this.clientsLoggers?.has(id)) {
            this.clientsLoggers.set(id, new AppLogger('client', id, 'info'));
            console.info(`Client-logger ${id}: is online!`);
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
                console.error("No commands found:", dirPath);
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

            if (!command?.name) {
                console.error("Error at command import:", filePath);
                console.error(command);
                continue;
            };

            this.commands.set(command.name, command);
            command.public
                ? publics.push(command)
                : privates.push(command);
        }

        console.info(dirPath, { publics, privates })
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
