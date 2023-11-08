import { TextBasedChannel } from 'discord.js';
import { HttpFetcher } from './HttpFetcher';
import { client } from '../..';
import subscriptions from '../../subscriptions';
import { env } from 'node:process';
var fs = require('fs');
var fsExtra = require('fs-extra');


export class YoutubeFetcher extends HttpFetcher {
    linkParam = "watch?v=";
    baseUrl = "https://youtube.com/"
    discordChannelId = "984305093010673684";

    getUrlTextLine(date, url) {
        return date.toLocaleDateString() + " " + date.toLocaleTimeString() + " | " + url
    }

    async checkFileWriteAndPost(newJsonEntry: any, filePath: string, channelId: string, roleId: string, ytName: string) {
        fsExtra.ensureFileSync(filePath, err => {
            console.log(err);
        });

        await fs.readFile(filePath, 'utf8', async function readFileCallback(err, data) {
            if (err) {
                console.log(err);
                return;
            }

            let fileObj: any = {};
            try {
                fileObj = JSON.parse(data) ?? {};
            } catch (error) {
                fileObj = {};
            }

            const entryTable = fileObj.scraps ?? [];
            const alreadyInFile = entryTable.filter(e => {
                return e.url === newJsonEntry.url;
            });

            if (alreadyInFile?.length) {
                console.log(`Url: ${newJsonEntry.url} was already put in the files at: ${alreadyInFile[0].date}`);
                return;
            }

            if (newJsonEntry.url.includes(" ")) {
                console.log(`Url: ${newJsonEntry.url} was malformated...`);
                return;
            }

            fileObj.scraps = entryTable;
            fileObj.scraps.push(newJsonEntry);

            const fileText = JSON.stringify(fileObj);
            await fs.writeFile(filePath, fileText, async () => {
                const guild = await client.guilds.fetch("984305093010673684");
                let channel = await guild?.channels.fetch(channelId) as TextBasedChannel;
                const isText = channel?.isTextBased ?? false;
                if (!isText) {
                    return;
                }

                let message = `*Hey you <@&${roleId}>*\n`;
                message += `**${ytName}** released a new video recently! Feel free to watch it on YT:\n`;
                message += newJsonEntry.url;

                channel.send(message);
            });
        });
    }


    async getVideos() {
        if (env.environment !== "prod") {
            return;
        }
        
        subscriptions.channels.forEach(async channel => {
            channel.subs.forEach(async sub => {
                try {
                    const resp = await this.get(sub.url);
                    const text = await resp.text();
                    const date = new Date();

                    const firstSplit = text?.split(this.linkParam)[1];
                    const endTagPos = firstSplit?.search('",');
                    const firstVideoTag = firstSplit?.slice(0, endTagPos);
                    const url = this.baseUrl + this.linkParam + firstVideoTag;
                    const line = this.getUrlTextLine(date, url);

                    console.warn(sub.name + " got scrapped --> ", line);

                    const filePath = `./data/youtube/${sub.name}.json`;
                    const newEntry = { date: line.split(" | ")[0], url };
                    await this.checkFileWriteAndPost(newEntry, filePath, channel.id, channel.mentionRoleId, sub.name);

                } catch (error) {
                    console.error(error);
                }
            });

        });
    }

}