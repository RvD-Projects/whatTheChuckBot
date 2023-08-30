import { TextBasedChannel } from "discord.js";
import { newCard } from "..";
import { Event } from "../class/Event";
import { DiscordManager } from "../class/DiscordManager";

export default new Event("guildMemberAdd", async (member, interaction?) => {
    if (member.user.bot) return;

    const channel: TextBasedChannel = member.guild.systemChannel
    const card = await newCard.render(member);
    let message = `🖥️ 🤖  All hail <@${member.id}> !!! ⚡  Contact <@258071819108614144>  if needed !👾  🖥️\n\n`;
    message += "- Informations et channel FR plus bas -  Contactez <@258071819108614144>  au besoin !\n";
    message += "- Información y canal ES mas abajo - ¡ Contacte a <@312456737070252034> si es necesario !";

    const messageContent = {
        content: message,
        files: [card.attachment]
    }

    return DiscordManager.send(channel, messageContent);
});
