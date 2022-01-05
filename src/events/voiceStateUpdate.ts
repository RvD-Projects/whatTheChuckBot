import { voiceConnectionsHelper } from "..";
import { Event } from "../class/Event";



export default new Event("voiceStateUpdate", async (oldState, newState) => {
    if(newState.member.user.bot) return;
    let channel = newState.channel;


    return;

});



