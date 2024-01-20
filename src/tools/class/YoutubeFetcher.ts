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

    getUrlTextLine(date, url) {
        return date.toLocaleDateString() + " " + date.toLocaleTimeString() + " | " + url
    }

    async checkFileWriteAndPost(newJsonEntry: any, filePath: string, server: any, channel: any, ytName: string) {
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

            fileObj.scraps.reverse().slice(0, 2).reverse();
            fileObj.scraps.push(newJsonEntry);

            const fileText = JSON.stringify(fileObj);
            await fs.writeFile(filePath, fileText, async () => {
                const guild = await client.guilds.fetch(server.id);
                let txtChannel = await guild?.channels.fetch(channel.id) as TextBasedChannel;
                const isText = txtChannel?.isTextBased ?? false;
                if (!isText) {
                    return;
                }

                let message = `*Hey you <@&${channel.mentionRoleId}>*\n`;
                message += `**${ytName}** released a new video recently! Feel free to watch it on YT:\n`;
                message += newJsonEntry.url;

                txtChannel.send(message);
            });
        });
    }


    async getVideos() {
        subscriptions.servers?.forEach(server => {
            if (server.devOnly && env.environment !== "prod") {
                return;
            }

            server.channels?.forEach(async channel => {
                channel.subs?.forEach(async sub => {
                    try {
                        const resp = await this.get(sub.url);
                        const text = await resp.text();
                        const date = new Date();

                        const firstSplit = text?.split(this.linkParam)[1];
                        const endTagPos = firstSplit?.search('",');
                        const firstVideoTag = firstSplit?.slice(0, endTagPos);
                        const url = this.baseUrl + this.linkParam + firstVideoTag;
                        const line = this.getUrlTextLine(date, url);

                        const newEntry = { date: line.split(" | ")[0], url };
                        const filePath = `./data/youtube/${server.name}/${sub.name}.json`;
                        await this.checkFileWriteAndPost(newEntry, filePath, server, channel, sub.name);

                    } catch (error) {
                        console.error(error);
                    }
                });

            });

        })
    }
}