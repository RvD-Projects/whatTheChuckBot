//https://github.com/ollama/ollama/blob/main/docs/api.md
import { Message, User } from "discord.js";
import { Event } from "../class/Event";
import { HttpFetcher } from "../tools/class/HttpFetcher";
import { getDefaultConfigs } from "../tools/guildsConfigs";
import { textToLines } from "../tools/myFunctions";
import { Ollama, OllamaModel } from "../ollamaModels";

export type ChatMessage = {
  role: string,
  content?: string,
  [rest: string]: any;
};

export type UserState = {
  model: OllamaModel
  messages: ChatMessage[]
};

const defaultUserState = {
  model: Ollama.DefaultModel,
  messages: []
};

const userState: Map<string, UserState> = new Map();

const prefix: string = "ai:";
const resetPrefix: string = "ai:stop";
const configPrefix: string = "ai:conf";
const listPrefix: string = "ai:list";
const fetcher = new HttpFetcher();

const fetchTimeout = 60000;
fetcher.setOption("timeout", fetchTimeout);

export default new Event("messageCreate", async (message: Message) => {
  if (!message?.author || message.author.bot) return;
  if (message.inGuild() || !message.channel.isDMBased()) return;
  if (!message.content.startsWith(prefix)) return;

  const author = message.author;
  const ollamaConfigs = getDefaultConfigs()?.ollama;
  if (!ollamaConfigs || !ollamaConfigs?.url) {
    author.send('⚠️ System: An error occurred:\n```This feature is not available to you.```"');
    return;
  }

  await message.channel.sendTyping();
  const typingInterval = setInterval(() => message.channel.sendTyping(), 5000);

  !userState.get(author.id) && userState.set(author.id, { ...defaultUserState });
  let state = userState.get(author.id);

  const msgContent = message.content;

  if (msgContent === resetPrefix || msgContent === configPrefix) {
    let sb = "Currently using:\n";

    if (msgContent === resetPrefix) {
      sb = ("✅ Default model and chat history were cleared:\n");
      state.model = defaultUserState.model;
      state.messages = [];
    }
    
    sb += getUserConfigMessage(state);
    clearInterval(typingInterval);

    return await message.author.send(sb);
  }

  if (msgContent === listPrefix) {
    let sb = "Here's the models list:\n" + getModelsListJson().join(",\n");

    const lines = textToLines(sb, 1800);
    for (let i = 0; i < lines.length; i++) {
      author.send(lines[i]);
    }

    return clearInterval(typingInterval);
  }

  try {
    const firstWord = msgContent.split(" ")[0];

    state = userModelSelect(state, author, firstWord);
    const userModel = state.model;

    const responseStart = `\`[${userModel.alias}]:\``;
    const prompt = msgContent.replace(firstWord + " ", "");

    const chatResponse: ChatMessage = await chat(state, userModel.name, prompt, author, ollamaConfigs);
    const lines = textToLines(`${responseStart}${chatResponse.content}`, 1800);

    for (let i = 0; i < lines.length; i++) {
      author.send(lines[i]);
    }

  } catch (error) {
    if (error.type === "request-timeout") {
      error.message = `Request timed out: Waited \`${fetchTimeout}ms\` and no response where given.`;
    }
    await message.author.send("⚠️ System: Query error:\n" + error.message);
  }

  clearInterval(typingInterval);
});

/**
 * Function to chat with an AI model.
 * Will get and update the messages (state) of the user.
 *
 * @param {string} model
 * @param {string} prompt
 * @param {User} author
 * @param {*} configs
 * @return {Promise<ChatMessage>}
 */
async function chat(
  state: UserState,
  model: string,
  prompt: string,
  author: User,
  configs: any
): Promise<ChatMessage> {
  state.messages.push({
    role: "user",
    content: prompt
  });

  const options = { model, stream: false, messages: state.messages };

  const response = await fetcher.post(
    `${configs.url}/chat`,
    JSON.stringify(options)
  );

  const data = await response.json();
  let chatMessage: ChatMessage = data?.message;

  if (!chatMessage?.content) {
    chatMessage = {
      role: "assistant",
      content: "⚠️ System: I'm sorry, I was not able to help you with that."
    };
  }

  state.messages.push(chatMessage);
  userState.set(author.id, state);

  return chatMessage;
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
function userModelSelect(state: UserState, author: User, lookUpString: string = prefix): UserState {
  // No need to update state if its "ai:"  -> continue with current model
  if (lookUpString === prefix) {
    return state;
  }

  const newModel = getModelByPrefixOrId(lookUpString);
  if (!newModel) return state;

  state.model = newModel;
  userState.set(author.id, state);

  return state;
}

/**
 * Will check if the prefix contains a model name or id.
 * Try to get the model with a name or id.
 *
 * @param {string} prefixOrId
 * @return {string} The parsed model name
 */
function getModelByPrefixOrId(prefixOrId: string): OllamaModel {
  const modelAlias = prefixOrId.includes(":") ? prefixOrId.split(":")[1] : null;
  if (!modelAlias.length) {
    return null;
  }

  // Lookup using an id instead of an alias
  const lookUpId = modelAlias?.length ? Number(modelAlias) : null;
  if (!isNaN(lookUpId)) {
    return Ollama.Models.find(m => m.id === lookUpId);
  }

  return Ollama.Models.find(m => m.alias === modelAlias);
}

function getUserConfigMessage(state: UserState): string {
  let sb = "```md";
  sb += `\n- Id: ${state.model.id}`;
  sb += `\n- Alias: ${state.model.alias}`;
  sb += `\n- Name: ${state.model.name}`;
  sb += `\n- Description: ${state.model.description}`;
  sb += `\n- Messages: ${state.messages.length}`;
  sb += "\n```";

  return sb;
}

function getModelsListJson(): string[] {
  const outputs = [];
  for (const model of Ollama.Models) {
    outputs.push(JSON.stringify(model, null, 2));
  }

  return outputs;
}