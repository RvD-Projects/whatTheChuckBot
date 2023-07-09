import internal from "stream";
import { theme } from "../..";
import { AttachmentBuilder, BufferResolvable, GuildMember, TextBasedChannel } from "discord.js";
const canvacord = require('canvacord');

export class CardHelper {

    public attachment: BufferResolvable | internal.Stream

    send(channel: TextBasedChannel) {
        channel.sendTyping()
        channel.send({
            files: [this.attachment]
        })
    }

    async render(member: GuildMember) {
        const welcomeCard = new canvacord.Welcomer()
            .setUsername(member.user.username)
            .setAvatar(member.user.displayAvatarURL())
            .setMemberCount(member.guild.memberCount);
        
        console.log(member)
            
        welcomeCard.textMessage = `Welcome to ${member.guild.name}`;
        welcomeCard.discriminator = `${member.user.discriminator}`;
        theme.setRndWelcomeStyle(welcomeCard);

        const img = await welcomeCard.build();
        
        this.attachment = new AttachmentBuilder(img, {name: "welcome.png"}).attachment;
        return this;
    }
}