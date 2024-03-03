//https://github.com/ollama/ollama/blob/main/docs/api.md
import { User } from "discord.js";
import { Event } from "../class/Event";
import { HttpFetcher } from "../tools/class/HttpFetcher";
import { getDefaultConfigs } from "../tools/guildsConfigs";

const timeout = 30000;
const prefix: string = 'ai';
const resetPrefix: string = 'ai:stop';
const messagesState: Map<string, Array<any>> = new Map;

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

    const firstWord = msgContent.split(" ")[0];
    const model = getModelByPrefix(firstWord);
    const responseStart = `[\`\`\`${model}\`\`\`]:\n`;

    const prompt = msgContent.replace(firstWord + " ", '');
    const response = await chat(model, prompt, author, ollamaConfigs);

    message.author.send(`${responseStart}${response}`);

  } catch (error) {
    if (error.type === 'request-timeout') {
      error.message = `Request timed out: Waited \`${timeout}ms\` and no response where given.`;
    }
    message.author.send('❌Query error:\n' + error.message);
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
    content: prompt,
    images: null
  });

  const options = {
    model: model ?? "llama2",
    format: "json",
    stream: false,
    messages,
  };

  const response = await fetcher.post(`${configs.url}/chat`, JSON.stringify(options));
  const data = await response.json();
  const message = data?.message;

  if (!message) {
    return "(void)";
  }

  messages.push(message);
  messagesState.set(author.id, messages);
  return message.content;
}

/**
 * Will check if the prefix contains a model name.
 *
 * @param {string} prefix
 * @return {string} The parsed model name
 */
function getModelByPrefix(prefix: string): string {
  if (!prefix.includes(':')) {
    return "llama2";
  }

  //TODO: Use a shortname associative listing (json)

  return prefix.split('-')[1] ?? "llama2";
}
