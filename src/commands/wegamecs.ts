import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../class/Command";
import { env } from "process";
import ShellProcess from "../tools/class/ShellProcess";

export default new Command({
    name: "wegamecs",
    description: "Will do whatchu gotta do.",
    options: [
        {
            name: "server", description: "(default) 0: cs2-WeConnected-ns1, 1: cs2-rafux-ns1",
            type: ApplicationCommandOptionType.Integer
        },
        {
            name: "command", description: "(default) 0: Restart, 1: Start, 2:Stop",
            type: ApplicationCommandOptionType.Integer
        }
    ],
    run: async ({ interaction, args }) => {
        if (interaction.member.user.bot) return;

        const managersIds = env.cs2ManagerId.split(',');
        if (!managersIds.includes(interaction.member.user.id.toString())) {
            await interaction.reply({ content: "❌ You shall not pass!  🧙", ephemeral: true });
            return;
        }

        const serverFlag = args.getInteger("server", false) ?? "0";
        const commandFlag = args.getInteger("command", false) ?? "0";

        ShellProcess.shellExec("./shells/bash/manageCsDocker.sh", [`${serverFlag}`, `${commandFlag}`]);

        await interaction.reply({ content: "✔️ Done!  🧙", ephemeral: true });
    }
});
