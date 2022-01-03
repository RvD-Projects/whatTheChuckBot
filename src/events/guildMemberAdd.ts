import { TextBasedChannel } from "discord.js";
import { client, newCard } from "..";
import { Event } from "../class/Event";

export default new Event("guildMemberAdd", async (member, interaction?) => {
    if (member.user.bot) return;

    let memberDataExists = null // check BD for member that could have already been in this Guild

    if (true || memberDataExists) {

        let channel:TextBasedChannel = member.guild.systemChannel
        if(process.env.welcomeChannel.toLowerCase() !== "default" ) {
            channel = await client.findGuildChannel(process.env.welcomeChannel, "GUILD_TEXT") as TextBasedChannel;
        }

        await newCard.render(member, memberDataExists);
        return await newCard.send(channel);
    }
});