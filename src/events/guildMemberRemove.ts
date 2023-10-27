import { newCard } from "..";
import { Event } from "../class/Event";
import { DiscordManager } from "../class/DiscordManager";
import { getById } from "../tools/guildsChannels";

export default new Event("guildMemberRemove", async (member, interaction?) => {
    if (member.user.bot) return;

    const title = `Bye bye`;
    const cardMessage = `We'll miss him/her!`;
    const guildConfigs = getById(member.guild.id);

    const card = await newCard.render(member, guildConfigs.goodbye.card);
    const messageContent = {
        content: guildConfigs.goodbye.getMsg({ member }),
        files: [card.getAttachement()]
    }
    const channel = guildConfigs?.goodbye?.channelId
        ? member.guild.channels.cache.get(guildConfigs.goodbye.channelId)
        : member.guild.systemChannel;

    return DiscordManager.guildSend(channel, messageContent);
});

