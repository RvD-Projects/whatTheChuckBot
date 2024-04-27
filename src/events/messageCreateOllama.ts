//https://github.com/ollama/ollama/blob/main/docs/api.md
import { Message, User } from "discord.js";
import { Event } from "../class/Event";
import { HttpFetcher } from "../tools/class/HttpFetcher";
import { getDefaultConfigs } from "../tools/guildsConfigs";
import { textToLines } from "../tools/myFunctions";
import { defaultModel, defaultModelAlias, ollamaModels, UserModelState } from "../ollamaModels";

const prefix: string = "ai:";
const resetPrefix: string = "ai:stop";
const configPrefix: string = "ai:conf";
const listPrefix: string = "ai:list";
const messagesState: Map<string, Array<any>> = new Map();
const modelState: Map<string, UserModelState> = new Map();
const aiModels = ollamaModels;
const fetcher = new HttpFetcher();

const timeout = 60000;
fetcher.setOption("timeout", timeout);

export default new Event("messageCreate", async (message: Message) => {
  if (!message?.author || message.author.bot) return;
  if (message.inGuild() || !message.channel.isDMBased()) return;
  if (!message.content.startsWith(prefix)) return;

  await message.channel.sendTyping();

  const ollamaConfigs = getDefaultConfigs()?.ollama;
  if (!ollamaConfigs || !ollamaConfigs?.url) {
    message.channel.send('❌An error occurred:\n```No configs where found```"');
    return;
  }

  const author = message.author;
  const msgContent = message.content;

  if (msgContent === listPrefix) {
    let sb = "Here's the models list:\n" + getModelsListJson().join("\n");

    const lines = textToLines(sb, 1800);
    for (let i = 0; i < lines.length; i++) {
      author.send(lines[i]);
    }

    return;
  }

  if (msgContent === resetPrefix || msgContent === configPrefix) {
    let sb = "Currently using:\n";

    if (msgContent === resetPrefix) {
      messagesState.set(author.id, []);
      modelState.set(author.id, null);

      sb = ("✅ Default model and chat history were cleared:\n");
    }

    sb += getUserConfigMessage(author);
    await message.author.send(sb);
    return;
  }

  try {
    const firstWord = msgContent.split(" ")[0];

    const userState = userModelSelect(author, firstWord);
    const responseStart = `\`[${userState.modelAlias}]:\``;
    const prompt = msgContent.replace(firstWord + " ", "");

    const response = await chat(userState.modelName, prompt, author, ollamaConfigs);

    const lines = textToLines(`${responseStart}${response}`, 1800);
    for (let i = 0; i < lines.length; i++) {
      author.send(lines[i]);
    }

  } catch (error) {
    if (error.type === "request-timeout") {
      error.message = `Request timed out: Waited \`${timeout}ms\` and no response where given.`;
    }
    await message.author.send("❌Query error:\n" + error.message);
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
async function chat(
  model: string,
  prompt: string,
  author: User,
  configs: any
): Promise<string> {
  const messages = messagesState.get(author.id) ?? [];
  messages.push({
    role: "user",
    content: prompt,
  });

  const options = { model, stream: false, messages: messages, };

  const response = await fetcher.post(
    `${configs.url}/chat`,
    JSON.stringify(options)
  );

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
 * Retrieves the user model state based on the provided user and lookup string.
 * If the user model state does not exist, it sets the default model state.
 * If the lookup string is searchable and a model is found, it updates the user model state.
 * 
 * @param author - The user for whom to retrieve the model state.
 * @param lookUpString - The string used to lookup the model state.
 * @returns The user currently selected model.
 */
function userModelSelect(author: User, lookUpString: string = prefix): UserModelState {
  const userState = modelState.get(author.id) ?? {
    modelAlias: defaultModelAlias,
    modelName: defaultModel.name
  };

  // Insure users always has defaults value
  modelState.set(author.id, userState);

  if (lookUpString !== prefix) {
    const newModel = getModelByPrefixOrId(lookUpString);
    newModel && modelState.set(author.id, newModel);
  }

  return modelState.get(author.id);
}

/**
 * Will check if the prefix contains a model name or id.
 * Try to get the model with a name or id.
 *
 * @param {string} prefixOrId
 * @return {string} The parsed model name
 */
function getModelByPrefixOrId(prefixOrId: string): UserModelState {

  const modelAlias = prefixOrId.includes(":") ? prefixOrId.split(":")[1] : null;
  if (!modelAlias.length) {
    return null;
  }

  // Lookup using an id instead of an alias
  const lookUpId = modelAlias?.length ? Number(modelAlias) : null;
  if (!isNaN(lookUpId)) {
    const found = getModelById(lookUpId);
    if (!found) {
      return null;
    }

    return { modelName: found.model.name, modelAlias: found.alias };
  }

  const found = aiModels[modelAlias];
  if (!found) {
    return null;
  }

  return { modelName: found.name, modelAlias };
}

function getModelById(id: number) {
  for (const alias in aiModels) {
    const model = aiModels[alias];

    if (model.id !== id) {
      continue;
    }

    return { alias, model };
  }

  return null;
}


function getUserConfigMessage(author: User): string {
  const messageState = messagesState.get(author.id) ?? [];
  const userState = userModelSelect(author);

  let sb = "```md";
  sb += `\n- Model: ${userState.modelAlias}`;
  sb += `\n- Version: ${userState.modelName}`;
  sb += `\n- Messages: ${messageState.length}`;
  sb += "\n```";

  return sb;
}

function getModelsListJson(): string[] {
  const outputs = [];

  for (const alias in aiModels) {
    const model = aiModels[alias];
    const dto = {
      id: model.id,
      name: model.name,
      description: model.description,
    };

    outputs.push(JSON.stringify(dto, null , 2));
  }

  return outputs;
}