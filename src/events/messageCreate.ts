import { client, newCard } from "..";
import { Event } from "../class/Event";
import { Options } from "discord.js";
import { Levels } from "../tools/class/Levels";

export default new Event("messageCreate", async (message) => {
    // Chat Inputs
    if (message.author.bot) return;
    // if (message.content.startsWith('${chk}')) {;
    //     const formated = message.content.replace('${chk}', '').split(' ');
    //     const cmdFunc = formated[0];
    //     const cmdArgs = formated.splice(0,1);



    // User Xp delivering
    const target = message.member;
    let user = await Levels.fetch(target.user.id, message.guildId);
    const oldLvl = user.level;
    if(user) await Levels.appendRandomXp(user, 1, 10);

    user = await Levels.fetch(target.user.id, message.guildId, true);
    const newLvl = user.level;

    if(oldLvl < newLvl) {
        const extraData = { requieredXp: Levels.xpFor(user.level + 1) };
        await message.channel.send(target.user.username + " gained a level! ⬆️⬆️⬆️ This member is now lvl: " + newLvl);
        await newCard.render(target, user, extraData, 'rank');
        await message.reply({
            content: "Here's the info we got on you so far. 🚀🚀🚀", 
            files: [newCard.attachement]
        });
    }
    return;
});