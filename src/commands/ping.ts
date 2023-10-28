import { Command } from "../class/Command";

export default new Command({
    name: "ping",
    description: "Will send a ping resquest to the bot.",
    run: async ({ interaction }) => {
        if (interaction.member.user.bot) return;
        await interaction.reply({ content: "Pong!", ephemeral: true });
    }
});