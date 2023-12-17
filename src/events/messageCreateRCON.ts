import { Event } from "../class/Event";
import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';
import { getGuildConfigsById } from "../tools/guildsConfigs";
import { textToLines, toSafeJsonString } from "../tools/myFunctions";
import { env } from "process";


// https://www.ghostcap.com/cs2-commands/
// https://www.npmjs.com/package/@fabricio-191/valve-server-query
export default new Event("messageCreate", async (message) => {
  if (!message?.author || message.author.bot) return;

  try {
    const prompt = message.content.toString();
    if (prompt.length >= 128) {
      return;
    }

    const configs = getGuildConfigsById(message.guildId)?.cs2RconChannels;
    if (!configs || !configs[message.channelId]) {
      return;
    }

    const serverConf = configs[message.channelId];
    if (env.environment === 'dev' && !serverConf.dev) {
      return;
    }

    const connectionsParams = {
      ip: serverConf.ip,
      port: serverConf.port,
      timeout: 30000,
      password: null
    };

    let rcon = null;
    let server = null;
    let consoleOut = "Silence is golden.";

    switch (prompt) {
      case 'infos':
        server = await Server(connectionsParams);
        const infos = await server.getInfo();
        consoleOut = toSafeJsonString(infos);
        server.disconnect();
        break;

      case 'players':
        server = await Server(connectionsParams);
        const players = await server.getPlayers();
        consoleOut = toSafeJsonString(players);
        server.disconnect();
        break;

      case 'rules':
        server = await Server(connectionsParams);
        const rules = await server.getRules();
        consoleOut = toSafeJsonString(rules);
        server.disconnect();
        break;

      default:
        // TODO: blacklist some prompts keywords
        connectionsParams.password = serverConf.password;
        const rcon = await RCON(connectionsParams);
        consoleOut = await rcon.exec(prompt);
        rcon.destroy();
        break;
    }

    const outputs = textToLines(consoleOut, 1800);
    message.channel.send('✅ Response:\n```' + outputs[0] + "```");

    for (let i = 1; i < outputs.length; i++) {
      const prefix = i < outputs.length - 1
        ? `- more \`(${i+1}/${outputs.length})\`:\n`
        : `- last \`(${i+1}/${outputs.length})\`:\n`;

        message.channel.send(prefix + '```' + outputs[i] + "```");
    }

  } catch (error) {
    console.error(error);
    message.channel.send('❌ An error occurred:\n```' + error.message + "```");
  }

});
