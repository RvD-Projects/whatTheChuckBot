"use strict";
/**
*  * $$$$$$$\  $$\                                               $$\       $$$$$\  $$$$$$\        $$\
* $$  __$$\ \__|                                              $$ |      \__$$ |$$  __$$\       $$ |
* $$ |  $$ |$$\  $$$$$$$\  $$$$$$$\  $$$$$$\   $$$$$$\   $$$$$$$ |         $$ |$$ /  \__|      $$ |
* $$ |  $$ |$$ |$$  _____|$$  _____|$$  __$$\ $$  __$$\ $$  __$$ |         $$ |\$$$$$$\        $$ |
* $$ |  $$ |$$ |\$$$$$$\  $$ /      $$ /  $$ |$$ |  \__|$$ /  $$ |   $$\   $$ | \____$$\       \__|
* $$ |  $$ |$$ | \____$$\ $$ |      $$ |  $$ |$$ |      $$ |  $$ |   $$ |  $$ |$$\   $$ |
* $$$$$$$  |$$ |$$$$$$$  |\$$$$$$$\ \$$$$$$  |$$ |      \$$$$$$$ |$$\\$$$$$$  |\$$$$$$  |      $$\
* \_______/ \__|\_______/  \_______| \______/ \__|       \_______|\__|\______/  \______/       \__|
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const glob_1 = (0, tslib_1.__importDefault)(require("glob"));
const __1 = require("..");
const path_1 = require("path");
const util_1 = require("util");
const promises_1 = require("node:fs/promises");
const AppLogger_1 = require("../tools/class/AppLogger");
const globPromise = (0, util_1.promisify)(glob_1.default);
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    clientsloggers = new discord_js_1.Collection();
    devlogger = new AppLogger_1.AppLogger('dev', process.env.botToken);
    applogger = new AppLogger_1.AppLogger('app', process.env.botToken, 'warn');
    constructor() {
        super({ intents: 32767 });
    }
    async start() {
        await this.registerModules();
        await this.registerBaseListener();
        await this.login(process.env.botToken);
        this.emit("warn", "\n\n|--------Bot is online!--------|\n\n");
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
    async registerCommands({ commands, guildId }) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            this.emit('warn', `Registering commands to ${guildId}`);
        }
        else {
            this.application?.commands.set(commands);
            this.emit('warn', "Registering global commands");
        }
    }
    resolveLogtoClient(id, message) {
        this.logToClient(id, message);
    }
    addClientLogger(id) {
        if (!this.clientsloggers?.has(id)) {
            this.clientsloggers.set(id, new AppLogger_1.AppLogger('client', id, 'info'));
            this.emit('debug', `Your Client-logger: is online!`);
            this.emit('warn', `Client-logger ${id}: is online!`);
        }
        else {
            this.emit('warn', "Logger " + id + " already in the collection...");
            this.emit('debug', "This logger already have a stream...");
        }
    }
    logToClient(id, message) {
        if (this.clientsloggers?.has(id)) {
            this.emit('debug', `Login to client ${id}: ` + message);
            this.clientsloggers.get(id).logger.info(message);
        }
    }
    async getSlashCommandsFromDir(dirPath) {
        const slashCommands = [];
        // Get all files from commands _dir
        const commandFiles = await this.getFiles(dirPath)
            .then(files => { console.warn(files); return files; })
            .catch(e => console.error(e));
        await commandFiles.forEach(async (filePath) => {
            const regex = /^[^.]+\.js$|^[^.]+\.ts$/gm;
            let match = regex.exec(filePath);
            if (!match)
                return;
            const command = await this.importFile(filePath);
            if (!command.name)
                return;
            this.emit('debug', JSON.stringify(command));
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });
        return await slashCommands;
    }
    async registerEventListerFromDir(dirPath) {
        // Get all files from events _dir
        const eventFiles = await this.getFiles(dirPath)
            .then(files => { console.warn(files); return files; })
            .catch(e => console.error(e));
        await eventFiles.forEach(async (filePath) => {
            const regex = /^[^.]+\.js$|^[^.]+\.ts$/gm;
            let match = regex.exec(filePath);
            if (!match)
                return;
            const event = await this.importFile(filePath);
            this.on(event.event, event.run);
        });
    }
    async importSubCommandFile(commandName, subCommandName, groudName) {
        let filePath = `${__dirname}/../subCommands/${commandName}`;
        if (groudName) {
            filePath += `/${groudName}`;
        }
        filePath += `/${subCommandName}`;
        const subCommandFile = await globPromise(`${filePath}{.ts,.js}`);
        if (subCommandFile.length === 1)
            return await this.importFile(filePath);
        return;
    }
    async getCommandsHelp() {
        let str = "Here's the list of my available slash commands: \n\n";
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
    async importFile(filePath) {
        return (await Promise.resolve().then(() => (0, tslib_1.__importStar)(require(filePath))))?.default;
    }
    async getFiles(dir) {
        const subdirs = await (0, promises_1.readdir)(dir);
        const files = await Promise.all(subdirs.map(async (subdir) => {
            const res = (0, path_1.resolve)(dir, subdir);
            return (await (0, promises_1.stat)(res)).isDirectory() ? this.getFiles(res) : res;
        }));
        return await files.reduce((a, f) => a.concat(f), []);
    }
    async findGuildChannel(name, type) {
        return await __1.client.channels.cache.find(c => c.type === type && c.name === name);
    }
    //TODO: Parse as Json or JsonStringified
    clientInteractionInfos(interaction, logger) {
        let message = "";
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
exports.ExtendedClient = ExtendedClient;
