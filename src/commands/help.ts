import { client } from "..";
import { Command } from "../class/command";

export default new Command({
    name: "help",
    public: true,
    description: "Will display help for commands. (this)",
    run: async ({ interaction }) => {
        if (interaction.user.bot) return;
        await interaction.reply({ content: await client.getCommandsHelp(), ephemeral: true });
    }
});