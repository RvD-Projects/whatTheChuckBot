import { GuildTextBasedChannel, Message } from "discord.js";
import { CommandContext } from "../../../structures/CommandContext";
import { FollowUpObj, SubCommand } from "../../../structures/Subcommand";
import { deferedMsgDeletion } from "../../../tools/myFunctions";

const self = new SubCommand();
self.setRunFunction( runFunction )
export default self;

async function runFunction(commandContext:CommandContext): Promise<FollowUpObj> {

    
    const args = commandContext.args;
    const interaction = commandContext.interaction;
    const interactionClient = commandContext.client;
    const followUpObj = new FollowUpObj();
    
    try {
        let messageAuthor;
        let numTotal, numTriedInLoop, numDeleted, numInCollection = 0;
        
        const askUsername = args.getUser('author', true).username;
        const channel = args.getChannel('channel', true) as GuildTextBasedChannel;
        
        let msgCollection = await channel.messages.fetch(); /// Default to 50 messages fetched listed as date Desc.
        let collectionLastMsgID = msgCollection.lastKey(); /// Equivalent to the upmost posted msg. in the collection

        let deletionArray:Message[] = [];

        while(msgCollection.size > 0) {

            if(numInCollection === msgCollection.size) {
                msgCollection = await channel.messages.fetch({before: collectionLastMsgID});
                collectionLastMsgID = msgCollection.lastKey();
                numInCollection = 0;
            }

            msgCollection.forEach(mess => {
                messageAuthor = mess.author.username;
                numInCollection++;
                numTotal++;
                
                numTriedInLoop+= (messageAuthor === askUsername) ? 1 : 0
                if(mess.deletable && messageAuthor === askUsername){
                    deletionArray.push(mess)
                }
            });
        }

        
        (async () => {
            for (const mess of deletionArray) {
                await mesgDeleterInterval(mess, 1010);
            }
        })();


        
        if(numTriedInLoop > 0 && numDeleted > 0){
            followUpObj.reply = {
                content:`I'm done! I'll be deleting: ${numDeleted}/${numTotal} delay = 1x/sec. 😉✔️
                Dont forget to refresh the server your viewing by switching or exiting the disccord application.`
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numDeleted}`) ;
        }
        else if(numTotal === 0) {
            followUpObj.reply = {
                content:`I was unable to find any messages in this channel?! 🤔✔️`
            };
        }
        else if(numTriedInLoop === 0) {
            followUpObj.reply = {
                content:"No message found from this author! 🤔✔️"
            };
        }
        else if(numDeleted === 0 && numTriedInLoop > 0) {
            followUpObj.reply = {
                content:`I was unable to delete any of the ${numTriedInLoop} messages! 🤔❌\nMaybe check the permissions I have on your server???`
            };
        }
        else if(numDeleted !== numTriedInLoop) {
            followUpObj.reply = {
                content:`I was unable to delete ${numTriedInLoop - numDeleted} of the messages! 🤔❌`
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numDeleted}`) ;
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

function mesgDeleterInterval(msg:Message, msInterval:number) {
    if(msInterval <= 0 || msInterval >= Number.MAX_SAFE_INTEGER){
        const err = new Error();
        err.message = `[${err.stack}]\nArgument msInterval is out of range => number[0-maxSafeInt]`;
    }
        
    return new Promise ( (resolve) => {
        console.warn('called interval');

        var interval = setTimeout(() => {
            msg.delete();   // <- Cannot delete too fast for API limitation
            resolve(true);
        }, msInterval);
    });
}