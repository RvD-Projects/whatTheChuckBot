import internal from "stream";
import { theme } from "..";
import { ALLOWED_EXTENSIONS, AttachmentBuilder, BufferResolvable, GuildMember, PartialGuildMember } from "discord.js";
const Canvas = require("discord-canvas");

export class CardHelper {
    private attachment: BufferResolvable | internal.Stream

    /**
     * Prepare a 'card' discord attachment 
     * @param member 
     * @param cardData per-user data if any
     * @returns 
     */
    public async render(member: GuildMember | PartialGuildMember, textTitle: string, textMessage: string) {
        if (!member || member.user.bot) return;

        const card = new Canvas.Welcome();
        card.textTitle = textTitle;
        card.textMessage = textMessage;
        card.setUsername(member.displayName)
            .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: ALLOWED_EXTENSIONS[1] }))
            .setGuildName(member.guild.name)
            .setMemberCount(member.guild.memberCount)
            .setDiscriminator(member.guild.memberCount);

        theme.setRndWelcomeStyle(card);
        const image = await card.toAttachment();
        this.attachment = new AttachmentBuilder(image.toBuffer()).attachment;
        return this;
    }

    /**
     * getAttachment
     */
    public getAttachment() {
        return this.attachment;
    }
}
