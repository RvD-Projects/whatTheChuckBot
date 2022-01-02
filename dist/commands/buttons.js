"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Command_1 = require("../structures/Command");
exports.default = new Command_1.Command({
    name: "buttons",
    description: "Will print this help menu.",
    run: async ({ interaction }) => {
        await interaction.deferReply({ ephemeral: false });
        let str = await __1.client.getCommandsHelp();
        interaction.followUp(str);
    }
});
