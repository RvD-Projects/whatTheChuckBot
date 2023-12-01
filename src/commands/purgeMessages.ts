import { ApplicationCommandOptionType, ChannelType, MessageFlags } from "discord.js";
import { Command } from "../class/Command";
import { clockHoursEmojis, loadingMarks } from "../constants/emojis";
import { sleep } from "../tools/myFunctions";
import { Console } from "console";

export default new Command({
    name: "purge-messages",
    public: true,
    description: "Will delete as many messages as possible in the given channel.",
    options: [
        {
            name: "channel", description: "The channel filter",
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildText],
            required: true
        },
        {
            name: "user", description: "The user filter (default-any)",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    run: async ({ client, interaction, args }) => {
        try {
            if (interaction.member.user.bot) return;

            if (interaction.guild.ownerId !== interaction.member.id &&
                !interaction.member.roles.cache.find(role => role.name.toLowerCase() === "owner")) {
                await interaction.reply({ content: "❌ This command is for `owner` only. 🧙", ephemeral: true });
                return;
            }

            const channel = args.getChannel('channel', true, [ChannelType.GuildText]);
            const user = args.getUser("user", false);
            await interaction.reply({ content: "✅ Job was launched, wait for results... 🧙", ephemeral: true });

            let i: number = 0, j: number = 0;
            const interval = setInterval(async () => {
                i = i > loadingMarks.length - 1 ? 0 : i;
                j = j > clockHoursEmojis.length - 1 ? 0 : j;

                const percent = "`[" + loadingMarks[i++] + "]`";
                const face = i % 3 != 0 ? "😔" : "😴";
                await interaction.editReply({ content: `${clockHoursEmojis[j++]} Job's running: ${percent} ${face}` });

            }, 500);

            const fetOptions = {cache:false, before: channel.lastMessageId, limit: 100};
            let messages = await channel.messages.fetch(fetOptions);
            while (messages?.size > 0) {
                messages.forEach(async msg => {
                    try {
                        if (!msg?.deletable || msg.flags.has(MessageFlags.Ephemeral)) {
                            return;
                        }

                        const mustDelete = user?.id
                            ? msg.author.id === user.id
                            : true;

                        mustDelete && await msg.delete();
                        sleep(888);

                    } catch (error) {
                        if(error.code != 10008) {
                            console.log(error);
                        }
                    }
                });

                messages = await channel.messages.fetch(fetOptions);
            }

            clearInterval(interval);
            await interaction.editReply({ content: "✅ Job's terminated successfully! 🧙" });
        } catch (error) {
            await interaction.editReply({ content: "❌ Job's terminated with error! 🧙" });
        }
    }
});
