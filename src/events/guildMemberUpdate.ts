import { Guild, GuildMember, PartialGuildMember } from "discord.js";

import { Event } from "../class/event";
import { getGuildConfigsById } from "../configs/guildsConfigs";
import PremiumMemberListener from "../../plugins/MemberUpdate/PremiumMemberListener";

export type MemberUpdateData = {
    guild: Guild,
    member: GuildMember | PartialGuildMember
    oldMember: GuildMember | PartialGuildMember
    guildConfigs?: any
}

export default new Event("guildMemberUpdate", (oldMember, member) => {
    const eventData: MemberUpdateData = {
        member,
        oldMember,
        guild: member.guild,
        guildConfigs: getGuildConfigsById(member.guild.id),
    }

    PremiumMemberListener.run(eventData);
});