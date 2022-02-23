import { AudioPlayer, joinVoiceChannel, PlayerSubscription, VoiceConnection } from "@discordjs/voice";
import channel from "../../commands/channel";

export class VoiceConnectionsHelper {

    //TODO: connection.destroy();  aftr 120sec
    async joinVoiceChannel(channel): Promise<VoiceConnection> {
        return await joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }

    async subscribeConnection(connection:VoiceConnection): Promise<PlayerSubscription>{
        return await connection.subscribe(new AudioPlayer())
    }
}

