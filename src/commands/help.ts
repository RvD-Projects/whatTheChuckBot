import { client } from "..";
import { Command } from "../class/Command";


export default new Command({
    name: "help",
    description: "Will print this help menu.",
    run: async ({ interaction }) => {
        await interaction.deferReply( {ephemeral: false} );
        let str = await client.getCommandsHelp();
        interaction.followUp(str);
    }
});