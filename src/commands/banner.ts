import { ApplicationCommandOptionType, ChannelType, GuildMember, PartialGuildMember } from "discord.js";
import { newCard } from "..";
import { Command } from "../class/command";
import { DiscordManager } from "../class/Managers/discordManager";
import { getGuildConfigsById } from "../configs/guildsConfigs";

export default new Command({
    name: "banner",
    public: true,
    description: "Will send a banner. (welcome by default)",
    options: [
        {
            name: "type", description: "welcome|goodbye|boost",
            type: ApplicationCommandOptionType.String
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

            const type = args.getString("type", false) ?? "welcome";
            const channel = args.getChannel('channel', false, [ChannelType.GuildText])
                ?? guild.systemChannel;

            interaction.channel?.sendTyping();
            await sendBanner(member, type, channel, interaction);
            interaction.reply({ content: "Done!", ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction?.reply({ content: "Error!", ephemeral: true });
        }
    }
});

export async function sendBanner(
    member: GuildMember | PartialGuildMember,
    type: string = "welcome",
    channelOverride?: any,
    interaction?: any,
    args?: any) {
    if (!member || member.user.bot) return;

    let data = null;
    const guildConfigs = getGuildConfigsById(member.guild.id);

    switch (type) {
        case "goodbye":
            data = guildConfigs.goodbye
            break;

        case "boost":
            data = guildConfigs.boost
            console.warn("!!! BOOST BANNER !!!");
            break;

        default:
        case "welcome":
            data = guildConfigs.welcome
            break;
    }

    if (!guildConfigs || !data) {
        throw "No configs found...";
    }

    const cardData = data.card
    const getContent = data.getContent;

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