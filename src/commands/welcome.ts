import { Colors, TextBasedChannel } from "discord.js";
import { newCard } from "..";
import { Command } from "../class/Command";
import { DiscordManager } from "../class/DiscordManager";
import { getById } from "../tools/guildsChannels";

export default new Command({
    name: "welcome",
    description: "Will send a welcome banner. For yourself",
    run: async ({interaction }) => {
        if (process.env.environment === 'prod') {
            interaction.reply({
                content: "Available only in test mode",
                ephemeral: true
            });
            return;
        }

        const member = interaction.member;
        if (member.user.bot) return;

        const guildConfigs = getById(member.guild.id)
            ?? getById("default");
    
        const data = guildConfigs.welcome;
        const cardData = data.card;
    
        const channel = data?.channelId
            ? member.guild.channels.cache.get(data.channelId)
            : member.guild.systemChannel;
    
        const card = await newCard.render(member, cardData);
        return DiscordManager.guildSend(channel, {
            content: data.getMsg({member}),
            files: [card.getAttachment()]
        });
    }
});