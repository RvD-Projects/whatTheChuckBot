import { MessageCreateOptions, MessagePayload, TextBasedChannel } from "discord.js"

export class DiscordManager {

    public static async send(channel: TextBasedChannel, content: string | MessagePayload | MessageCreateOptions) {
        channel.sendTyping();
        await channel.send(content)
    }
}