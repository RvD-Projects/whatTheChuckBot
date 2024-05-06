//https://github.com/ollama/ollama/blob/main/docs/api.md
import { Message, User } from "discord.js";
import { Event } from "../class/Event";
import { HttpFetcher } from "../tools/class/HttpFetcher";
import { getDefaultConfigs } from "../tools/guildsConfigs";
import { textToAttachment, textToLines } from "../tools/myFunctions";
import { OllamaAuth } from "../../plugins/Ollama/config/auth";
import { ChatMessage, OllamaPlugin, UserState } from "../../plugins/Ollama/OllamaPlugin";

const prefix: string = "ai:";
const stopPrefix: string = "ai:stop";
const resetPrefix: string = "ai:reset";
const configPrefix: string = "ai:conf";
const listPrefix: string = "ai:list";
const fetcher = new HttpFetcher();

const fetchTimeout = 60000;
fetcher.setOption("timeout", fetchTimeout);

const UsersState: Map<string, UserState> = new Map();

const DefaultUserState = {
  model: OllamaPlugin.DefaultModel,
  messages: []
};

export default new Event("messageCreate", async (message: Message) => {
  if (!message?.author || message.author.bot) return;
  if (message.inGuild() || !message.channel.isDMBased()) return;

  const startRange = message.content.substring(0, 3).toLowerCase();
  if (!startRange.startsWith(prefix)) return;

  const author = message.author;
  if (!OllamaAuth.includes(author.id)) return;

  const ollamaConfigs = getDefaultConfigs()?.ollama;
  if (!ollamaConfigs || !ollamaConfigs?.url) {
    author.send('⚠️ System: An error occurred:\n```This feature is not available to you.```"');
    return;
  }

  await message.channel.sendTyping();
  const typingInterval = setInterval(() => message.channel.sendTyping(), 5000);

  !UsersState.get(author.id) && UsersState.set(author.id, { ...DefaultUserState });
  let state = UsersState.get(author.id);

  const msgContent = message.content;

  if (msgContent === resetPrefix || msgContent === stopPrefix || msgContent === configPrefix) {
    let sb = "Currently using:\n";

    if (msgContent === resetPrefix) {
      sb = ("✅ Chat history and default model was reset:\n");
      state.model = DefaultUserState.model;
      state.messages = [];
    }
    else if (msgContent === stopPrefix) {
      sb = ("✅ Chat history was cleared:\n");
      state.messages = [];
    }

    sb += OllamaPlugin.getUserConfigMessage(state);
    clearInterval(typingInterval);

    return await message.author.send(sb);
  }

  if (msgContent === listPrefix) {
    let sb = "Here's the models list:";

    const listJson = OllamaPlugin.getModelsListJson();
    const attachment = textToAttachment(listJson, "list.json");

    author.send({
      content: sb,
      files: [{
        attachment,
        name: "list.json"
      }]
    })

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
  UsersState.set(author.id, state);

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

  const newModel = OllamaPlugin.getModelByPrefixOrId(lookUpString);
  if (!newModel) return state;

  state.model = newModel;
  UsersState.set(author.id, state);

  return state;
}