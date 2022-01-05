"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../class/Command");
exports.default = new Command_1.Command({
    name: "ping",
    description: "Will reply with pong. Good to know if bot is up and running.",
    run: async ({ interaction }) => {
        await interaction.deferReply({ ephemeral: true });
        interaction.followUp("Pong");
        return;
    }
});
