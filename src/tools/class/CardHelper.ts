import { theme } from "../..";
import { GuildMember, MessageAttachment, TextBasedChannel } from "discord.js";
const canvacord = require('canvacord');

export class CardHelper {

    public attachment: MessageAttachment

    send(channel: TextBasedChannel) {
        channel.sendTyping()
        channel.send({
            files: [this.attachment]
        })
    }

    async render(member: GuildMember) {
        const welcomeCard = new canvacord.Welcomer()
            .setUsername(member.user.username + ' no: ' + member.guild.memberCount)
            .setAvatar(member.user.displayAvatarURL({ format: "png", dynamic: false }))
            .setMemberCount(member.guild.memberCount);
            
        welcomeCard.textMessage = `Welcome to ${member.guild.name}`;
        welcomeCard.discriminator = `${member.user.discriminator}`;
        theme.setRndWelcomeStyle(welcomeCard);

        const img = await welcomeCard.build();
        this.attachment = new MessageAttachment(img, "welcome.png");
        return this;
    }
}