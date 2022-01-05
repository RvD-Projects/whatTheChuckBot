import { MessagePayload, InteractionReplyOptions } from "discord.js";
import { commandHelper } from "../../..";
import { CommandContext } from "../../../class/CommandContext";
import { SubCommand } from "../../../class/Subcommand";

export default new SubCommand( async (commandContext:CommandContext) => {


    const interaction = commandContext.interaction;
    const ephemerality = await commandHelper.resolveEphemerality(interaction, 'private');
    await interaction.deferReply( {ephemeral: ephemerality } );

    const args = commandContext.args;
    const client = commandContext.client;

    
    let name = args.getString('channelname', true);
    let type = args.getInteger('channeltype', true);

    await interaction.guild.channels.create(name, {
        reason:"Slash command interaction",
        type: type
    });
    interaction.client.emit('warn', `NEW CHANNEL CREATED BY ${interaction.member.user.username} => channelName: ${name} | askedType: ${type}`);
    

    const followUpObjOpt = {
        reply:"I'm done! 😉"
    };

    await interaction.followUp(followUpObjOpt.reply)
    return;
});

