import { Event } from "../class/event";
import { sendBanner } from "../commands/banner";

export default new Event("guildMemberRemove", async (member, interaction?) => {
    if (!member || member.user.bot) return;
    return sendBanner(member, "goodbye");
});

