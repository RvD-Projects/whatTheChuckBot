import { newCard } from "..";
import { Event } from "../class/Event";
import { DiscordManager } from "../class/DiscordManager";
import { getById } from "../tools/guildsChannels";

export default new Event("guildMemberRemove", async (member, interaction?) => {
    if (member.user.bot) return;

    const title = `Bye bye`;
    const cardMessage = `We'll miss him/her!`;
    const message = `🖥️ 🤖  Goodbye <@${member.id}>! We'll miss you, not right now, but probably later!!! ⚡ 🖥️\n\n`;

    const card = await newCard.render(member, title, cardMessage);
    const messageContent = {
        content: message,
        files: [card.attachment]
    }

    const found = getById(member.guild.id);
    const channel = found?.guildId
        ? member.guild.channels.cache.get(found.removeChannelId)
        : member.guild.systemChannel;
        
    return DiscordManager.send(channel, messageContent);
});
