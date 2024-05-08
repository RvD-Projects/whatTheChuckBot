import { Event } from "../class/event";
import { sendBanner } from "../commands/banner";

export default new Event("guildMemberAdd", async (member) => {
    if (!member || member.user.bot) return;
    return sendBanner(member, "welcome");
});
