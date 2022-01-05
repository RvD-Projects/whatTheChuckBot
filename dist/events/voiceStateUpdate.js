"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../class/Event");
exports.default = new Event_1.Event("voiceStateUpdate", async (oldState, newState) => {
    if (newState.member.user.bot)
        return;
    let channel = newState.channel;
    return;
});
