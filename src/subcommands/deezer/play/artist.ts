import { commandHelper } from "../../..";
import { CommandContext } from "../../../class/CommandContext";
import { FollowUpObj, SubCommand } from "../../../class/Subcommand";

export default new SubCommand( async (commandContext:CommandContext) => {

    
    const interaction = commandContext.interaction;
    const ephemerality = await commandHelper.resolveEphemerality(interaction, 'public');
    await interaction.deferReply( {ephemeral: ephemerality } );
    
    const args = commandContext.args;
    const client = commandContext.client;
    
    const followUpObj = new FollowUpObj();
    
    try {
   
        

    }
    catch (error) {
        return;
    }

});