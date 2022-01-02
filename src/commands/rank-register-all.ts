import { Command } from "../structures/Command";
import { Levels } from "../tools/class/Levels";


export default new Command({
    name: "rank-register-all",
    description: "Will check for unegistered users and register them to the ranking system.",
    run: async ({ interaction }) => {
        
        await interaction.deferReply( {ephemeral: true} );

        const returned = await Levels.updateUsers(interaction.guild);
        return await interaction.followUp({
            content: returned
        });
    }
});