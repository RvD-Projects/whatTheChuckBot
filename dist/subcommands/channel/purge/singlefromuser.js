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
    const followUpObj = new Subcommand_1.FollowUpObj();
    try {
        let messageAuthor = "";
        let numTotal = 0, numTriedInLoop = 0, numInDeletion = 0, numInCollection = 0;
        const askUsername = args.getUser('author', true).username;
        const channel = args.getChannel('channel', true);
        let msgCollection = await channel.messages.fetch(); /// Default to 50 messages fetched listed as date Desc.
        let collectionLastMsgID = msgCollection.lastKey(); /// Equivalent to the upmost posted msg. in the collection
        let bulkDeletionArray = [];
        let deletionArray = [];
        let iBulk = 0;
        while (msgCollection.size > 0) {
            if (numInCollection === msgCollection.size) {
                msgCollection = await channel.messages.fetch({ before: collectionLastMsgID });
                collectionLastMsgID = msgCollection.lastKey();
                numInCollection = 0;
            }
            msgCollection.forEach(mess => {
                messageAuthor = mess.author.username;
                numInCollection++;
                numTotal++;
                numTriedInLoop += messageAuthor === askUsername ? 1 : 0;
                if (mess.deletable && messageAuthor === askUsername) {
                    mess.createdTimestamp;
                    deletionArray.push(mess);
                }
            });
        }
        channel.bulkDelete(deletionArray);
        numInDeletion = deletionArray.length;
        if (numTriedInLoop > 0 && numInDeletion > 0) {
            followUpObj.reply = {
                content: `I'm done! I'll be deleting: ${numInDeletion}/${numTotal}. 😉:white_check_mark: `
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numInDeletion}`);
        }
        else if (numTotal === 0) {
            followUpObj.reply = {
                content: `I was unable to find any messages in this channel?! 🤔 :white_check_mark: `
            };
        }
        else if (numTriedInLoop === 0) {
            followUpObj.reply = {
                content: "No message found from this author! 🤔:white_check_mark: "
            };
        }
        else if (numInDeletion === 0 && numTriedInLoop > 0) {
            followUpObj.reply = {
                content: `I was unable to delete any of the ${numTriedInLoop} messages! 🤔:x:\nMaybe check the permissions I have on your server???`
            };
        }
        else if (numInDeletion !== numTriedInLoop) {
            followUpObj.reply = {
                content: `I was unable to delete ${numTriedInLoop - numInDeletion} of the messages! 🤔:x:`
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numInDeletion}`);
        }
        await interaction.editReply(followUpObj.reply);
        await interactionPostUpdate(commandContext, deletionArray);
    }
    catch (e) {
        followUpObj.fromatOnError(e);
        await interaction.followUp(followUpObj.reply);
        return;
    }
    return;
});
async function interactionPostUpdate(commandContext, deletionArray) {
    const args = commandContext.args;
    const interaction = commandContext.interaction;
    const interactionClient = commandContext.client;
    const ephemerality = commandContext.ephemerality;
    let numdeleted = 0, numInDeletion = deletionArray.length;
    let baseContent = "Post IS UPDATED HERES THE RESULTS !!!!!!!!\n";
    const uncachedReplyTo = await interaction.followUp({
        content: baseContent,
        ephemeral: ephemerality
    });
    const cacheReplyTo = await interaction.channel.messages.fetch(uncachedReplyTo.id);
    const replyTo = await interaction.channel.messages.fetch(cacheReplyTo.id);
    let payload;
    let gotErrors = false;
    for (const mess of deletionArray) {
        try {
            // let deleted = await mesgDeleterInterval(mess, 10000);
            // numdeleted += deleted.id ? 1 : 0
            payload = {
                content: baseContent + `Deleted: ${numdeleted}/${numInDeletion} delay = 2sec/msg. 😉:white_check_mark: `
            };
        }
        catch (error) {
            payload = {
                content: baseContent + `Deleted: ${numdeleted}/${numInDeletion} delay = 2sec/msg. 🤔:x:`
            };
            gotErrors = true;
        }
        await replyTo.edit(payload);
    }
    if (gotErrors)
        interaction.followUp({
            content: "Deletion is finnished !!!!!!!!",
            ephemeral: ephemerality
        });
    else {
        interaction.followUp({
            content: "Deletion is finnished !!!!!!!! \n Some errors occured in the proccess 🤔:x:",
            ephemeral: ephemerality
        });
    }
    return;
}
async function mesgDeleterInterval(msg, msInterval) {
    if (msInterval <= 0 || msInterval >= Number.MAX_SAFE_INTEGER) {
        const err = new Error();
        err.message = `[${err.stack}]\nArgument msInterval is out of range => number[0-maxSafeInt]`;
        throw err;
    }
    return new Promise(async (resolve) => {
        setTimeout(async () => {
            resolve(await msg.delete());
        }, msInterval);
    });
}
