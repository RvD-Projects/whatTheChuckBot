//https://github.com/ollama/ollama/blob/main/docs/api.md
import { User } from "discord.js";
import { Event } from "../class/Event";
import { HttpFetcher } from "../tools/class/HttpFetcher";
import { getDefaultConfigs } from "../tools/guildsConfigs";
import { textToLines } from "../tools/myFunctions";
import { ollamaModels } from "../ollamaModels";

const timeout = 30000;
const prefix: string = 'ai:';
const resetPrefix: string = 'ai:stop';
const messagesState: Map<string, Array<any>> = new Map;
const aiModels = ollamaModels;


const fetcher = new HttpFetcher;
fetcher.setOption('timeout', timeout);

export default new Event("messageCreate", async (message) => {
  if (!message?.author || message.author.bot) return;
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const ollamaConfigs = getDefaultConfigs()?.ollama;
  if (!ollamaConfigs || !ollamaConfigs?.url) {
    message.channel.send('❌An error occurred:\n```No configs where found```"');
    return;
  }

  try {
    const author = message.author;
    const msgContent = message.content;

    if (msgContent === resetPrefix) {
      messagesState.set(author.id, []);
      return;
    }

    await message.channel.sendTyping();
    const firstWord = msgContent.split(" ")[0];
    const { modelFoundName, inputName } = getModelByPrefix(firstWord);
    if (inputName === null) {

    }


    const responseStart = `\`[${inputName}]:\``;

    const prompt = msgContent.replace(firstWord + " ", '');
    const response = await chat(modelFoundName, prompt, author, ollamaConfigs);

    const lines = textToLines(`${responseStart}${response}`, 1800);
    for (let i = 0; i < lines.length; i++) {
      author.send(lines[i]);
    }


  } catch (error) {
    if (error.type === 'request-timeout') {
      error.message = `Request timed out: Waited \`${timeout}ms\` and no response where given.`;
    }
    await message.author.send('❌Query error:\n' + error.message);
  }
});

/**
 * Function to chat with an AI model.
 * Will get and update the messages (state) of the user.
 * 
 * @param {string} model
 * @param {string} prompt
 * @param {User} author
 * @param {*} configs
 * @return {Promise<string>}
 */
async function chat(model: string, prompt: string, author: User, configs: any): Promise<string> {
  const messages = messagesState.get(author.id) ?? [];
  messages.push({
    role: "user",
    content: prompt
  });

  const options = {
    "model": model ?? "llama2",
    "stream": false,
    "messages": messages,
  };

  const response = await fetcher.post(`${configs.url}/chat`, JSON.stringify(options));
  const data = await response.json();
  const message = data?.message;
  const text = message?.content;

  if (!text) {
    return "(void)";
  }

  messages.push(message);
  messagesState.set(author.id, messages);
  return text;
}

/**
 * Will check if the prefix contains a model name.
 *
 * @param {string} prefix
 * @return {string} The parsed model name
 */
function getModelByPrefix(prefix: string): { modelFoundName: string, inputName: string } {
  if (!prefix.includes(':')) {
    return { modelFoundName: "llama2", inputName: null };
  }

  const inputName = prefix.split(':')[1]?.split(" ")[0];
  const modelFoundName = aiModels[inputName]?.name ?? "llama2";

  return { modelFoundName, inputName };
}
