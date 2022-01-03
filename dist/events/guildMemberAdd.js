"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Event_1 = require("../class/Event");
exports.default = new Event_1.Event("guildMemberAdd", async (member, interaction) => {
    if (member.user.bot)
        return;
    let memberDataExists = null; // check BD for member that could have already been in this Guild
    if (true || memberDataExists) {
        let channel = member.guild.systemChannel;
        if (process.env.welcomeChannel.toLowerCase() !== "default") {
            channel = await __1.client.findGuildChannel(process.env.welcomeChannel, "GUILD_TEXT");
        }
        await __1.newCard.render(member, memberDataExists);
        return await __1.newCard.send(channel);
    }
});
