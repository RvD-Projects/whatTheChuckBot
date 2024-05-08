import { CommandInteractionOptionResolver } from "discord.js";
import { ExtendedInteraction } from "../typings/command";
import { AppClient } from "./appClient";

export class CommandContext {

    public interaction:ExtendedInteraction;
    public args:CommandInteractionOptionResolver;
    public client:AppClient;
    public ephemerality:boolean;

    constructor(interaction:ExtendedInteraction,args:CommandInteractionOptionResolver,
            client:AppClient) 
    {
        this.interaction = interaction;
        this.args = args;
        this.client = client;
    }
}