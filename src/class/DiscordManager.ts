import { GuildBasedChannel, MessageCreateOptions, MessagePayload, PartialTextBasedChannel, TextBasedChannel } from "discord.js"

export class DiscordManager {

    public static async send(channel, content: string | MessagePayload | MessageCreateOptions) {
        channel.sendTyping();
        await channel.send(content)
    }
}