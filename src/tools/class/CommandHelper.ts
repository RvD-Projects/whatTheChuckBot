import glob from "glob";
import { promisify } from "util";
import { ExtendedInteraction } from "../../typings/Command";
const globPromise = promisify(glob);

export default class CommandHelper {
    
    private async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    public async resolveEphemerality(interaction:ExtendedInteraction, fallback:string): Promise<boolean> {
        
        // Behave as ephemeral by default when 'private'.
        if( fallback === 'private' ) {
            let isPrivate = interaction.options.getBoolean('private');
            if(isPrivate !== undefined && isPrivate !== null) return isPrivate;
            return await true;
        }
        else if(fallback === 'public') {
            return await interaction.options.getBoolean('public') ? true : false;
        }
        return await false;
    }

    public async importSubCommandFile(interaction:ExtendedInteraction) {
        
        let commandName = interaction.commandName;
        let subCommandName = interaction.options.getSubcommand(); 
        let groudName = interaction.options.getSubcommandGroup(false); //[optional]

        let filePath:string = `${__dirname}/../../subCommands/${commandName}`;

        if(groudName) { filePath += `/${groudName}`;}
        filePath += `/${subCommandName}`;

        const subCommandFile = await globPromise(
            `${filePath}{.ts,.js}`
        );
        
        if(subCommandFile.length === 1)
            return this.importFile(filePath)
        return;
    }
}

