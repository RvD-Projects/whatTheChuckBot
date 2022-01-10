import { GuildTextBasedChannel, Message } from "discord.js";
import { commandHelper } from "../../..";
import { CommandContext } from "../../../class/CommandContext";
import { FollowUpObj, SubCommand } from "../../../class/Subcommand";
import { isBulkable, cacheAndGetFollowUpMsg, bulkMesgDeleterInterval, mesgDeleterInterval } from "../../../tools/myFunctions";
var numInDeletion = 0;
export default new SubCommand( async (commandContext:CommandContext) => {

    
    const interaction = commandContext.interaction;
    const ephemerality = await commandHelper.resolveEphemerality(interaction, 'private');
    await interaction.deferReply( {ephemeral: ephemerality } );
    
    const args = commandContext.args;
    const client = commandContext.client;
    
    const followUpObj = new FollowUpObj();
    
    try {
        let messageAuthor = "";
        let numTotal = 0, numTriedInLoop = 0, numInCollection = 0;
        
        const askUsername = args.getUser('author', true).username;
        const channel = args.getChannel('channel', true) as GuildTextBasedChannel;

        
        let msgCollection = await channel.messages.fetch(); /// Default to 50 messages fetched listed as date Desc.
        let collectionLastMsgID = msgCollection.lastKey(); /// Equivalent to the upmost posted msg. in the collection

        let bulkDeletionArray:Array<Message>[] = [[]];
        let deletionArray:Message[] = [];
        let iBulk = 0;

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
                    numInDeletion++;
                    if( isBulkable(mess.createdTimestamp, 12) ) {
                        if(bulkDeletionArray[iBulk].length === 100){
                            bulkDeletionArray.push([]);
                            iBulk++;
                        } 
                        bulkDeletionArray[iBulk].push(mess);
                    }
                    else {
                        deletionArray.push(mess)
                    }
                }
            });
        }

   
        if(numTriedInLoop > 0 && numInDeletion > 0){
            followUpObj.reply = {
                content:`Understood! I'll be deleting: ${numInDeletion}/${numTotal}. 😉:white_check_mark: `
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numInDeletion}`) ;
        }
        else if(numTotal === 0) {
            followUpObj.reply = {
                content:`I was unable to find any messages in this channel?! 🤔 :white_check_mark: `
            };
        }
        else if(numTriedInLoop === 0) {
            followUpObj.reply = {
                content:"No message found from this author! 🤔:white_check_mark: "
            };
        }
        else if(numInDeletion === 0 && numTriedInLoop > 0) {
            followUpObj.reply = {
                content:`I was unable to delete any of the ${numTriedInLoop} messages! 🤔:x:\nMaybe check the permissions I have on your server???`
            };
        }
        else if(numInDeletion !== numTriedInLoop) {
            followUpObj.reply = {
                content:`I was unable to delete ${numTriedInLoop - numInDeletion} of the messages! 🤔:x:`
            };
            interaction.client.emit('debug', `CHANNEL ${channel.name} IS BEING PURGED BY ${interaction.member.user.username} => channelID: ${channel.id} numDelted: ${numInDeletion}`) ;
        }

        await interaction.editReply( followUpObj.reply );
        if(deletionArray || bulkDeletionArray[0].length > 0)
        await interactionPostUpdate(commandContext, deletionArray, bulkDeletionArray);
    }
    catch (e) {
        followUpObj.fromatOnError(e)
        await interaction.followUp(followUpObj.reply);
        numInDeletion = 0;
        return;
    }
    numInDeletion = 0;
    return;
});



async function interactionPostUpdate(commandContext:CommandContext,
        deletionArray:Array<Message>,
        bulkDeletionArr:Array<Message>[]){

    const args = commandContext.args;
    const interaction = commandContext.interaction;
    const interactionClient = commandContext.client;
    const ephemerality = commandContext.ephemerality;
    
    let payload;
    let gotErrors = false;
    let numdeleted = 0
    let replyTo;


    // TODO: fetch the API for dynamique usage and inject into client message about delay
    const msInterval = 3000;
    
    if(bulkDeletionArr) {
        await (async ()=> {

            let baseContent = "Deletion in progress !!!!!!!!\n Doin grouped deletion for recent messages.";
            replyTo = await interaction.followUp({
                content:baseContent,
                ephemeral: ephemerality
            });
            replyTo = await cacheAndGetFollowUpMsg(replyTo, interaction);
    
            const channel = args.getChannel('channel', true) as GuildTextBasedChannel;
            for(const bulkMessageArray of bulkDeletionArr){
            
                try {
                    let deleted = await bulkMesgDeleterInterval(channel,bulkMessageArray, msInterval);
                    numdeleted += deleted.size === bulkMessageArray.length ? bulkMessageArray.length : 0
            
                    payload = {
                        content:baseContent+`Deleted: ${numdeleted}/${numInDeletion} delay = max 100msg./${msInterval/1000}sec. 😉:white_check_mark: `
                    };
                    
                } catch (error) {
                    console.warn(error.message);
                    payload = {
                        content:baseContent+`Failed: ${numdeleted}/${numInDeletion} delay = max 100msg./${msInterval/1000}sec. 🤔:x:`
                    };
                    gotErrors = true;
                }
                await replyTo.edit(payload);
            }
        })();
    }


    if(deletionArray){
        await (async ()=> {
            let baseContent = "Deletion in progress !!!!!!!!\n Doing singular deletion for older messages.";
            if(!bulkDeletionArr){
                replyTo = await interaction.followUp({
                    content:baseContent,
                    ephemeral: ephemerality
                });
                replyTo = await cacheAndGetFollowUpMsg(replyTo, interaction);
            }
    
            for(const mess of deletionArray){
    
                try {
                    let deleted = mess.deletable ? await mesgDeleterInterval(mess, msInterval) : null;
                    numdeleted += deleted.id ? 1 : 0
            
                    payload = {
                        content:baseContent+`Deleted: ${numdeleted}/${numInDeletion} delay = max 1msg./${msInterval/1000}sec. 😉:white_check_mark: `
                    };
                    
                } catch (error) {
                    console.warn(error.message);
                    payload = {
                        content:baseContent+`Failed: ${numdeleted}/${numInDeletion} delay = max 1msg/${msInterval/1000}sec. 🤔:x:`
                    };
                    gotErrors = true;
                }
                await replyTo.edit(payload);
            }
        })();
    }

    if(gotErrors) {
        interaction.followUp({
            content:"Deletion is finnished !!!!!!!! \n Some errors occured in the proccess 🤔:x:",
            ephemeral: ephemerality
        });
        return;
    }
    interaction.followUp({
        content:"Deletion is finnished !!!!!!!! 😉:white_check_mark: ",
        ephemeral: ephemerality
    });
    return;
}
