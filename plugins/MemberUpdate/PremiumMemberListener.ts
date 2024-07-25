import { sendBanner } from "../../src/commands/banner";
import { MemberUpdateData } from "../../src/events/guildMemberUpdate";

export default class PremiumMemberListener {
    static async run(eventData: MemberUpdateData): Promise<void> {
        const {
            guild,
            member,
            oldMember,
            guildConfigs
        } = eventData;

        const newPremiumSince = member.premiumSince;
        const oldPremiumSince = oldMember.premiumSince;
        const isBoostStop = oldPremiumSince && !newPremiumSince;

        // No boost change or end of boost
        if (oldPremiumSince === newPremiumSince || isBoostStop) {
            return;
        }

        // Else isNewBoost on extra-boost
        console.warn("BOOSTER:", member.nickname);
        console.warn("OLD BOOST VALUE:", oldMember.premiumSince);
        console.warn("NEW BOOST VALUE:", member.premiumSince);
        await sendBanner(member, "boost");
    }


}