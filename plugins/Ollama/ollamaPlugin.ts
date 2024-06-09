export type AIModel = {
    id: number,
    alias: string,
    name: string,
    description: string
}

export type ChatMessage = {
    role: string,
    content?: string,
    [rest: string]: any;
};

export type UserState = {
    model: AIModel
    messages: ChatMessage[]
};

export class OllamaPlugin {
    static Models: AIModel[] = [
        {
            "id": 1,
            "name": "dnd:latest",
            "alias": "dnd",
            "description": "Dungeons & Dragons assistant for game mastering."
        },
        {
            "id": 2,
            "name": "dolphin-llama3:latest",
            "alias": "dolphin-llama3",
            "description": "Dolphin LLama3 is a specialized model designed to assist with various tasks."
        },
        {
            "id": 3,
            "name": "dolphin-mistral:7b-v2.6-dpo-laser-q8_0",
            "alias": "dolphin-mistral-q8",
            "description": "Mistral model fine-tuned for specific queries with dolphin's twist."
        },
        {
            "id": 4,
            "name": "dolphin-mistral:latest",
            "alias": "dolphin-mistral",
            "description": "The Mistral model with dolphin's touch."
        },
        {
            "id": 5,
            "name": "hub/advertiser:latest",
            "alias": "advertiser",
            "description": "Model for advertising-related tasks."
        },
        {
            "id": 6,
            "name": "hub/ai-assisted-doctor:latest",
            "alias": "ai-doctor",
            "description": "AI-assisted doctor model for medical consultations."
        },
        {
            "id": 7,
            "name": "hub/binx/marketing-expert:latest",
            "alias": "marketing-expert",
            "description": "Expert in marketing strategies and analysis."
        },
        {
            "id": 8,
            "name": "hub/commentariat:latest",
            "alias": "commentariat",
            "description": "Model for generating comments or opinions."
        },
        {
            "id": 9,
            "name": "hub/composer:latest",
            "alias": "composer",
            "description": "Your musical composition assistant."
        },
        {
            "id": 10,
            "name": "hub/cyber-security-specialist:latest",
            "alias": "cyber-security",
            "description": "Model specialized in cyber security."
        },
        {
            "id": 11,
            "name": "hub/dad:latest",
            "alias": "dad",
            "description": "Model for tasks related to being a dad."
        },
        {
            "id": 12,
            "name": "hub/dentist:latest",
            "alias": "dentist",
            "description": "Your dental assistant."
        },
        {
            "id": 13,
            "name": "hub/doctor:latest",
            "alias": "doctor",
            "description": "Doctor assistant for medical consultations."
        },
        {
            "id": 14,
            "name": "hub/doge:latest",
            "alias": "doge",
            "description": "Such model, much assist."
        },
        {
            "id": 15,
            "name": "hub/javi/librarian:latest",
            "alias": "librarian",
            "description": "Model for library-related tasks."
        },
        {
            "id": 16,
            "name": "hub/jeff-bezos:latest",
            "alias": "jeff-bezos",
            "description": "Model for tasks related to Jeff Bezos."
        },
        {
            "id": 17,
            "name": "hub/languages/french:latest",
            "alias": "french",
            "description": "Language assistant specialized in French."
        },
        {
            "id": 18,
            "name": "hub/languages/spanish:latest",
            "alias": "spanish",
            "description": "Language assistant specialized in Spanish."
        },
        {
            "id": 19,
            "name": "hub/magician:latest",
            "alias": "magician",
            "description": "Model for performing magic tricks."
        },
        {
            "id": 20,
            "name": "hub/math-teacher:latest",
            "alias": "math-teacher",
            "description": "Model for teaching mathematics."
        },
        {
            "id": 21,
            "name": "hub/mlemasters2012/stable-diffusion-prompt:latest",
            "alias": "sd-prompt",
            "description": "Model for generating prompts with stable diffusion."
        },
        {
            "id": 22,
            "name": "hub/personal-trainer:latest",
            "alias": "trainer",
            "description": "Model for personal training and fitness advice."
        },
        {
            "id": 23,
            "name": "hub/plagiarism-checker:latest",
            "alias": "plagiarism",
            "description": "Model for checking plagiarism in text."
        },
        {
            "id": 24,
            "name": "hub/rapper:latest",
            "alias": "rapper",
            "description": "Model for creating rap lyrics."
        },
        {
            "id": 25,
            "name": "hub/recipe-maker:latest",
            "alias": "recipe-maker",
            "description": "Model for generating recipes."
        },
        {
            "id": 26,
            "name": "hub/rocketcaptain/twd-text-based-game:latest",
            "alias": "walking-dead",
            "description": "Text-based game assistant based on 'The Walking Dead'."
        },
        {
            "id": 27,
            "name": "hub/storyteller:latest",
            "alias": "story",
            "description": "Model for generating stories or narratives."
        },
        {
            "id": 28,
            "name": "hub/ten-tweets:latest",
            "alias": "ten-tweets",
            "description": "Model for generating tweets."
        },
        {
            "id": 29,
            "name": "hub/thepr0m3th3an/ghostwriter-braindump:latest",
            "alias": "braindump",
            "description": "Assistant for brainstorming and dumping ideas."
        },
        {
            "id": 30,
            "name": "hub/thepr0m3th3an/ghostwriter-character:latest",
            "alias": "character",
            "description": "Assistant for character development in writing."
        },
        {
            "id": 31,
            "name": "hub/thepr0m3th3an/ghostwriter-draftprose:latest",
            "alias": "draftprose",
            "description": "Assistant for drafting prose and writing."
        },
        {
            "id": 32,
            "name": "hub/thepr0m3th3an/ghostwriter-editor:latest",
            "alias": "editor",
            "description": "Assistant for editing and refining written content."
        },
        {
            "id": 33,
            "name": "hub/thepr0m3th3an/ghostwriter-finalprose:latest",
            "alias": "finalprose",
            "description": "Assistant for finalizing prose and written content."
        },
        {
            "id": 34,
            "name": "hub/thepr0m3th3an/ghostwriter-outline:latest",
            "alias": "outline",
            "description": "Assistant for creating outlines and structuring writing."
        },
        {
            "id": 35,
            "name": "hub/thepr0m3th3an/ghostwriter-storybeats:latest",
            "alias": "storybeats",
            "description": "Assistant for developing story beats and plotlines."
        },
        {
            "id": 36,
            "name": "hub/thepr0m3th3an/ghostwriter-synopsis:latest",
            "alias": "synopsis",
            "description": "Assistant for creating synopses and summarizing content."
        },
        {
            "id": 37,
            "name": "hub/weconnected/drum-sequencer-pro:latest",
            "alias": "drum",
            "description": "Model for creating drum sequences."
        },
        {
            "id": 38,
            "name": "hub/zillomab/llama3-uncensored:latest",
            "alias": "llama3-uncensored",
            "description": "Uncensored version of Llama3 model."
        },
        {
            "id": 39,
            "name": "llama2:latest",
            "alias": "llama2",
            "description": "Llama2 model for various tasks."
        },
        {
            "id": 40,
            "name": "llama3-chatqa:latest",
            "alias": "llama3-chatqa",
            "description": "Llama3 model for chat-based question answering."
        },
        {
            "id": 41,
            "name": "llama3:latest",
            "alias": "llama3",
            "description": "Llama3 model for various tasks."
        },
        {
            "id": 42,
            "name": "llava-llama3:latest",
            "alias": "llava-llama3",
            "description": "Model for tasks related to Llava Llama3."
        },
        {
            "id": 43,
            "name": "llava-phi3:latest",
            "alias": "llava-phi3",
            "description": "Model for tasks related to Llava Phi3."
        },
        {
            "id": 44,
            "name": "mistral:latest",
            "alias": "mistral",
            "description": "Mistral model for various tasks."
        },
        {
            "id": 45,
            "name": "nous-hermes:latest",
            "alias": "nous-hermes",
            "description": "Model for tasks related to Nous Hermes."
        },
        {
            "id": 46,
            "name": "nous-hermes2:latest",
            "alias": "nous-hermes2",
            "description": "Hermes2 model for various tasks."
        },
        {
            "id": 47,
            "name": "ollama.com/library/llama3:8b-instruct-fp16",
            "alias": "ollama3-fp16",
            "description": "LLama3 model with instructions for FP16 from Ollama.com library."
        },
        {
            "id": 48,
            "name": "ollama.com/library/llama3:8b",
            "alias": "ollama3",
            "description": "LLama3 model from Ollama.com library."
        },
        {
            "id": 49,
            "name": "openhermes2.5-mistral:latest",
            "alias": "oh2.5-mistral",
            "description": "Open Hermes 2.5 Mistral model."
        },
        {
            "id": 50,
            "name": "starling-lm:latest",
            "alias": "starling",
            "description": "Starling model for various tasks."
        },
        {
            "id": 51,
            "name": "gemma-2b",
            "alias": "gemma-2b",
            "description": "Gemma-2b is a family of lightweight, state-of-the-art open models built by Google DeepMind"
        },
        {
            "id": 52,
            "name": "gemma:latest",
            "alias": "gemma",
            "description": "Gemma-7b is a family of lightweight, state-of-the-art open models built by Google DeepMind."
        },
        {
            "id": 53,
            "name": "llama2-chinese:latest",
            "alias": "chinese",
            "description": "Llama 2 based model fine tuned to improve Chinese dialogue ability.."
        },
        {
            "id": 54,
            "name": "faster-drum-sequencer:latest",
            "alias": "drummer",
            "description": "Our faster AI drum sequencer creates custom drum patterns instantly, perfect for musicians and producers."
        },
        {
            "id": 55,
            "name": "phi3:latest",
            "alias": "phi3",
            "description": "This is a new small model with a lot of potential"
        },
        {
            "id": 56,
            "name": "sentiments-llama3:latest",
            "alias": "sentiments-llama3",
            "description": "Fine-tuned LLaMA for sentiment analysis."
        },
        {
            "id": 57,
            "name": "jimscard/whiterabbit-neo:latest",
            "alias": "whiterabbit-neo",
            "description": "Variant of White Rabbit Neo, a large language model."
        },
        {
            "id": 58,
            "name": "blackhat-hacker:latest",
            "alias": "blackhat-hacker",
            "description": "A tool for ethical hacking and penetration testing."
        },
        {
            "id": 59,
            "name": "openchat:latest",
            "alias": "openchat",
            "description": "An open-source chat platform for secure communication."
        },
        {
            "id": 60,
            "name": "hub/darkstorm2150/Wilderness-Survivalist:latest",
            "alias": "wilderness-survivalist",
            "description": "A survival guide for wilderness adventures."
        },
        {
            "id": 61,
            "name": "hub/darkstorm2150/Psychologist:latest",
            "alias": "psychologist",
            "description": "A tool for mental health professionals."
        },
        {
            "id": 62,
            "name": "hub/darkstorm2150/Ooh-Ollama:latest",
            "alias": "ooh-ollama",
            "description": "A mysterious tool with unknown purposes."
        },
        {
            "id": 63,
            "name": "hub/darkstorm2150/Doomsday-Survivalist:latest",
            "alias": "doomsday-survivalist",
            "description": "A guide for surviving catastrophic events."
        },
        {
            "id": 64,
            "name": "hub/darkstorm2150/Urban-Survivalist:latest",
            "alias": "urban-survivalist",
            "description": "A guide for surviving in urban environments."
        },
        {
            "id": 65,
            "name": "dolphin-mistral-7b-v2.6-dpo-laser.Q8_0.gguf:latest",
            "alias": "dolphin-mistral-7b-v2.6-Q8",
            "description": "A machine learning model for image processing."
        },
        {
            "id": 66,
            "name": "dolphin-2_6-phi-2.Q6_K.gguf:latest",
            "alias": "dolphin-2_6-phi-2-Q6",
            "description": "A natural language processing tool."
        },
        {
            "id": 67,
            "name": "dolphin-2.6-mistral-7b.Q4_K_M.gguf:latest",
            "alias": "dolphin-2.6-mistral-7b-Q4",
            "description": "A predictive model for data analysis."
        },
        {
            "id": 68,
            "name": "whiterabbitneo-13b.Q5_K_M.gguf:latest",
            "alias": "whiterabbitneo-13b-Q5",
            "description": "A cybersecurity tool for threat detection."
        },
        {
            "id": 69,
            "name": "aya:latest",
            "alias": "aya",
            "description": "Multilingual models that support 23 languages."
        },
        {
            "id": 70,
            "name": "satani",
            "alias": "satani",
            "description": "Model for dark-themed tasks."
        },
        {
            "id": 71,
            "name": "hub/dotslashgabut/genaiprompt:latest",
            "alias": "genai",
            "description": "AI model for generating prompts."
        },
        {
            "id": 72,
            "name": "hub/mesharu/caelia---tarot-cards-reader:latest",
            "alias": "tarot",
            "description": "Model for reading tarot cards."
        },
        {
            "id": 73,
            "name": "phi3:14b",
            "alias": "phi3-14b",
            "description": "Enhanced version of the Phi3 model."
        },
        {
            "id": 74,
            "name": "hub/rouge/expert-japanese-to-english-translator:latest",
            "alias": "rouge",
            "description": "Expert translator for Japanese to English."
        },
        {
            "id": 75,
            "name": "hub/weconnected/expert-spanish-to-english-translator:latest",
            "alias": "spanishbywe",
            "description": "Expert translator for Spanish to English."
        },
        {
            "id": 76,
            "name": "hub/qwen2:0.5b",
            "alias": "q0",
            "description": "Qwen2 series large language model by Qwen team, Alibaba Cloud"
        },
        {
            "id": 77,
            "name": "hub/qwen2:1.5b",
            "alias": "q1",
            "description": "Qwen2 series large language model by Qwen team, Alibaba Cloud"
        },
        {
            "id": 78,
            "name": "hub/qwen2:7b",
            "alias": "q7",
            "description": "Qwen2 series large language model by Qwen team, Alibaba Cloud"
        }
    ];

    static DefaultModel = OllamaPlugin.Models.find(m => m.alias === "llava-llama3");

    /**
     * Will check if the prefix contains a model name or id.
     * Try to get the model with a name or id.
     *
     * @param {string} prefixOrId
     * @return {string} The parsed model name
     */
    static getModelByPrefixOrId(prefixOrId: string): AIModel {
        const modelAlias = prefixOrId.includes(":") ? prefixOrId.split(":")[1] : null;
        if (!modelAlias.length) {
            return null;
        }

        // Lookup using an id instead of an alias
        const lookUpId = modelAlias?.length ? Number(modelAlias) : null;
        if (!isNaN(lookUpId)) {
            return OllamaPlugin.Models.find(m => m.id === lookUpId);
        }

        return OllamaPlugin.Models.find(m => m.alias === modelAlias);
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
