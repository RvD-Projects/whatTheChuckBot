"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Event_1 = require("../class/Event");
const Levels_1 = require("../tools/class/Levels");
exports.default = new Event_1.Event("messageCreate", async (message) => {
    // Chat Inputs
    if (message.author.bot)
        return;
    // if (message.content.startsWith('${chk}')) {;
    //     const formated = message.content.replace('${chk}', '').split(' ');
    //     const cmdFunc = formated[0];
    //     const cmdArgs = formated.splice(0,1);
    // User Xp delivering
    const target = message.member;
    let user = await Levels_1.Levels.fetch(target.user.id, message.guildId);
    const oldLvl = user.level;
    if (user)
        await Levels_1.Levels.appendRandomXp(user, 1, 10);
    user = await Levels_1.Levels.fetch(target.user.id, message.guildId, true);
    const newLvl = user.level;
    if (oldLvl < newLvl) {
        const extraData = { requieredXp: Levels_1.Levels.xpFor(user.level + 1) };
        await message.channel.send(target.user.username + " gained a level! ⬆️⬆️⬆️ This member is now lvl: " + newLvl);
        await __1.newCard.render(target, user, extraData, 'rank');
        await message.reply({
            content: "Here's the info we got on you so far. 🚀🚀🚀",
            files: [__1.newCard.attachement]
        });
    }
    return;
});
