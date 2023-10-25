import { Colors, TextBasedChannel } from "discord.js";
import { newCard } from "..";
import { Command } from "../class/Command";
import { DiscordManager } from "../class/DiscordManager";

export default new Command({
    name: "welcome",
    description: "Will send a welcome banner. For yourself",
    run: async ({ interaction }) => {
        if (process.env.environment === 'prod') {
            interaction.reply({
                content: "Available only in test mode",
                ephemeral: true
            });
            return;
        }
        
        const member = interaction.member;
        if (member.user.bot) return;

        const channel: TextBasedChannel = member.guild.systemChannel
        const card = await newCard.render(member);

        const message = `All hail <@${member.id}> !!!`;

        const messageContent = {
            content: message,
            files: [card.attachment]
        }

        await DiscordManager.guildSend(channel, messageContent);

        await interaction.reply({
            content: messageContent.content,
            ephemeral: true
        });
    }
});