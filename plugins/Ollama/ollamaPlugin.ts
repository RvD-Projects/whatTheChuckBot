export type AIModel = {
  id: number;
  alias: string;
  name: string;
  description: string;
};

export type ChatMessage = {
  role: string;
  content?: string;
  [rest: string]: any;
};

export type UserState = {
  model: AIModel;
  messages: ChatMessage[];
};

export class OllamaPlugin {
  static Models: AIModel[] = [
    {
      id: 1,
      name: "dnd:latest",
      alias: "dnd",
      description: "Dungeons & Dragons assistant for game mastering.",
    },
    {
      id: 2,
      name: "dolphin-llama3:latest",
      alias: "dolphin-llama3",
      description:
        "Dolphin LLama3 is a specialized model designed to assist with various tasks.",
    },
    {
      id: 3,
      name: "dolphin-mistral:7b-v2.6-dpo-laser-q8_0",
      alias: "dolphin-mistral-q8",
      description:
        "Mistral model fine-tuned for specific queries with dolphin's twist.",
    },
    {
      id: 4,
      name: "dolphin-mistral:latest",
      alias: "dolphin-mistral",
      description: "The Mistral model with dolphin's touch.",
    },
    {
      id: 5,
      name: "hub/advertiser:latest",
      alias: "advertiser",
      description: "Model for advertising-related tasks.",
    },
    {
      id: 6,
      name: "hub/ai-assisted-doctor:latest",
      alias: "ai-doctor",
      description: "AI-assisted doctor model for medical consultations.",
    },
    {
      id: 7,
      name: "hub/binx/marketing-expert:latest",
      alias: "marketing-expert",
      description: "Expert in marketing strategies and analysis.",
    },
    {
      id: 8,
      name: "hub/commentariat:latest",
      alias: "commentariat",
      description: "Model for generating comments or opinions.",
    },
    {
      id: 9,
      name: "hub/composer:latest",
      alias: "composer",
      description: "Your musical composition assistant.",
    },
    {
      id: 10,
      name: "hub/cyber-security-specialist:latest",
      alias: "cyber-security",
      description: "Model specialized in cyber security.",
    },
    {
      id: 11,
      name: "hub/dad:latest",
      alias: "dad",
      description: "Model for tasks related to being a dad.",
    },
    {
      id: 12,
      name: "hub/dentist:latest",
      alias: "dentist",
      description: "Your dental assistant.",
    },
    {
      id: 13,
      name: "hub/doctor:latest",
      alias: "doctor",
      description: "Doctor assistant for medical consultations.",
    },
    {
      id: 14,
      name: "hub/doge:latest",
      alias: "doge",
      description: "Such model, much assist.",
    },
    {
      id: 15,
      name: "hub/javi/librarian:latest",
      alias: "librarian",
      description: "Model for library-related tasks.",
    },
    {
      id: 16,
      name: "hub/jeff-bezos:latest",
      alias: "bezos",
      description: "Model for tasks related to Jeff Bezos.",
    },
    {
      id: 17,
      name: "hub/languages/french:latest",
      alias: "french",
      description: "Language assistant specialized in French.",
    },
    {
      id: 18,
      name: "hub/languages/spanish:latest",
      alias: "spanish",
      description: "Language assistant specialized in Spanish.",
    },
    {
      id: 19,
      name: "hub/magician:latest",
      alias: "magician",
      description: "Model for performing magic tricks.",
    },
    {
      id: 20,
      name: "hub/math-teacher:latest",
      alias: "math-teacher",
      description: "Model for teaching mathematics.",
    },
    {
      id: 21,
      name: "hub/mlemasters2012/stable-diffusion-prompt:latest",
      alias: "sd-prompt",
      description: "Model for generating prompts with stable diffusion.",
    },
    {
      id: 22,
      name: "hub/personal-trainer:latest",
      alias: "trainer",
      description: "Model for personal training and fitness advice.",
    },
    {
      id: 23,
      name: "hub/plagiarism-checker:latest",
      alias: "plagiarism-checker",
      description: "Model for checking plagiarism in text.",
    },
    {
      id: 24,
      name: "hub/rapper:latest",
      alias: "rapper",
      description: "Model for creating rap lyrics.",
    },
    {
      id: 25,
      name: "hub/recipe-maker:latest",
      alias: "recipe",
      description: "Model for generating recipes.",
    },
    {
      id: 26,
      name: "hub/rocketcaptain/twd-text-based-game:latest",
      alias: "walking-dead",
      description: "Text-based game assistant based on 'The Walking Dead'.",
    },
    {
      id: 27,
      name: "hub/storyteller:latest",
      alias: "storyteller",
      description: "Model for generating stories or narratives.",
    },
    {
      id: 28,
      name: "hub/ten-tweets:latest",
      alias: "ten-tweets",
      description: "Model for generating tweets.",
    },
    {
      id: 29,
      name: "hub/thepr0m3th3an/ghostwriter-braindump:latest",
      alias: "ghostwriter-braindump",
      description: "Assistant for brainstorming and dumping ideas.",
    },
    {
      id: 30,
      name: "hub/thepr0m3th3an/ghostwriter-character:latest",
      alias: "ghostwriter-character",
      description: "Assistant for character development in writing.",
    },
    {
      id: 31,
      name: "hub/thepr0m3th3an/ghostwriter-draftprose:latest",
      alias: "ghostwriter-draftprose",
      description: "Assistant for drafting prose and writing.",
    },
    {
      id: 32,
      name: "hub/thepr0m3th3an/ghostwriter-editor:latest",
      alias: "ghostwriter-editor",
      description: "Assistant for editing and refining written content.",
    },
    {
      id: 33,
      name: "hub/thepr0m3th3an/ghostwriter-finalprose:latest",
      alias: "ghostwriter-finalprose",
      description: "Assistant for finalizing prose and written content.",
    },
    {
      id: 34,
      name: "hub/thepr0m3th3an/ghostwriter-outline:latest",
      alias: "ghostwriter-outline",
      description: "Assistant for creating outlines and structuring writing.",
    },
    {
      id: 35,
      name: "hub/thepr0m3th3an/ghostwriter-storybeats:latest",
      alias: "ghostwriter-storybeats",
      description: "Assistant for developing story beats and plotlines.",
    },
    {
      id: 36,
      name: "hub/thepr0m3th3an/ghostwriter-synopsis:latest",
      alias: "ghostwriter-synopsis",
      description: "Assistant for creating synopses and summarizing content.",
    },
    {
      id: 37,
      name: "hub/weconnected/drum-sequencer-pro:latest",
      alias: "drum",
      description: "Model for creating drum sequences.",
    },
    {
      id: 38,
      name: "hub/zillomab/llama3-uncensored:latest",
      alias: "llama3-uncensored",
      description: "Uncensored version of Llama3 model.",
    },
    {
      id: 39,
      name: "llama2:latest",
      alias: "llama2",
      description: "Llama2 model for various tasks.",
    },
    {
      id: 40,
      name: "llama3-chatqa:latest",
      alias: "llama3-chatqa",
      description: "Llama3 model for chat-based question answering.",
    },
    {
      id: 41,
      name: "llama3:latest",
      alias: "llama3",
      description: "Llama3 model for various tasks.",
    },
    {
      id: 42,
      name: "llava-llama3:latest",
      alias: "llava-llama3",
      description: "Model for tasks related to Llava Llama3.",
    },
    {
      id: 43,
      name: "llava-phi3:latest",
      alias: "llava-phi3",
      description: "Model for tasks related to Llava Phi3.",
    },
    {
      id: 44,
      name: "mistral:latest",
      alias: "mistral",
      description: "Mistral model for various tasks.",
    },
    {
      id: 45,
      name: "nous-hermes:latest",
      alias: "nous-hermes",
      description: "Model for tasks related to Nous Hermes.",
    },
    {
      id: 46,
      name: "nous-hermes2:latest",
      alias: "nous-hermes2",
      description: "Hermes2 model for various tasks.",
    },
    {
      id: 47,
      name: "ollama.com/library/llama3:8b-instruct-fp16",
      alias: "ollama3-fp16",
      description:
        "LLama3 model with instructions for FP16 from Ollama.com library.",
    },
    {
      id: 48,
      name: "ollama.com/library/llama3:8b",
      alias: "ollama3",
      description: "LLama3 model from Ollama.com library.",
    },
    {
      id: 49,
      name: "openchat:latest",
      alias: "openchat",
      description: "Model for open chat-related tasks.",
    },
    {
      id: 50,
      name: "openhermes2.5-mistral:latest",
      alias: "openhermes2.5-mistral",
      description: "Open Hermes 2.5 Mistral model.",
    },
    {
      id: 51,
      name: "starling-lm:latest",
      alias: "starling",
      description: "Starling model for various tasks.",
    },
  ];

  static DefaultModel = OllamaPlugin.Models.find((m) => m.alias === "llava-llama3");

  /**
   * Will check if the prefix contains a model name or id.
   * Try to get the model with a name or id.
   *
   * @param {string} prefixOrId
   * @return {string} The parsed model name
   */
  static getModelByPrefixOrId(prefixOrId: string): AIModel {
    const modelAlias = prefixOrId.includes(":")
      ? prefixOrId.split(":")[1]
      : null;
    if (!modelAlias.length) {
      return null;
    }

    // Lookup using an id instead of an alias
    const lookUpId = modelAlias?.length ? Number(modelAlias) : null;
    if (!isNaN(lookUpId)) {
      return OllamaPlugin.Models.find((m) => m.id === lookUpId);
    }

    return OllamaPlugin.Models.find((m) => m.alias === modelAlias);
  }

  static getUserConfigMessage(state: UserState): string {
    let sb = "```md";
    sb += `\n- Id: ${state.model.id}`;
    sb += `\n- Alias: ${state.model.alias}`;
    sb += `\n- Name: ${state.model.name}`;
    sb += `\n- Description: ${state.model.description}`;
    sb += `\n- Messages: ${state.messages.length}`;
    sb += "\n```";

    return sb;
  }

  static getModelsListJson(): string {
    return JSON.stringify(OllamaPlugin.Models, null, 2);
  }
}
