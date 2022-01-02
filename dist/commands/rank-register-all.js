"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const Levels_1 = require("../tools/class/Levels");
exports.default = new Command_1.Command({
    name: "rank-register-all",
    description: "Will check for unegistered users and register them to the ranking system.",
    run: async ({ interaction }) => {
        await interaction.deferReply({ ephemeral: true });
        const returned = await Levels_1.Levels.updateUsers(interaction.guild);
        return await interaction.followUp({
            content: returned
        });
    }
});
