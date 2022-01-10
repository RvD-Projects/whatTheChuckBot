import { joinVoiceChannel } from "@discordjs/voice";

export class VoiceConnectionsHelper {

    //TODO: connection.destroy();  aftr 120sec
    async joinVoiceChannel(channel) {
        return await joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }
}

