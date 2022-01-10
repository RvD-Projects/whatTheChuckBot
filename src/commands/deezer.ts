import { ChannelTypes } from "discord.js/typings/enums";
import { commandHelper, voiceConnectionsHelper } from "..";
import { Command } from "../class/Command";
import { CommandContext } from "../class/CommandContext";

export default new Command({
    name: "deezer",
    description: "Use the deezer endpoint from here.",
    options: [
        {
            type:"SUB_COMMAND",
                name:"next",
                description:"Will jump the Deezer® integration to the next queued track."
        },
        {   
            type:"SUB_COMMAND_GROUP",
            name:"play",
            description:"Used to search and establish an audio stream from Deezer®",
            options: [
                {
                    type:"SUB_COMMAND",
                    name:"track",
                    description:"xxx"
                },
                {
                    type:"SUB_COMMAND",
                    name:"artist",
                    description:"xxx",
                },
                {
                    type:"SUB_COMMAND",
                    name:"album",
                    description:"xxx"
                },
                {   //TODO:
                    type:"SUB_COMMAND",
                    name:"tracklist",
                    description:"xxx"
                },
                {   //TODO:
                    type:"SUB_COMMAND",
                    name:"fromtracklist",
                    description:"[N.A.]xxx"
                }
            ],
        },
    ],
    run: async ({ interaction, args, client }) =>  {

        const voiceChannel = await interaction.member.voice.channel;
        if(!voiceChannel) {
            await interaction.deferReply({ephemeral: true});
            interaction.followUp({
                ephemeral: true,
                content: "You have to join a voice channell first! 🤔:x:"
            });
            return;
        }

        const commandContext = new CommandContext(interaction, args, client);
        const subcommand = await commandHelper.importSubCommandFile(interaction);
        if (!subcommand) {
            await interaction.deferReply({ephemeral: true});
            interaction.followUp({
                ephemeral: true,
                content: "From SubCommand: I dont know what to do with that!\nThis command may be not implemented yet!:x:"
            });
            return;
        }

        await voiceConnectionsHelper.joinVoiceChannel(voiceChannel);
        subcommand.run(commandContext);
        return;

    }
});
