import { Event } from "../class/Event";
import { HttpFetcher } from "../tools/class/HttpFetcher";
import { getDefaultConfigs } from "../tools/guildsConfigs";

const prefix: string = 'ai:';
const resetPrefix: string = 'ai:stop';

const fetcher = new HttpFetcher;
const messagesState: Map<string, Array<any>> = new Map;

const chatBody = {
  model: "llama2",
  format: "json",
  stream: false,
  messages: [],
};

export default new Event("messageCreate", async (message) => {
  if (!message?.author || message.author.bot) return;
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const ollamaConfigs = getDefaultConfigs()?.ollama;
  if (!ollamaConfigs || !ollamaConfigs?.url) {
    message.channel.send('❌An error occurred:\n```No configs where found```"');
    return;
  }

  try {
    const userId = message.author.id;
    const msgContent = message.content;
    const messages = messagesState.get(userId) ?? [];

    if (msgContent === resetPrefix) {
      messagesState.set(userId, []);
      return;
    }

    const firstWord = msgContent.split(" ")[0];
    const model = getModelByPrefix(firstWord);

    const prompt = msgContent.replace(prefix, '');
    messages.push({
      role: "user",
      content: prompt,
      images: null
    });

    const options = { ...chatBody, messages, model };
    const response = await generate(options, userId, ollamaConfigs);

    message.channel.send(`\`\`\`${response}\`\`\``);

  } catch (error) {
    console.error(error);
    message.channel.send('❌An query error occurred:\n```' + error.message + "```");
  }
});

/**
 * Function to chat with an AI model.
 * Will update the messagesState of the user.
 * 
 * @param {*} options
 * @param {string} userId
 * @param {*} configs
 * @return {*}  {Promise<string>}
 */
async function generate(options: any, userId: string, configs: any): Promise<string> {
  const response = await fetcher.post(`${configs.url}/chat`, JSON.stringify(options));

  messagesState.set(userId, response.message ?? {
    "role": "assistant",
    "content": "",
    "image": null
  });

  return response?.message[0]?.content ?? "(void)";
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

  //TODO: Use a shortname associative listing

  return prefix.split('-')[1] ?? "llama2";
}
