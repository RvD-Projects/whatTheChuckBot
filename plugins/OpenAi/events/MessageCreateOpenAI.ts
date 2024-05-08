import { openAI } from "../../../src";
import { Event } from "../../../src/class/event";

const conversationState: Map<string, string> = new Map()
const prefix: string = '!oai';
const resetPrefix: string = '!oai!';

export default new Event("messageCreate", async (message) => {
  if (!message?.author || message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  try {
    const userId = message.author.id;
    const conversationContext = conversationState.get(userId) ?? '';

    if (message.content === resetPrefix) {
      conversationState.set(userId, '');
      return;
    }

    const prompt = message.content.replace(prefix, '');
    const response = await generateText(prompt, conversationContext);
    conversationState.set(userId, conversationContext + response + ' ');
    message.channel.send(`\`\`\`${response}\`\`\``);

  } catch (error) {
    console.error(error);
    message.channel.send('An error occurred during the query:\n```' + error.message + "```");
  }

});

// Function to interact with OpenAI and generate text
async function generateText(prompt: string, conversationContext: string) {
  const content = new String(conversationContext).concat(prompt);

  const response = await openAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: 'user', content }]
  });

  return response.choices[0].message;
}
