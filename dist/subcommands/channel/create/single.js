"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const Subcommand_1 = require("../../../class/Subcommand");
exports.default = new Subcommand_1.SubCommand(async (commandContext) => {
    const interaction = commandContext.interaction;
    const ephemerality = await __1.commandHelper.resolveEphemerality(interaction, 'private');
    await interaction.deferReply({ ephemeral: ephemerality });
    const args = commandContext.args;
    const client = commandContext.client;
    let name = args.getString('channelname', true);
    let type = args.getInteger('channeltype', true);
    await interaction.guild.channels.create(name, {
        reason: "Slash command interaction",
        type: type
    });
    interaction.client.emit('warn', `NEW CHANNEL CREATED BY ${interaction.member.user.username} => channelName: ${name} | askedType: ${type}`);
    const followUpObjOpt = {
        reply: "I'm done! 😉"
    };
    await interaction.followUp(followUpObjOpt.reply);
    return;
});
