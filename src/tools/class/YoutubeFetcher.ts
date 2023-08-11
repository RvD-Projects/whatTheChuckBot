import { Guild, GuildChannel, GuildChannelManager, TextBasedChannel } from 'discord.js';
import { HttpFetcher } from './HttpFetcher';
import { client } from '../..';
var fs = require('fs');


export class YoutubeFetcher extends HttpFetcher {
    linkParam = "watch?v=";
    searchParam = "@TheKiffness/videos";
    fetchUrl = "https://www.youtube.com/";

    getUrlTextLine(date, url) {
        return date.toLocaleDateString() + " " + date.toLocaleTimeString() + " | " + url
    }

    async asyncWriteToFile(newJsonEntry: any, fileName: string = "./data/youtube/@Kiffness.json") {
        await fs.readFile(fileName, 'utf8', async function readFileCallback(err, data) {
            if (err) {
                console.log(err);
                return;
            }

            let fileObj = JSON.parse(data);
            const entryTable = fileObj.kiffness ?? [];

            const alreadyInFile = entryTable.filter(e => {
                return e.url === newJsonEntry.url;
            });

            if (alreadyInFile?.length) {
                console.log(`@Kiffness Url: ${newJsonEntry.url} was already put in the files at: ${alreadyInFile[0].date}`);
                return;
            }

            fileObj.kiffness = entryTable;
            fileObj.kiffness.push(newJsonEntry);

            const fileText = JSON.stringify(fileObj);
            
            await fs.writeFile(fileName, fileText, async () => { 
                const guild = await client.guilds.fetch("276931890735218689");
                let channel = await guild?.channels.fetch("925583159964352643") as TextBasedChannel;
                const isText = channel?.isTextBased ?? false;
                if (!isText) {
                    return;
                }
        
                channel.send("@WeConneected\n" + newJsonEntry.url);
            });

        });
    }


    async getVideo() {
        try {

            const resp = await this.get(this.fetchUrl + this.searchParam);
            const text = await resp.text();

            const firstSplit = text?.split("watch?v=")[1];
            const endTagPos = firstSplit?.search('",');
            const firstVideoTag = firstSplit?.slice(0, endTagPos);

            const date = new Date();
            const url = this.fetchUrl + this.linkParam + firstVideoTag;

            console.warn();
            const line = this.getUrlTextLine(date, url);
            console.warn("@Kiffness fetched --> ", line);
            console.warn();

            const newEntry = { date: line.split(" | ")[0], url };

            await this.asyncWriteToFile(newEntry);

        } catch (error) {
            console.error(error)
        }

    }

}