import { GuildTextBasedChannel } from 'discord.js';
import { env } from 'node:process';

import { client } from '../../../src';
import { HttpFetcher } from '../../../src/class/httpFetcher';
import { tryParseJson } from '../../../src/helpers/helpers';
import subscriptions from '../configs/subscriptions';

var fs = require('fs');
var fsExtra = require('fs-extra');

export type YtScrap = { url: string, date: string };

export class YoutubeFetcher extends HttpFetcher {
    linkParam = "watch?v=";
    baseUrl = "https://youtube.com/"

    getUrlTextLine(date: Date, url: string) {
        return date.toLocaleDateString() + " " + date.toLocaleTimeString() + " | " + url
    }

    static async writeFileCallBack(guildChannel: GuildTextBasedChannel, params: any) {
        const {
            newJsonEntry,
            subscription,
            channel
        } = params;

        try {
            let message = `*Hey you <@&${channel.mentionRoleId}>*\n`;
            message += `**${subscription.name}** released a new video recently! Feel free to watch it on YT:\n`;
            message += newJsonEntry.url;

            guildChannel.send(message);
        } catch (error) {
            console.error(error);
        }
    }

    static async readFileCallback(err: any, data: string, guildChannel: GuildTextBasedChannel, params: any) {
        if (err) { console.log(err); return; }

        const {
            filePath,
            newJsonEntry,
        } = params;

        try {
            const fileObj: { scraps: YtScrap[] } = tryParseJson(data) ?? {};
            fileObj.scraps = fileObj.scraps ?? [];

            // alreadyInFile
            if (fileObj.scraps.some(entry => entry.url === newJsonEntry.url)) {
                return;
            }

            async function writeFileCallBack(err: any, data: string) {
                await YoutubeFetcher.writeFileCallBack(guildChannel, params);
            }

            fileObj.scraps.reverse().slice(0, 2).reverse();
            fileObj.scraps.push(newJsonEntry);

            const fileText = JSON.stringify(fileObj);
            await fs.writeFile(filePath, fileText, writeFileCallBack);

        } catch (error) {
            console.error("Error: readFileCallback()", error);
        }
    }

    async checkFileWriteAndPost(params: any, guildChannel: GuildTextBasedChannel) {
        const {
            filePath,
            newJsonEntry,
        } = params;

        fsExtra.ensureFileSync(filePath, (err: any) => {
            console.log(err);
        });

        async function readCallback(err: any, data: string) {
            await YoutubeFetcher.readFileCallback(err, data, guildChannel, params);
        }

        await fs.readFile(filePath, 'utf8', readCallback);
    }

    async getVideos() {
        for (let i = 0; i < subscriptions?.servers.length; i++) {
            const server = subscriptions?.servers[i];

            let guild = null;
            try {
                guild = await client.guilds.fetch(server.id);
                if (!guild || server.devOnly && env.environment === "prod") {
                    continue;
                }
            } catch { continue; }

            server.channels?.forEach(async channel => {
                let guildChannel = null;
                try {
                    guildChannel = await guild?.channels.fetch(channel.id) as GuildTextBasedChannel;
                    if (!guildChannel?.isTextBased?.()) {
                        return;
                    }
                } catch { return; }

                channel.subs?.forEach(async subscription => {
                    try {
                        const resp = await this.get(subscription.url);
                        const text = await resp.text();
                        const date = new Date();

                        const firstSplit = text?.split(this.linkParam)[1];
                        const endTagPos = firstSplit?.search('",');
                        const firstVideoTag = firstSplit?.slice(0, endTagPos);
                        const url = this.baseUrl + this.linkParam + firstVideoTag;
                        const line = this.getUrlTextLine(date, url);

                        const newJsonEntry = { date: line.split(" | ")[0], url };
                        const filePath = `./data/youtube/${server.name}/${subscription.name}.json`;

                        if (newJsonEntry.url.includes(" ")) {
                            console.log(`Url: ${newJsonEntry.url} was malformed...`);
                            return;
                        }

                        await this.checkFileWriteAndPost({
                            filePath,
                            newJsonEntry,
                            subscription,
                            channel
                        }, guildChannel);

                    } catch (error) {
                        console.error(error);
                    }
                });

            });
        }
    }
}