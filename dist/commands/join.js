"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Command_1 = require("../class/Command");
exports.default = new Command_1.Command({
    name: "join",
    description: "Will make the bot join your voice channel",
    run: async ({ interaction }) => {
        await interaction.deferReply({ ephemeral: true });
        const cmdChannel = await interaction.channel;
        const voiceChannel = await interaction.member.voice.channel;
        if (!voiceChannel)
            return interaction.followUp("You have to join a voice channell first! 🤔❌");
        await __1.voiceConnectionsHelper.joinVoiceChannel(voiceChannel);
        //connection.destroy();
        return interaction.followUp("Alright joining your channel, don't mind me! 😉✔️");
    }
});
