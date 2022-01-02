import { TextBasedChannel } from "discord.js";
import { client, newCard } from "..";
import { Command } from "../structures/Command";


export default new Command({
    name: "welcome",
    description: "Will send a welcome banner. For yourself or others",
    options: [
        { name: 'user', type: 'USER', description: 'The user to get rank from. Default = YOU', required: false },
        { name: 'private', type: 'BOOLEAN', description: 'Show the card only to yourself? Default = True (True|False)', required: false }
    ],
    run: async ({ interaction }) => {

        let isPrivate = interaction.options.getBoolean('private');
        if(isPrivate === undefined || isPrivate === null)
            isPrivate = true;
        else {
            isPrivate = interaction.options.getBoolean('private');
        }
        isPrivate = isPrivate ? true : false;
        

        await interaction.deferReply({ ephemeral: isPrivate });

        const user = interaction.options.getUser('user')
        const member = user ? await interaction.guild.members.cache.get(user.id) : interaction.member;

        if (member.user.bot) return await interaction.followUp("Tried to send welcome cards to a bot -> This user is not human!");

        //TODO: check BD for member that could have already been in this Guild
        let memberDataExists = null

        if (true || memberDataExists) {

            let channel:TextBasedChannel = interaction.member.guild.systemChannel
            if(process.env.welcomeChannel.toLowerCase() !== "default" ) {
                channel = await client.findGuildChannel(process.env.welcomeChannel, "GUILD_TEXT") as TextBasedChannel;
            }

            await newCard.render(member, memberDataExists);
            return await interaction.followUp({files: [newCard.attachement]});
        }
    }
});