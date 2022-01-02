import { CommandInteractionOptionResolver } from "discord.js";
import { ExtendedInteraction } from "../typings/Command";
import { ExtendedClient } from "./Client";

export class CommandContext {

    public interaction:ExtendedInteraction;
    public args:CommandInteractionOptionResolver;
    public client:ExtendedClient;

    constructor(interaction, args, client) {
        this.interaction = interaction;
        this.args = args;
        this.client = client;
    }
}