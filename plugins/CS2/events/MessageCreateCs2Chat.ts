import { Event } from "../../../src/class/Event";
import { RCON } from '@fabricio-191/valve-server-query';
import { getGuildConfigsById } from "../../../src/configs/GuildsConfigs";
import { env } from "process";


export default new Event("messageCreate", async (message) => {
  if (!message?.author || message.author.bot) return;

  try {
    const configs = getGuildConfigsById(message.guildId)?.cs2?.chatChannels;
    if (!configs || !configs[message.channelId]) {
      return;
    }

    const serverConf = configs[message.channelId];
    if (env.environment === 'dev' && !serverConf.dev) {
      return;
    }

    const prompt = message.content.toString();
    if (prompt.length >= 256) {
      message.author.send("❌ An error occurred: Chat messages must be 256 characters long max.");
      return;
    }

    const connectionsParams = {
      ip: serverConf.ip,
      port: serverConf.port,
      timeout: 30000,
      password: null
    };

    connectionsParams.password = serverConf.password;
    const rcon = await RCON(connectionsParams);
    await rcon.exec(`say [${message.author.displayName}]: "${prompt.toString()}";`);
    rcon.destroy();

  } catch (error) {
    console.error(error);
    message.channel.send('❌ An error occurred:\n```' + error.message + "```");
  }

});
