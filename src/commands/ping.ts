import { Command } from "../class/command";

export default new Command({
    name: "ping",
    public: true,
    description: "Will pong",
    run: async ({ interaction }) => {
        if (interaction.user.bot) return;
        await interaction.reply({ content: "PONG!", ephemeral: true });
    }
});