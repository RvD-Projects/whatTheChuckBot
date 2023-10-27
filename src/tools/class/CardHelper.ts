import internal from "stream";
import { theme } from "../..";
import { ALLOWED_EXTENSIONS, AttachmentBuilder, BufferResolvable, GuildMember, PartialGuildMember } from "discord.js";
const Canvas = require("discord-canvas");

export class CardHelper {
    private attachment: BufferResolvable | internal.Stream

    /**
     * Prepare a renderable card attachement
     * @param member 
     * @param cardData per-user data if any
     * @returns 
     */
    public async render(member: GuildMember | PartialGuildMember, cardData?: any) {
        const card = new Canvas.Welcome();
        card.setUsername(member.displayName)
            .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: ALLOWED_EXTENSIONS[1] }))
            .setGuildName(member.guild.name)
            .setMemberCount(member.guild.memberCount)
            .setDiscriminator(member.guild.memberCount);

        card.textTitle = cardData?.getTitle
            ? cardData.getTitle({ member }) : "Welcome";
        card.textMessage = cardData?.getMsg
            ? cardData.getMsg({ member }) : `Welcome to ${member.guild.name}`;

        theme.setRndWelcomeStyle(card);
        const image = await card.toAttachment();
        this.attachment = new AttachmentBuilder(image.toBuffer()).attachment;
        return this;
    }

    /**
     * getAttchement
     */
    public getAttchement() {
        return this.attachment;
    }
}
