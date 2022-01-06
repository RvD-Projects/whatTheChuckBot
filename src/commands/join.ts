import { voiceConnectionsHelper } from "..";
import { Command } from "../class/Command";


export default new Command({
    name: "join",
    description: "Will make the bot join your voice channel",
    run: async ({ interaction }) => {
        await interaction.deferReply( {ephemeral: true} );
        const cmdChannel = await interaction.channel
        const voiceChannel = await interaction.member.voice.channel

        if(!voiceChannel) return interaction.followUp("You have to join a voice channell first! 🤔:x:");

        await voiceConnectionsHelper.joinVoiceChannel(voiceChannel);
        //connection.destroy();  aftr 120sec
        return interaction.followUp("Alright joining your channel, don't mind me! 😉:white_check_mark: ");
    }
});