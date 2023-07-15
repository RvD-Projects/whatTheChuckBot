import { TextBasedChannel } from "discord.js";
import { newCard } from "..";
import { Event } from "../class/Event";
import { DiscordManager } from "../class/DiscordManager";

export default new Event("guildMemberAdd", async (member, interaction?) => {
    if (member.user.bot) return;

    const channel: TextBasedChannel = member.guild.systemChannel
    const card = await newCard.render(member);
    const message = `All hail <@${member.id}> !!!`;

    const messageContent = {
        content: message,
        files: [card.attachment]
    }

    return DiscordManager.send(channel, messageContent);
});