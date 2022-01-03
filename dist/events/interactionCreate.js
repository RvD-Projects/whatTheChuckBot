"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Event_1 = require("../class/Event");
exports.default = new Event_1.Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        if (interaction.member.user.bot)
            return;
        const command = __1.client.commands.get(interaction.commandName);
        if (!command) {
            return interaction.followUp({
                ephemeral: true,
                content: "I dont know what to do with that!"
            });
        }
        return command.run({
            args: interaction.options,
            client: __1.client,
            interaction: interaction,
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
