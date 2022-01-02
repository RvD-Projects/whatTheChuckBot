"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const glob_1 = (0, tslib_1.__importDefault)(require("glob"));
const util_1 = require("util");
const globPromise = (0, util_1.promisify)(glob_1.default);
class CommandHelper {
    async importFile(filePath) {
        return (await Promise.resolve().then(() => (0, tslib_1.__importStar)(require(filePath))))?.default;
    }
    async resolveEphemerality(interaction, fallback) {
        // Behave as ephemeral by default when 'private'.
        if (fallback === 'private') {
            let isPrivate = interaction.options.getBoolean('private');
            if (isPrivate !== undefined && isPrivate !== null)
                return isPrivate;
            return await true;
        }
        else if (fallback === 'public') {
            return await interaction.options.getBoolean('public') ? true : false;
        }
        return await false;
    }
    async importSubCommandFile(interaction) {
        let commandName = interaction.commandName;
        let subCommandName = interaction.options.getSubcommand();
        let groudName = interaction.options.getSubcommandGroup(false); //[optional]
        let filePath = `${__dirname}/../../subCommands/${commandName}`;
        if (groudName) {
            filePath += `/${groudName}`;
        }
        filePath += `/${subCommandName}`;
        const subCommandFile = await globPromise(`${filePath}{.ts,.js}`);
        if (subCommandFile.length === 1)
            return this.importFile(filePath);
        return;
    }
}
exports.default = CommandHelper;
