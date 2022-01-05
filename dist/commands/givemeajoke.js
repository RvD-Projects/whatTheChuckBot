"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Command_1 = require("../class/Command");
const HttpFetcher_1 = require("../tools/class/HttpFetcher");
const myFunctions_1 = require("../tools/myFunctions");
exports.default = new Command_1.Command({
    name: "givemeajoke",
    description: "Will fetch and post a Chuk Norris joke.",
    run: async ({ interaction }) => {
        const ephemerality = await __1.commandHelper.resolveEphemerality(interaction, 'public');
        interaction.deferReply({ ephemeral: ephemerality });
        const responseObj = await fetchTheChuck();
        if (responseObj?.valid) {
            responseObj.value = (0, myFunctions_1.unescapeEntities)(responseObj.value);
            return interaction.followUp(responseObj.value);
        }
        return interaction.followUp(`No results found...`);
    }
});
async function fetchTheChuck() {
    let result = {};
    const fetch_url = 'https://api.icndb.com/jokes/random/';
    let fetcher = new HttpFetcher_1.HttpFetcher('Post', fetch_url);
    let responseObj = await fetcher.execute();
    result.valid = false;
    if (responseObj?.value?.joke && responseObj?.value?.id) {
        result.id = responseObj.value.id;
        result.value = responseObj.value.joke;
        result.valid = true;
    }
    return result;
}
