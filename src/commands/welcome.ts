import { ApplicationCommandOptionType, ChannelType, GuildMember } from "discord.js";
import { newCard } from "..";
import { Command } from "../class/Command";
import { DiscordManager } from "../class/DiscordManager";
import { getById } from "../tools/guildsChannels";

export default new Command({
    name: "welcome",
    description: "Will send a welcome banner.",
    options: [
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
        if (interaction.member.user.bot) return;
        if (process.env.environment === 'prod') {
            interaction.reply({
                content: "Available only in test mode",
                ephemeral: true
            });
            return;
        }

        const guild = interaction.guild;
        const member = interaction.member;
        const cardMember = args.getMember("member") as GuildMember
            ?? member;

        const guildConfigs = getById(guild.id)
            ?? getById("default");

        const data = guildConfigs.welcome;
        const cardData = data.card;

        const channel = args.getChannel('channel', false, [ChannelType.GuildText])
            ?? guild.systemChannel;

        const card = await newCard.render(cardMember, cardData);
        DiscordManager.guildSend(channel, {
            content: data.getMsg({ member: cardMember }),
            files: [card.getAttachment()]
        });

        interaction.reply({ content: "Done!", ephemeral: true });
    }
});