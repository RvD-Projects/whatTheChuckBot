import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../../src/class/Command";
import ShellProcess from "../../../src/class/ShellProcess";
import { clockHoursEmojis, loadingMarks } from "../../../src/constants/Emojis";
import { hasCs2DockerAccess } from "../../../src/configs/GuildsConfigs";
import { PATHS } from "../../../src";

export default new Command({
    name: "cs-boot",
    public: false,
    description: "Will do as you wish.",
    options: [
        {
            name: "server", description: "(default) 0: cs2-WeConnected-ns1, 1: cs2-WeConnected-ns2",
            type: ApplicationCommandOptionType.Integer
        },
        {
            name: "command", description: "(default) 0: Restart, 1: Start, 2:Stop",
            type: ApplicationCommandOptionType.Integer
        }
    ],
    run: async ({ interaction, args }) => {
        if (interaction.member.user.bot) return;

        if (!hasCs2DockerAccess(interaction.member)) {
            await interaction.reply({ content: "❌ You shall not pass! 🧙", ephemeral: true });
            return;
        }

        const serverFlag = args.getInteger("server", false) ?? "0";
        const commandFlag = args.getInteger("command", false) ?? "0";
        await interaction.reply({ content: "✅ Job was launched, wait for results... 🧙", ephemeral: true });

        try {
            const call = PATHS.bashes.concat("ManageCsDocker.sh");
            const execProcess = ShellProcess.shellExec(call, [`${serverFlag}`, `${commandFlag}`]);

            execProcess.on('close', async (code: number, args: any[]) => {
                console.log(`shellExec on close code: ${code} args: ${args}`);
                const reply = code == 0
                    ? "✅ Job's terminated successfully! 🧙"
                    : "❌ Job's terminated with error! 🧙";

                setTimeout(async () => {
                    clearInterval(interval);
                    await interaction.editReply({ content: reply });
                }, 3000)
            });

        } catch (error) {
            console.error(error)
        }

        let i: number = 0, j: number = 0;
        let interval = setInterval(async () => {
            i = i > loadingMarks.length - 1 ? 0 : i;
            j = j > clockHoursEmojis.length - 1 ? 0 : j;

            const percent = "`[" + loadingMarks[i++] + "]`";
            const face = i % 3 != 0 ? "😔" : "😴";
            await interaction.editReply({ content: `${clockHoursEmojis[j++]} Job's running: ${percent} ${face}` });
        }, 500);
    }
});
