import { MemberUpdateData } from "../../src/events/guildMemberUpdate";

export default class PremiumMemberListener {
    static async run(eventData: MemberUpdateData): Promise<boolean> {
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
        const data = guildConfigs.boost;


        return true;
    }


}