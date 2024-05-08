import { MessagePayload, InteractionReplyOptions } from "discord.js";
import { CommandContext } from "./commandContext";
import { client } from "..";

export class SubCommand {

    private commandRunFunction:CallableFunction

    constructor(runFunction:CallableFunction, commandContext?:CommandContext){
        this.setRunFunction(runFunction)
    }

    private setRunFunction(runFunction: CallableFunction) {
        this.commandRunFunction = runFunction;
    }

    public async run(commandContext:CommandContext): Promise<FollowUpObj> {

        try{
            if (!this.commandRunFunction){
                throw Error("2-Object commandRunFunction's not implemented use => this.setRunFunction(runFunction: CallableFunction)");
            }
        }
        catch (error) {
            return await new FollowUpObj().fromatOnError(error);
        }
        return this.commandRunFunction(commandContext) as FollowUpObj
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
            content:"This command is not yet fully implemented or an error as occured read the logs! 🤔:x:"
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