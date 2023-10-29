import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../class/Command";
import { env } from "process";
import ShellProcess from "../tools/class/ShellProcess";
import { clockHoursEmojies, loadingMarks } from "../constants/emojies";

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
            await interaction.reply({ content: "❌ You shall not pass! 🧙", ephemeral: true });
            return;
        }

        const serverFlag = args.getInteger("server", false) ?? "0";
        const commandFlag = args.getInteger("command", false) ?? "0";

        const execProcess = ShellProcess.shellExec("./shells/bash/manageCsDocker.sh", [`${serverFlag}`, `${commandFlag}`]);
        await interaction.reply({ content: "✅ Job was launched, wait for results... 🧙", ephemeral: true });

        execProcess.on('close', async (code: number, args: any[]) => {
            console.log(`shellExec on close code: ${code} args: ${args}`);
            const reply = code == 0
                ? "✅ Job's terminated sucessfully! 🧙"
                : "❌ Job's terminated with error! 🧙";

            setTimeout(async () => {
                clearInterval(interval);
                await interaction.editReply({ content: reply });
            }, 3000)
        });

        let i: number = 0, j: number = 0;
        let interval = setInterval(async () => {
            i = i > loadingMarks.length - 1 ? 0 : i;
            j = j > clockHoursEmojies.length - 1 ? 0 : j;

            const prct = "`[" + loadingMarks[i++] + "]`";
            const face = i %2 == 0 ? "😔" : "😴";
            await interaction.editReply({ content: `${clockHoursEmojies[j++]} Job's running: ${prct} ${face}` });
        }, 516);
    }
});
