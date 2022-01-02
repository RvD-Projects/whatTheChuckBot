import { client } from "..";
import { Command } from "../structures/Command";


export default new Command({
    name: "chuckhelp",
    description: "Will print this help menu.",
    run: async ({ interaction }) => {
        await interaction.deferReply( {ephemeral: false} );
        let str = await client.getCommandsHelp();
        interaction.followUp(str);
    }
});