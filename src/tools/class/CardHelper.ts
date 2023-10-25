import internal from "stream";
import { theme } from "../..";
import { ALLOWED_EXTENSIONS, AttachmentBuilder, BufferResolvable, GuildMember, PartialGuildMember } from "discord.js";
const Canvas = require("discord-canvas");

export class CardHelper {

    public attachment: BufferResolvable | internal.Stream

    async render(member: GuildMember | PartialGuildMember, title?: string, message?: string) {
        const card = new Canvas.Welcome();
        card.setUsername(member.displayName)
            .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: ALLOWED_EXTENSIONS[1] }))
            .setGuildName(member.guild.name)
            .setMemberCount(member.guild.memberCount)
            .setDiscriminator(member.guild.memberCount);

        card.textTitle = title ?? "Welcome";
        card.textMessage = message ?? "Welcome to ${member.guild.name}`";
        theme.setRndWelcomeStyle(card);

        const image = await card.toAttachment();
        this.attachment = new AttachmentBuilder(image.toBuffer()).attachment;
        return this;
    }
}
