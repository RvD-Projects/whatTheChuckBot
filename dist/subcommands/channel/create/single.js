"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subcommand_1 = require("../../../class/Subcommand");
exports.default = new Subcommand_1.SubCommand(async (commandContext) => {
    const args = commandContext.args;
    const client = commandContext.client;
    const interaction = commandContext.interaction;
    let name = args.getString('channelName');
    let type = args.getInteger('channelType');
    await interaction.guild.channels.create(name, {
        reason: "Slash command interaction",
        type: type
    });
    interaction.client.emit('warn', `NEW CHANNEL CREATED BY ${interaction.member.user.username} => channelName: ${name} | askedType: ${type}`);
    const followUpObjOpt = {
        content: "I'm done! 😉"
    };
    return await followUpObjOpt;
});
