import { client } from "..";
import { Event } from "../class/Event";
import { ExtendedInteraction } from "../typings/Command";
import { CommandInteractionOptionResolver } from "discord.js";


export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        if (interaction.member.user.bot) return;
        const command = client.commands.get(interaction.commandName);
        
        if (!command) {
            await interaction.deferReply({ephemeral: true});
            interaction.followUp({
                ephemeral: true,
                content: "From Command: I dont know what to do with that!\nThis command may be not implemented yet!:x:"
            });
            return;
        }

        return command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
        });
    }

});
