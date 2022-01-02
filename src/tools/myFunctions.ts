import { Message } from "discord.js";

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