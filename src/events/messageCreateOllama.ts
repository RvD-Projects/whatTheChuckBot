import { Event } from "../class/Event";
import { HttpFetcher } from "../tools/class/HttpFetcher";
import { getDefaultConfigs } from "../tools/guildsConfigs";

const fetcher = new HttpFetcher;
const contextStates: Map<string, object> = new Map()
const prefix: string = '!okai';
const resetPrefix: string = '!stopai';

const defaultGenBody = {
  model: "llama2",
  format: "json",
  context: [],
  stream: false,
  prompt: null,
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
    const context = contextStates.get(userId) ?? [];

    if (message.content === resetPrefix) {
      contextStates.set(userId, []);
      return;
    }

    const prompt = message.content.replace(prefix, '');
    const response = await generate(prompt, context, userId, ollamaConfigs);

    message.channel.send(`\`\`\`${response}\`\`\``);

  } catch (error) {
    console.error(error);
    message.channel.send('❌An query error occurred:\n```' + error.message + "```");
  }
});

// Function to interact with OpenAI and generate text
async function generate(prompt: string, context: any, userId: string, configs: any): Promise<string> {
  const options = { ...defaultGenBody };
  options.prompt = prompt;
  options.context = context;

  const responseObj = await fetcher.post(`${configs.url}/generate`, JSON.stringify(options));
  contextStates.set(userId, responseObj.context ?? []);

  return responseObj.response;
}
