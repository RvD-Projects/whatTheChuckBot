import { client } from "..";
import { Command } from "../class/Command";

export default new Command({
    name: "help",
    public: true,
    description: "Will display help for commands. (this)",
    run: async ({ interaction }) => {
        if (interaction.member.user.bot) return;
        await interaction.reply({ content: await client.getCommandsHelp(), ephemeral: true });
    }
});