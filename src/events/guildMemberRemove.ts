import { Event } from "../class/Event";
import { sendBanner } from "../commands/Banner";

export default new Event("guildMemberRemove", async (member, interaction?) => {
    if (!member || member.user.bot) return;
    return sendBanner(member, "goodbye");
});

