import { CommandContext } from "../structures/CommandContext";


export interface SubCommandInterface {
    setCommandContext(commandContext:CommandContext);
    setRunFunction(commandRunFunction:CallableFunction, commandContext?: CommandContext);
}
