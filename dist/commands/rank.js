"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Command_1 = require("../structures/Command");
const Levels_1 = require("../tools/class/Levels");
exports.default = new Command_1.Command({
    name: "rank",
    description: "Will print out the rank card of a user (your's by default).",
    options: [
        { name: 'user', type: 'USER', description: 'The user to get rank from.', required: false },
        { name: 'public', type: 'BOOLEAN', description: 'Show the card to th public? Default = True (True|False)', required: false },
        //TODO resolve lightmode
        { name: 'light', type: 'BOOLEAN', description: '[BETA] Overwrite the card style to light mode? (True|False)', required: false }
    ],
    run: async ({ interaction, args, client }) => {
        const isPrivate = args.getBoolean('public') ? true : false;
        await interaction.deferReply({ ephemeral: isPrivate });
        const user = args.getUser('user');
        const lightmode = args.getBoolean('light');
        const member = user ? await interaction.guild.members.cache.get(user.id) : interaction.member;
        const guild = interaction.guild;
        let isNew = false;
        // Selects the member from the database.
        let memmberData = await Levels_1.Levels.fetch(member.id, guild.id, true);
        if (!memmberData) {
            await interaction.editReply("Account's not found! We are trying to register you! ⚙⚙⚙");
            await Levels_1.Levels.createUser(member.id, guild.id);
            memmberData = await Levels_1.Levels.fetch(member.id, guild.id, true);
        }
        if (!memmberData) {
            return await interaction.followUp("We could not register you sorry 😞, contact the server administrators!");
        }
        const extraData = { requieredXp: Levels_1.Levels.xpFor(memmberData.level + 1) };
        await __1.newCard.render(member, memmberData, extraData, 'rank');
        return await interaction.followUp({
            content: "Here's the info we got on this user so far. 🚀🚀🚀",
            files: [__1.newCard.attachement]
        });
    }
});
