import { newCard } from "..";
import { Event } from "../class/Event";
import { DiscordManager } from "../class/DiscordManager";
import { getById } from "../tools/guildsChannels";

export default new Event("guildMemberRemove", async (member, interaction?) => {
    if (member.user.bot) return;

    const guildConfigs = getById(member.guild.id)
        ?? getById("default");

    const data = guildConfigs.goodbye;
    const cardData = data.card;

    const channel = data?.channelId
        ? member.guild.channels.cache.get(data.channelId)
        : member.guild.systemChannel;

    const card = await newCard.render(member, cardData);
    return DiscordManager.guildSend(channel, {
        content: data.getMsg({member}),
        files: [card.getAttachment()]
    });
});

