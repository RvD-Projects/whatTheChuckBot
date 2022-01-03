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
        let messageAuthor = "";
        let numTotal = 0, numTriedInLoop = 0, numInDeletion = 0, numInCollection = 0;
        
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
                
                numTriedInLoop += messageAuthor === askUsername ? 1 : 0
                if(mess.deletable && messageAuthor === askUsername){
                    deletionArray.push(mess)
                }
            });
        }



        numInDeletion = deletionArray.length;     
        if(numTriedInLoop > 0 && numInDeletion > 0){
            followUpObj.reply = {
                content:`I'm done! I'll be deleting: ${numInDeletion}/${numTotal} delay = 1x/sec. 😉✔️
                Dont forget to refresh the server your viewing by switching between servers.`
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numInDeletion}`) ;
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
        else if(numInDeletion === 0 && numTriedInLoop > 0) {
            followUpObj.reply = {
                content:`I was unable to delete any of the ${numTriedInLoop} messages! 🤔❌\nMaybe check the permissions I have on your server???`
            };
        }
        else if(numInDeletion !== numTriedInLoop) {
            followUpObj.reply = {
                content:`I was unable to delete ${numTriedInLoop - numInDeletion} of the messages! 🤔❌`
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numInDeletion}`) ;
        }


        await interaction.editReply( followUpObj.reply );
        await interactionPostUpdate(commandContext, deletionArray);
    }
    catch (e) {
        followUpObj.fromatOnError(e)
        await interaction.followUp(followUpObj.reply);
        return;
    }

    return;
}


async function interactionPostUpdate(commandContext:CommandContext, deletionArray:Array<Message>){

    const args = commandContext.args;
    const interaction = commandContext.interaction;
    const interactionClient = commandContext.client;
    const ephemerality = commandContext.ephemerality;

    let numdeleted = 0, numInDeletion = deletionArray.length;


    let baseContent = "Post IS UPDATED HERES THE RESULTS !!!!!!!!\n";

    const uncachedReplyTo = await interaction.followUp({
        content:baseContent,
        ephemeral: ephemerality
    });
    const cacheReplyTo = await interaction.channel.messages.fetch(uncachedReplyTo.id);
    const lastIdTest = 
    //const replyTo = await interaction.channel.messages.fetch(cacheReplyTo.id);

    interaction.fetchReply()


    for(const mess of deletionArray){
        let deleted = await mesgDeleterInterval(mess, 1010);
        numdeleted += deleted.id ? 1 : 0

        let payload = {
            content:baseContent+`Deleted: ${numdeleted}/${numInDeletion} delay = 1x/sec. 😉✔️`
        };
        replyTo.edit(payload);
    }



    interaction.followUp({
        content:"Post is finnished !!!!!!!!",
        ephemeral: ephemerality
    });

}


async function mesgDeleterInterval(msg:Message, msInterval:number) {
    if(msInterval <= 0 || msInterval >= Number.MAX_SAFE_INTEGER){
        const err = new Error();
        err.message = `[${err.stack}]\nArgument msInterval is out of range => number[0-maxSafeInt]`;
        throw err;
    }
    
    return new Promise<Message> ( async (resolve) => {
        setTimeout( async () => {
            resolve( await msg.delete() ); 
        }, msInterval);
    });
}