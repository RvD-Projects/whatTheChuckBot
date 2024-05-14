import { ApplicationCommandOptionType, ChannelType, GuildMember, PartialGuildMember } from "discord.js";
import { newCard } from "..";
import { Command } from "../class/command";
import { DiscordManager } from "../class/Managers/discordManager";
import { getGuildConfigsById } from "../configs/guildsConfigs";

export default new Command({
    name: "banner",
    public: true,
    description: "Will send a banner.",
    options: [
        {
            name: "type", description: "(default) 0: welcome, 1: goodbye",
            type: ApplicationCommandOptionType.Integer,
        },
        {
            name: "member", description: "a member",
            type: ApplicationCommandOptionType.User
        },
        {
            name: "channel", description: "a channel",
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildText]
        }
    ],
    run: async ({ client, interaction, args }) => {
        try {
            if (interaction.member.user.bot) return;

            const guild = interaction.guild;
            const member = args.getMember("member") as GuildMember
                ?? interaction.member;

            const type = args.getInteger("type", false) ? "goodbye" : "welcome";
            const channel = args.getChannel('channel', false, [ChannelType.GuildText])
                ?? guild.systemChannel;

            interaction?.channel?.sendTyping();
            await sendBanner(member, type, channel);
            interaction.reply({ content: "Done!", ephemeral: true });
        } catch (error) {
            interaction.reply({ content: "Error!", ephemeral: true });
        }
    }
});

export async function sendBanner(
    member: GuildMember | PartialGuildMember,
    type: any,
    channelOverride?: any,
    args?: any,
    interaction?: any) {
    if (!member || member.user.bot) return;
    
    const defConfigs = getGuildConfigsById("default");
    const guildConfigs = getGuildConfigsById(member.guild.id) ?? defConfigs;

    const data = type === "goodbye"
        ? (guildConfigs?.goodbye ?? defConfigs?.goodbye)
        : (guildConfigs?.welcome ?? defConfigs?.welcome);

    if (!guildConfigs || !data) {
        throw "No configs found...";
    }

    const cardData = data.card ?? defConfigs[type].card;
    const getContent = data.getContent ?? defConfigs[type].getContent;

    let channel = data.channelId
        ? member.guild.channels.cache.get((data.channelId))
        : member.guild.systemChannel;
    channel = channelOverride ? channelOverride : channel;

    const card = await newCard.render(member, cardData.getTitle(), cardData.getMsg({ member }));
    return await DiscordManager.guildSend(channel, {
        content: getContent({ member }),
        files: [card.getAttachment()]
    });
};