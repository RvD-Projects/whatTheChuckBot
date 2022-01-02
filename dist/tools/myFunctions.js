"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deferedMsgDeletion = exports.sleep = exports.unescapeEntities = exports.escapeEntities = void 0;
function escapeEntities(str) {
    const htmlEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    };
    return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);
}
exports.escapeEntities = escapeEntities;
function unescapeEntities(str) {
    const htmlEntities = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'"
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, match => htmlEntities[match]);
}
exports.unescapeEntities = unescapeEntities;
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    return true;
}
exports.sleep = sleep;
async function deferedMsgDeletion(mess, msInterval) {
    // if(msInterval <= 0 || msInterval >= Number.MAX_SAFE_INTEGER){
    //     const err = new Error();
    //     err.message = `[${err.stack}]\nArgument msInterval is out of range => number[0-maxSafeInt]`;
    //     throw err;
    // }
    return new Promise((resolve) => {
        console.warn('called interval');
        var interval = setTimeout(() => {
            resolve(mess.delete());
        }, msInterval);
    });
}
exports.deferedMsgDeletion = deferedMsgDeletion;
