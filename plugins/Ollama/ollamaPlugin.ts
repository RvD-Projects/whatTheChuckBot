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
            "name": "dolphin-llama3:latest",
            "alias": "dolphin-llama3",
            "description": "Dolphin LLama3 is a specialized model designed to assist with various tasks."
        },
        {
            "id": 2,
            "name": "dolphin-mistral:7b-v2.6-dpo-laser-q8_0",
            "alias": "dolphin-mistral-q8",
            "description": "Mistral model fine-tuned for specific queries with dolphin's twist."
        },
        {
            "id": 3,
            "name": "dolphin-mistral:latest",
            "alias": "dolphin-mistral",
            "description": "The Mistral model with dolphin's touch."
        },
        {
            "id": 4,
            "name": "hub/ai-assisted-doctor:latest",
            "alias": "ai-doctor",
            "description": "AI-assisted doctor model for medical consultations."
        },
        {
            "id": 5,
            "name": "hub/bagellama/d&d-dungeon-master-assistant:latest",
            "alias": "dnd",
            "description": "Dungeons & Dragons assistant for game mastering."
        },
        {
            "id": 6,
            "name": "hub/binx/marketing-expert:latest",
            "alias": "marketing-expert",
            "description": "Expert in marketing strategies and analysis."
        },
        {
            "id": 7,
            "name": "hub/ch0ks/security-risk-specialist-and-strategist-mistral:latest",
            "alias": "security-risk",
            "description": "Specialist and strategist in security risks, leveraging the Mistral model."
        },
        {
            "id": 8,
            "name": "hub/composer:latest",
            "alias": "composer",
            "description": "Your musical composition assistant."
        },
        {
            "id": 9,
            "name": "hub/darkstorm2150/Doomsday-Survivalist:latest",
            "alias": "doomsday-survivalist",
            "description": "Assistant specialized in survival tactics for doomsday scenarios."
        },
        {
            "id": 10,
            "name": "hub/darkstorm2150/Urban-Survivalist:latest",
            "alias": "urban-survivalist",
            "description": "Assistant specialized in survival tactics for urban environments."
        },
        {
            "id": 11,
            "name": "hub/darkstorm2150/Wilderness-Survivalist:latest",
            "alias": "wilderness-survivalist",
            "description": "Assistant specialized in survival tactics for wilderness environments."
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
            "name": "hub/jyorko/based-dolphin-mistral:latest",
            "alias": "based-dolphin-mistral",
            "description": "Dolphin Mixtral's enhanced version."
        },
        {
            "id": 15,
            "name": "hub/languages/spanish:latest",
            "alias": "spanish",
            "description": "Language assistant specialized in Spanish."
        },
        {
            "id": 16,
            "name": "hub/nicluckie/the-good-doctor:latest",
            "alias": "the-good-doctor",
            "description": "Assistant modeled after a good doctor for medical consultations."
        },
        {
            "id": 17,
            "name": "hub/rkrkrk/doctor-psy:latest",
            "alias": "doctor-psy",
            "description": "Psychologist assistant."
        },
        {
            "id": 18,
            "name": "hub/rocketcaptain/the-walking-dead---text-based-game:latest",
            "alias": "walking-dead",
            "description": "Text-based game assistant based on 'The Walking Dead'."
        },
        {
            "id": 19,
            "name": "hub/styx/deep-thought:latest",
            "alias": "deep-thought",
            "description": "Assistant for deep thinking and philosophical queries."
        },
        {
            "id": 20,
            "name": "hub/thepr0m3th3an/ghostwriter-braindump:latest",
            "alias": "ghostwriter-braindump",
            "description": "Assistant for brainstorming and dumping ideas."
        },
        {
            "id": 21,
            "name": "hub/thepr0m3th3an/ghostwriter-character:latest",
            "alias": "ghostwriter-character",
            "description": "Assistant for character development in writing."
        },
        {
            "id": 22,
            "name": "hub/thepr0m3th3an/ghostwriter-draftprose:latest",
            "alias": "ghostwriter-draftprose",
            "description": "Assistant for drafting prose and writing."
        },
        {
            "id": 23,
            "name": "hub/thepr0m3th3an/ghostwriter-editor:latest",
            "alias": "ghostwriter-editor",
            "description": "Assistant for editing and refining written content."
        },
        {
            "id": 24,
            "name": "hub/thepr0m3th3an/ghostwriter-finalprose:latest",
            "alias": "ghostwriter-finalprose",
            "description": "Assistant for finalizing prose and written content."
        },
        {
            "id": 25,
            "name": "hub/thepr0m3th3an/ghostwriter-outline:latest",
            "alias": "ghostwriter-outline",
            "description": "Assistant for creating outlines and structuring writing."
        },
        {
            "id": 26,
            "name": "hub/thepr0m3th3an/ghostwriter-storybeats:latest",
            "alias": "ghostwriter-storybeats",
            "description": "Assistant for developing story beats and plotlines."
        },
        {
            "id": 27,
            "name": "hub/thepr0m3th3an/ghostwriter-synopsis:latest",
            "alias": "ghostwriter-synopsis",
            "description": "Assistant for creating synopses and summarizing content."
        },
        {
            "id": 28,
            "name": "hub/zillomab/llama3-uncensored:latest",
            "alias": "llama3-uncensored",
            "description": "Uncensored version of Llama3 model."
        },
        {
            "id": 29,
            "name": "llama2:latest",
            "alias": "llama2",
            "description": "Llama2 model for various tasks."
        },
        {
            "id": 30,
            "name": "llama3:latest",
            "alias": "llama3",
            "description": "Llama3 model for various tasks."
        },
        {
            "id": 31,
            "name": "mistral:latest",
            "alias": "mistral",
            "description": "Mistral model for various tasks."
        },
        {
            "id": 32,
            "name": "nous-hermes2:latest",
            "alias": "nous-hermes2",
            "description": "Hermes2 model for various tasks."
        },
        {
            "id": 33,
            "name": "ollama.com/library/llama3:8b",
            "alias": "ollama3",
            "description": "LLama3 model from Ollama.com library."
        },
        {
            "id": 34,
            "name": "ollama.com/library/llama3:8b-instruct-fp16",
            "alias": "ollama3-fp16",
            "description": "LLama3 model with instructions for FP16 from Ollama.com library."
        },
        {
            "id": 35,
            "name": "openhermes2.5-mistral:latest",
            "alias": "openhermes2.5-mistral",
            "description": "Open Hermes 2.5 Mistral model."
        },
        {
            "id": 36,
            "name": "psychologist-by-darkstorm:latest",
            "alias": "psychologist",
            "description": "Psychologist assistant by Darkstorm."
        },
        {
            "id": 37,
            "name": "starling-lm:latest",
            "alias": "starling",
            "description": "Starling model for various tasks."
        }
    ];

    static DefaultModel = OllamaPlugin.Models.find(m => m.alias === "llama3");

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
