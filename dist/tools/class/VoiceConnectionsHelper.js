"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceConnectionsHelper = void 0;
const voice_1 = require("@discordjs/voice");
class VoiceConnectionsHelper {
    async joinVoiceChannel(channel) {
        return await (0, voice_1.joinVoiceChannel)({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
    }
}
exports.VoiceConnectionsHelper = VoiceConnectionsHelper;
