import glob from "glob";
import { promisify } from "util";
import { SubCommand } from "../../class/Subcommand";
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

    public async importSubCommandFile(interaction:ExtendedInteraction):Promise<SubCommand> {

        console.warn("In command helper");
        
        let commandName = interaction.commandName;
        let subCommandName = interaction.options.getSubcommand(); 
        let groudName = interaction.options.getSubcommandGroup(false); //[optional]

        let filePath:string = `${__dirname}/../../subcommands/${commandName}`;

        if(groudName) { filePath += `/${groudName}`;}
        filePath += `/${subCommandName}`;

        const subCommandFile = await globPromise(
            `${filePath}{.ts,.js}`
        );

        console.warn("Trying to import: " + filePath);
        
        subCommandFile.forEach( el => {
            console.warn("Files: " + el);
        });
        
        if(subCommandFile.length === 1) {
            console.warn("Found a subCommand");
            return await this.importFile(filePath)
        }   
        return;
    }
}

