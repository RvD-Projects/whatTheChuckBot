import { CommandInteractionOptionResolver } from "discord.js";
import { ExtendedInteraction } from "../typings/Command";
import { ExtendedClient } from "./Client";

export class CommandContext {

    public interaction:ExtendedInteraction;
    public args:CommandInteractionOptionResolver;
    public client:ExtendedClient;
    public ephemerality:boolean;

    constructor(interaction:ExtendedInteraction,args:CommandInteractionOptionResolver,
            client:ExtendedClient) 
    {
        this.interaction = interaction;
        this.args = args;
        this.client = client;
    }
}