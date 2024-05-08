import { GuildBasedChannel, GuildTextBasedChannel, MessageCreateOptions, MessagePayload } from "discord.js"

export class DiscordManager {

    public static async guildSend(channel: GuildBasedChannel, content: string | MessagePayload | MessageCreateOptions) {
        try {
            channel = channel as GuildTextBasedChannel;
            channel.sendTyping();
            await channel.send(content);
        } catch (error) {
            console.error(error);
        }
    }
}