import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../class/Command";
import { env } from "process";
import ShellProcess from "../tools/class/ShellProcess";

export default new Command({
    name: "wegamecs",
    description: "Will do whatchu gotta do.",
    options: [
        {
            name: "cmd-flag", description: "(default) 0: Restart, 1: Start, 2:Stop",
            type: ApplicationCommandOptionType.Integer
        }
    ],
    run: async ({ interaction }) => {
        if (interaction.member.user.bot) return;

        const managersIds = env.cs2ManagerId.split(',');
        console.log(managersIds)
        console.log(interaction.member.user.id.toString())

        if (!managersIds.includes(interaction.member.user.id.toString())) {
            await interaction.reply({ content: "❌ You shall not pass!  🧙", ephemeral: true });
            return;
        }

        ShellProcess.bashCmd("docker", ["stop", "cs2-WeConnected-ns1"]);
        ShellProcess.bashCmd("docker", ["start", "cs2-WeConnected-ns1"]);

        await interaction.reply({ content: "✔️ Done!  🧙", ephemeral: true });
    }
});