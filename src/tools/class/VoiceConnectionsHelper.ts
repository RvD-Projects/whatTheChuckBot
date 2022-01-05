import { joinVoiceChannel } from "@discordjs/voice";

export class VoiceConnectionsHelper {
    
    async joinVoiceChannel(channel) {
        return await joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }
}

