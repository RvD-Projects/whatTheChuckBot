import { Event } from "../class/Event";
import { Levels } from "../tools/class/Levels";




export default new Event("voiceStateUpdate", async (oldState, newState) => {
    if(newState.member.user.bot) return;
    let channel = newState.channel;

    if (channel.members.size >= 1) {
    }
    return;
});



