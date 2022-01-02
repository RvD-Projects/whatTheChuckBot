import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";
import { CommandInteractionOptionResolver } from "discord.js";


export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        if (interaction.member.user.bot) return;
        const command = client.commands.get(interaction.commandName);
        
        if (!command) {
            return interaction.followUp({
                ephemeral: true,
                content: "I dont know what to do with that!"
            });
        }

        return command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
        });
    }
    
    //TODO: THIS
    // if (interaction.isSelectMenu()) {
        
    //     const message = interaction.channel.lastMessage;
    //     const collector = message.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 15000 });

    //     collector.on('collect', smi => {
    //         if (smi.user.id === interaction.user.id) {
    //             smi.reply(`${smi.user.id} clicked on the ${smi.customId} button.`);
    //         } else {
    //             smi.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    //         }
    //     });

    //     collector.on('end', collected => {
    //         console.log(`Collected ${collected.size} interactions.`);
    //     });
        
    // }
});
