"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subcommand_1 = require("../../../structures/Subcommand");
const self = new Subcommand_1.SubCommand();
self.setRunFunction(runFunction);
exports.default = self;
async function runFunction(commandContext) {
    const args = commandContext.args;
    const interaction = commandContext.interaction;
    const interactionClient = commandContext.client;
    const followUpObj = new Subcommand_1.FollowUpObj();
    try {
        let messageAuthor;
        let numTotal, numTriedInLoop, numDeleted, numInCollection = 0;
        const askUsername = args.getUser('author', true).username;
        const channel = args.getChannel('channel', true);
        let msgCollection = await channel.messages.fetch(); /// Default to 50 messages fetched listed as date Desc.
        let collectionLastMsgID = msgCollection.lastKey(); /// Equivalent to the upmost posted msg. in the collection
        let deletionArray = [];
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
                numTriedInLoop += (messageAuthor === askUsername) ? 1 : 0;
                if (mess.deletable && messageAuthor === askUsername) {
                    deletionArray.push(mess);
                }
            });
        }
        (async () => {
            for (const mess of deletionArray) {
                await mesgDeleterInterval(mess, 1010);
            }
        })();
        if (numTriedInLoop > 0 && numDeleted > 0) {
            followUpObj.reply = {
                content: `I'm done! I'll be deleting: ${numDeleted}/${numTotal} delay = 5msg./4sec. 😉✔️
                Dont forget to refresh the server your viewing by switching or exiting the disccord application.`
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numDeleted}`);
        }
        else if (numTotal === 0) {
            followUpObj.reply = {
                content: `I was unable to find any messages in this channel?! 🤔✔️`
            };
        }
        else if (numTriedInLoop === 0) {
            followUpObj.reply = {
                content: "No message found from this author! 🤔✔️"
            };
        }
        else if (numDeleted === 0 && numTriedInLoop > 0) {
            followUpObj.reply = {
                content: `I was unable to delete any of the ${numTriedInLoop} messages! 🤔❌\nMaybe check the permissions I have on your server???`
            };
        }
        else if (numDeleted !== numTriedInLoop) {
            followUpObj.reply = {
                content: `I was unable to delete ${numTriedInLoop - numDeleted} of the messages! 🤔❌`
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numDeleted}`);
        }
    }
    catch (e) {
        return await followUpObj.fromatOnError(e);
    }
    return followUpObj;
}
async function grandFinal(deletionArray, interval) {
    for (const msg of deletionArray) {
        await mesgDeleterInterval(msg, interval);
    }
}
function mesgDeleterInterval(msg, msInterval) {
    if (msInterval <= 0 || msInterval >= Number.MAX_SAFE_INTEGER) {
        const err = new Error();
        err.message = `[${err.stack}]\nArgument msInterval is out of range => number[0-maxSafeInt]`;
    }
    return new Promise((resolve) => {
        console.warn('called interval');
        var interval = setTimeout(() => {
            msg.delete(); // <- Cannot delete too fast for API limitation
            resolve(true);
        }, msInterval);
    });
}
