"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowUpResponse = exports.FollowUpObj = exports.SubCommand = void 0;
const __1 = require("..");
class SubCommand {
    commandContext;
    commandRunFunction;
    async setCommandContext(commandContext) {
        this.commandContext = commandContext;
    }
    async setRunFunction(runFunction) {
        this.commandRunFunction = runFunction;
    }
    async run() {
        try {
            if (!this.commandContext) {
                throw Error("1-Object Command context's not implemented use => this.setCommandContext(commandContext: CommandContext)");
            }
            if (!this.commandRunFunction) {
                throw Error("2-Object commandRunFunction's not implemented use => this.setRunFunction(runFunction: CallableFunction)");
            }
        }
        catch (error) {
            return await new FollowUpObj().fromatOnError(error);
        }
        return this.commandRunFunction(this.commandContext);
    }
}
exports.SubCommand = SubCommand;
class FollowUpObj {
    callbackArgs;
    callback;
    reponse = new FollowUpResponse();
    reply;
    async fromatOnError(e) {
        this.reponse.error = e;
        this.reponse.ok = false;
        this.reply = {
            content: "This command is not yet fully implemented or an error as occured read the logs! 🤔❌"
        };
        __1.client.emit('warn', e.message);
        return this;
    }
}
exports.FollowUpObj = FollowUpObj;
class FollowUpResponse {
    ok = true;
    body;
    error;
    header;
}
exports.FollowUpResponse = FollowUpResponse;
