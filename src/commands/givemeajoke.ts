import { commandHelper } from "..";
import { Command } from "../class/Command";
import { HttpFetcher } from "../tools/class/HttpFetcher";
import { unescapeEntities } from "../tools/myFunctions";

export default new Command({
    name: "givemeajoke",
    description: "Will fetch and post a Chuk Norris joke.",
    run: async ({ interaction }) => {

        const ephemerality = await commandHelper.resolveEphemerality(interaction, 'public');
        await interaction.deferReply({ephemeral: ephemerality})
        const responseObj = await fetchTheChuck();

        if (responseObj?.valid) {
            responseObj.value = unescapeEntities(responseObj.value)
            return interaction.followUp(responseObj.value);
        }
        else {
            return interaction.followUp(`No results found...`);
        }
    }
});

async function fetchTheChuck(): Promise<any> {

    let result:any = {};
    const fetch_url = 'https://api.icndb.com/jokes/random/';
    
    let fetcher = new HttpFetcher('Post',fetch_url);
    let responseObj = await fetcher.execute();
    

    result.valid = false;
    if (responseObj?.value?.joke && responseObj?.value?.id) {
        result.id = responseObj.value.id;
        result.value = responseObj.value.joke;
        result.valid = true;
    }
    return result;
}