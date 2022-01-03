import { newCard } from "..";
import { Command } from "../class/Command";
import { Levels } from "../tools/class/Levels";

export default new Command({
    name: "rank",
    description: "Will print out the rank card of a user (your's by default).",
    options:[
        {name: 'user', type: 'USER', description: 'The user to get rank from.', required: false},
        {name: 'public', type: 'BOOLEAN', description: 'Show the card to th public? Default = True (True|False)', required: false},
        //TODO resolve lightmode
        {name: 'light', type: 'BOOLEAN', description: '[BETA] Overwrite the card style to light mode? (True|False)', required: false}
    ],

    run: async ({ interaction, args, client }) => {

        const isPrivate = args.getBoolean('public') ? true : false;
        await interaction.deferReply( {ephemeral: isPrivate} );

        const user = args.getUser('user');
        const lightmode = args.getBoolean('light');

        const member = user ? await interaction.guild.members.cache.get(user.id) : interaction.member;
        const guild = interaction.guild;
        let isNew = false;


        // Selects the member from the database.
        let memmberData =  await Levels.fetch(member.id, guild.id, true);

        if (!memmberData) {
            await interaction.editReply("Account's not found! We are trying to register you! ⚙⚙⚙");
            await Levels.createUser(member.id, guild.id);
            memmberData =  await Levels.fetch(member.id, guild.id, true);
        }

        if (!memmberData) { 
            return await interaction.followUp("We could not register you sorry 😞, contact the server administrators!");
        }

        const extraData = { requieredXp: Levels.xpFor(memmberData.level + 1) };
        await newCard.render(member, memmberData, extraData, 'rank');
        return await interaction.followUp({
            content: "Here's the info we got on this user so far. 🚀🚀🚀", 
            files: [newCard.attachement]
        });
    }
});