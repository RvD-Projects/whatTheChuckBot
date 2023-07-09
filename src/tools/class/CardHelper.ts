import internal from "stream";
import { theme } from "../..";
import { AttachmentBuilder, BufferResolvable, GuildMember, TextBasedChannel } from "discord.js";
const Canvas = require("discord-canvas");

export class CardHelper {

    public attachment: BufferResolvable | internal.Stream

    send(channel: TextBasedChannel) {
        channel.sendTyping()
        channel.send({
            files: [this.attachment]
        })
    }

    async render(member: GuildMember) {
        const welcomeCard = new Canvas.Welcome();
        welcomeCard.setUsername(member.user.username)
            .setAvatar(member.user.displayAvatarURL())
            .setGuildName(member.guild.name)
            .setMemberCount(member.guild.memberCount);

        welcomeCard.textTitle = "Welcome";
        welcomeCard.textMessage = `Welcome to ${member.guild.name}`;
        theme.setRndWelcomeStyle(welcomeCard);

        const image = await welcomeCard.toAttachment();
        this.attachment = new AttachmentBuilder(image.toBuffer(), { name: "welcome.png" }).attachment;
        return this;
    }
}