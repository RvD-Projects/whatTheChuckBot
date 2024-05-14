import { ActionRowBuilder, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Command } from "../class/command";

export default new Command({
	name: "test",
	public: true,
	description: "Used in BETA environment only.",
	run: async ({ interaction }) => {
		if (interaction.user.bot) return;
		if (process.env.environment !== "dev") return;

		const modal = new ModalBuilder()
			.setCustomId('testForm')
			.setTitle('My test form');

		// Create the text input components
		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
			.setStyle(TextInputStyle.Short)
			// The label is the prompt the user sees for this input
			.setLabel("What's your favorite color?")
			// Short means only a single line of text
			// set the maximum number of characters to allow
			.setMaxLength(1000)
			// set the minimum number of characters required for submission
			.setMinLength(10)
			// set a placeholder string to prompt the user
			.setPlaceholder('Enter some text!')
			// set a default value to pre-fill the input
			.setValue('Default')
			// require a value in this input field
			.setRequired(true);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
			// Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(hobbiesInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);

		// Show the modal to the user
		await interaction.reply({ content: "Pong!", ephemeral: true });
		await interaction.showModal(modal);
	}
});