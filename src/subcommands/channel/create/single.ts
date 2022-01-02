import { MessagePayload, InteractionReplyOptions } from "discord.js";
import { CommandContext } from "../../../structures/CommandContext";
import { SubCommand } from "../../../structures/Subcommand";

let self  = new SubCommand();
self.setRunFunction( runFunction )
export default self;

async function  runFunction(commandContext:CommandContext): Promise< string | MessagePayload | InteractionReplyOptions> {
    const args = commandContext.args;
    const client = commandContext.client;
    const interaction = commandContext.interaction;
    
    let name = args.getString('channelName');
    let type = args.getInteger('channelType');

    await interaction.guild.channels.create(name, {
        reason:"Slash command interaction",
        type: type
    });
    interaction.client.emit('warn', `NEW CHANNEL CREATED BY ${interaction.member.user.username} => channelName: ${name} | askedType: ${type}`);
    


    const followUpObjOpt = {
        content:"I'm done! 😉"
    };
    return await followUpObjOpt;
}

