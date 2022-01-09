import { Collection, GuildTextBasedChannel, Message } from "discord.js";
import { ExtendedInteraction } from "../typings/Command";

export function escapeEntities(str:string) {
    const htmlEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    };
    return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);
}

export function unescapeEntities(str:string) {
    const htmlEntities = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'"
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, match => htmlEntities[match]);
}

export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    return true;
}


export async function deferedMsgDeletion(mess:Message, msInterval:number) {
    // if(msInterval <= 0 || msInterval >= Number.MAX_SAFE_INTEGER){
    //     const err = new Error();
    //     err.message = `[${err.stack}]\nArgument msInterval is out of range => number[0-maxSafeInt]`;
    //     throw err;
    // }
        
    return new Promise ( (resolve) => {
        console.warn('called interval');
        var interval = setTimeout(() => {
            resolve(mess.delete());
        }, msInterval);
    });
}

export async function bulkMesgDeleterInterval(channel:GuildTextBasedChannel, msgBulk:Array<Message>, msInterval:number) {
    if(msInterval <= 0 || msInterval >= Number.MAX_SAFE_INTEGER){
        const err = new Error();
        err.message = `[${err.stack}]\nArgument msInterval is out of range => number[0-maxSafeInt]`;
        throw err;
    }

    //for each 100.... cause 100 bulk max / timeout
        return new Promise<Collection<string, Message<boolean>>> ( async (resolve, reject) => {
            setTimeout( async () => {
                resolve( channel.bulkDelete(msgBulk) );
                reject(null);
            }, msInterval);
        });
    return;
}

export async function mesgDeleterInterval(msg:Message, msInterval:number) {
    if(msInterval <= 0 || msInterval >= Number.MAX_SAFE_INTEGER){
        const err = new Error();
        err.message = `[${err.stack}]\nArgument msInterval is out of range => number[0-maxSafeInt]`;
        throw err;
    }

    if(msg.deletable)
        return new Promise<Message> ( async (resolve, reject) => {
            setTimeout( async () => {
                if(msg.deletable)
                    resolve( await msg.delete() );
                reject(null);
            }, msInterval);
        });
    return;
}

export async function cacheAndGetFollowUpMsg(uncachedReplyTo, interaction: ExtendedInteraction) {
    const cacheReplyTo = await interaction.channel.messages.fetch(uncachedReplyTo.id);
    return await interaction.channel.messages.fetch(cacheReplyTo.id);
}

export async function isBulkable(msgDateMS:number, daysDiffMax:number) {
    const ms13days = 86_400_000 * daysDiffMax;
    return (new Date().getTime() - msgDateMS) <= ms13days;
}