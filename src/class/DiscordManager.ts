import { GuildBasedChannel, GuildTextBasedChannel, MessageCreateOptions, MessagePayload, PartialTextBasedChannel, TextBasedChannel } from "discord.js"

export class DiscordManager {

    public static async guildSend(channel: GuildBasedChannel, content: string | MessagePayload | MessageCreateOptions) {
        channel = channel as GuildTextBasedChannel;
        channel.sendTyping();
        await channel.send(content)
    }
}