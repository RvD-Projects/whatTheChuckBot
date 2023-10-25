import { TextBasedChannel } from "discord.js";
import { newCard } from "..";
import { Event } from "../class/Event";
import { DiscordManager } from "../class/DiscordManager";

export default new Event("guildMemberRemove", async (member, interaction?) => {
    if (member.user.bot) return;

    const title = `Good bye, dear valued member!`;
    const channel: TextBasedChannel = member.guild.systemChannel;
    const card = await newCard.render(member, title);
    const message = `🖥️ 🤖  Bye Bye <@${member.id}>! We'll miss you, not right now, but probably later!!! ⚡ 🖥️\n\n`;

    const messageContent = {
        content: message,
        files: [card.attachment]
    }

    return DiscordManager.send(channel, messageContent);
});
