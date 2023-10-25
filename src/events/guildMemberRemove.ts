import { TextBasedChannel } from "discord.js";
import { newCard } from "..";
import { Event } from "../class/Event";
import { DiscordManager } from "../class/DiscordManager";

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

    const channel: TextBasedChannel = member.guild.systemChannel;
    return DiscordManager.send(channel, messageContent);
});
