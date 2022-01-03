"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandContext = void 0;
class CommandContext {
    interaction;
    args;
    client;
    ephemerality;
    constructor(interaction, args, client, ephemerality) {
        this.interaction = interaction;
        this.args = args;
        this.client = client;
        this.ephemerality = ephemerality;
    }
}
exports.CommandContext = CommandContext;
