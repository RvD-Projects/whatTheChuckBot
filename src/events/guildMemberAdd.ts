import { Event } from "../class/Event";
import { sendBanner } from "../commands/Banner";

export default new Event("guildMemberAdd", async (member) => {
    if (!member || member.user.bot) return;
    return sendBanner(member, "welcome");
});
