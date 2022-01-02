import { MessagePayload, InteractionReplyOptions } from "discord.js";
import { SubCommandInterface } from "../Intefaces/Subcommand";
import { CommandContext } from "./CommandContext";
import { client } from "..";

export class SubCommand implements SubCommandInterface {

    public commandContext:CommandContext
    private commandRunFunction:CallableFunction

    

    public async setCommandContext(commandContext: CommandContext) {
        this.commandContext = commandContext
    }
    async setRunFunction(runFunction: CallableFunction) {
        this.commandRunFunction = runFunction;
    }

    public async run(): Promise<FollowUpObj> {

        try{
            if (!this.commandContext){
                throw Error("1-Object Command context's not implemented use => this.setCommandContext(commandContext: CommandContext)");
            }
            if (!this.commandRunFunction){
                throw Error("2-Object commandRunFunction's not implemented use => this.setRunFunction(runFunction: CallableFunction)");
            }
        }
        catch (error) {
            return await new FollowUpObj().fromatOnError(error);
        }
        return this.commandRunFunction(this.commandContext) as FollowUpObj
    }
}

export class FollowUpObj {
    public callbackArgs:Object;
    public callback:CallableFunction;
    public reponse:FollowUpResponse = new FollowUpResponse();
    public reply:string | MessagePayload | InteractionReplyOptions;

    public async fromatOnError(e:Error) {
        this.reponse.error = e;
        this.reponse.ok = false;
        this.reply = {
            content:"This command is not yet fully implemented or an error as occured read the logs! 🤔❌"
        };
        client.emit('warn', e.message);
        return this;
    }
}

export class FollowUpResponse {
    public ok:boolean = true;
    public body:Object
    public error:Object
    public header:Object
}