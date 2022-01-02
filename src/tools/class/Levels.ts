import DiscordXp, { User } from "discord-xp";
const mongoose = require("mongoose");
const models = {
    levels:require("../../../node_modules/discord-xp/models/levels.js")
}

export class Levels extends DiscordXp {


    static async  appendRandomXp(user, min: number, max: number)  {
        const rnd = Math.floor(Math.random() * max) + min;

        if( !user.id || !user.guildID) return;

        return await Levels.appendXp(user.userID, user.guildID, rnd);
    }

    // static async createUser(userId: string, guildId: string) {
    //     if (!userId) throw new TypeError("An user id was not provided.");
    //     if (!guildId) throw new TypeError("A guild id was not provided.");

    //     const isUser = await models.levels.findOne({ userID: userId, guildID: guildId });
    //     if (isUser) return false;

    //     const newUser = new models.levels({
    //     userID: userId,
    //     guildID: guildId
    //     });

    //     await newUser.save().catch(e => console.log(`Failed to create user: ${e}`));
    //     return newUser;
    // }

    constructor() {
        super()
        this.connect() ? console.warn("Levels DB is connected !") : null;
    }

    async connect() {
        await Levels.setURL(process.env.mongoUrl);
        return 1;
    }
    
    static async fetchLeaderboard(guildId, limit?:number) {
        if (!guildId) throw new TypeError("A guild id was not provided.");
        var users = await models.levels.find({ guildID: guildId }).sort([['xp', 'descending']]).exec();

        if(limit) return users.slice(0, limit);
        return users;
    }

    static async updateUsers(guild): Promise<string> {

        let updated = false;
        const members = await guild.members.cache;
        let humanMember = members.size;
        const lvlUsers = await Levels.fetchLeaderboard(guild.id);
        
        let notFound = [];
        members.forEach(member => {
            if(!member.user.bot) {
                let found = false;
                for (let i = 0; i < lvlUsers.length; i++) {
                    found = member.id === lvlUsers[i].userID;
                    if(found) break;
                }
                if(!found) {
                    notFound.push(member.id);
                }
            }
            else {
                humanMember--;
            }
        });

        let tmp = 0;
        if(notFound.length > 0) {
            updated = true;
            notFound.forEach( memberID => {
                let created = Levels.createUser(memberID, guild.id);
                tmp = created ? tmp+1 : tmp;
            });
        }

        if(!updated)
            return await "All human members are already registered! 🚀🚀🚀";

        if (updated && tmp === notFound.length)
            return await `We've updated: ${tmp}/${humanMember} human members! 🚀🚀🚀 All members are registered!`;
        else if (updated)
            return await `We've updated: ${tmp}/${humanMember} human members! 🚀🚀🚀 But ${notFound.length - tmp} users are missing!`;
    }



    
}