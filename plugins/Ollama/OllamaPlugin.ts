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
            id: 1,
            alias: "bakllava",
            name: "bakllava:latest",
            description: "The latest version of the Bakllava model"
        },
        {
            id: 2,
            alias: "codellama",
            name: "codellama:latest",
            description: "The latest version of the Codellama model"
        },
        {
            id: 3,
            alias: "deepseek-coder-67b",
            name: "deepseek-coder:6.7b",
            description: "A 6.7 billion parameter model for deep code searching and understanding"
        },
        {
            id: 4,
            alias: "dolphin-llama3",
            name: "dolphin-llama3:latest",
            description: "The latest version of the Dolphin Llama3 model"
        },
        {
            id: 5,
            alias: "dolphin-mistral-7b-q8",
            name: "dolphin-mistral:7b-v2.6-dpo-laser-q8_0",
            description: "A 7 billion parameter model with version 2.6, DPO, laser, and Q8_0 settings"
        },
        {
            id: 6,
            alias: "dolphin-mistral-7b-q4",
            name: "dolphin-mistral:7b-v2.6-q4_K_M",
            description: "A 7 billion parameter model with version 2.6 and Q4_K_M settings"
        },
        {
            id: 7,
            alias: "dolphin-mistral",
            name: "dolphin-mistral:latest",
            description: "The latest version of the Dolphin Mistral model"
        },
        {
            id: 8,
            alias: "dolphin-mixtral-8x7b-q3",
            name: "dolphin-mixtral:8x7b-v2.6-q3_K_L",
            description: "An 8x7 billion parameter model with version 2.6 and Q3_K_L settings"
        },
        {
            id: 9,
            alias: "dolphin-mixtral",
            name: "dolphin-mixtral:latest",
            description: "The latest version of the Dolphin Mixtral model"
        },
        {
            id: 10,
            alias: "dolphin-phi",
            name: "dolphin-phi:latest",
            description: "The latest version of the Dolphin Phi model"
        },
        {
            id: 11,
            alias: "gemma-2b",
            name: "gemma:2b",
            description: "A 2 billion parameter model"
        },
        {
            id: 12,
            alias: "gemma-7b",
            name: "gemma:7b",
            description: "A 7 billion parameter model"
        },
        {
            id: 13,
            alias: "steve-jobs",
            name: "hub/aaartist/steve-jobs:latest",
            description: "The latest version of the Steve Jobs model by AAartist"
        },
        {
            id: 14,
            alias: "homoeopath",
            name: "hub/aadesh89/homoeopath:latest",
            description: "The latest version of the Homoeopath model by Aadesh89"
        },
        {
            id: 15,
            alias: "accountant",
            name: "hub/accountant:latest",
            description: "The latest version of the Accountant model"
        },
        {
            id: 16,
            alias: "advertiser",
            name: "hub/advertiser:latest",
            description: "The latest version of the Advertiser model"
        },
        {
            id: 17,
            alias: "ai-doctor",
            name: "hub/ai-assisted-doctor:latest",
            description: "The latest version of the AI-assisted Doctor model"
        },
        {
            id: 18,
            alias: "ai-tutor",
            name: "hub/ai-writing-tutor:latest",
            description: "The latest version of the AI Writing Tutor model"
        },
        {
            id: 19,
            alias: "artist-advisor",
            name: "hub/andrew/artist-advisor:latest",
            description: "The latest version of the Artist Advisor model by Andrew"
        },
        {
            id: 20,
            alias: "fin-analyst",
            name: "hub/andrew/financial-analyst:latest",
            description: "The latest version of the Financial Analyst model by Andrew"
        },
        {
            id: 21,
            alias: "auto-mechanic",
            name: "hub/automobile-mechanic:latest",
            description: "The latest version of the Automobile Mechanic model"
        },
        {
            id: 22,
            alias: "axel-narrator",
            name: "hub/axel/history-narrator:latest",
            description: "The latest version of the History Narrator model by Axel"
        },
        {
            id: 23,
            alias: "bacx-buddy",
            name: "hub/bacx/studybuddy:latest",
            description: "The latest version of the Studybuddy model by Bacx"
        },
        {
            id: 24,
            alias: "dnd",
            name: "hub/bagellama/d&d-dungeon-master-assistant:latest",
            description: "The latest version of the D&D Dungeon Master Assistant model by Bagellama"
        },
        {
            id: 25,
            alias: "based-mixtral",
            name: "hub/based-dolphin-mixtral:latest",
            description: "The latest version of the Based Dolphin Mixtral model"
        },
        {
            id: 26,
            alias: "bitbinge-law",
            name: "hub/bitbinge/lawx:latest",
            description: "The latest version of the Lawx model by Bitbinge"
        },
        {
            id: 27,
            alias: "career-counselor",
            name: "hub/career-counselor:latest",
            description: "The latest version of the Career Counselor model"
        },
        {
            id: 28,
            alias: "security-strategist-mistral",
            name: "hub/ch0ks/security-risk-specialist-and-strategist-mistral:latest",
            description: "The latest version of the Security Risk Specialist and Strategist model with Mistral settings by Ch0ks"
        },
        {
            id: 29,
            alias: "chef",
            name: "hub/chef:latest",
            description: "The latest version of the Chef model"
        },
        {
            id: 30,
            alias: "game-rec",
            name: "hub/chiph31/game-recommender:latest",
            description: "The latest version of the Game Recommender model by Chiph31"
        },
        {
            id: 31,
            alias: "sarah-caring",
            name: "hub/chmurli/sarah-lovely-caring-girlfriend:latest",
            description: "The latest version of the Sarah Lovely Caring Girlfriend model by Chmurli"
        },
        {
            id: 32,
            alias: "emily",
            name: "hub/chronixsc/emily:latest",
            description: "The latest version of the Emily model by Chronixsc"
        },
        {
            id: 33,
            alias: "eulabot",
            name: "hub/claragreen/eulabot:latest",
            description: "The latest version of the Eulabot model by Claragreen"
        },
        {
            id: 34,
            alias: "commentariat",
            name: "hub/commentariat:latest",
            description: "The latest version of the Commentariat model"
        },
        {
            id: 35,
            alias: "composer",
            name: "hub/composer:latest",
            description: "The latest version of the Composer model"
        },
        {
            id: 36,
            alias: "resume-reviewer",
            name: "hub/crackmac/resume-reviewer:latest",
            description: "The latest version of the Resume Reviewer model by Crackmac"
        },
        {
            id: 37,
            alias: "walt-disney",
            name: "hub/crackmac/walt-disney:latest",
            description: "The latest version of the Walt Disney model by Crackmac"
        },
        {
            id: 38,
            alias: "cyber-specialist",
            name: "hub/cyber-security-specialist:latest",
            description: "The latest version of the Cyber Security Specialist model"
        },
        {
            id: 39,
            alias: "data-archivist",
            name: "hub/darkstorm2150/Data-Archivist:latest",
            description: "The latest version of the Data Archivist model by Darkstorm2150"
        },
        {
            id: 40,
            alias: "data-hoarder",
            name: "hub/darkstorm2150/Data-Hoarder:latest",
            description: "The latest version of the Data Hoarder model by Darkstorm2150"
        },
        {
            id: 41,
            alias: "doomsday-survivalist",
            name: "hub/darkstorm2150/Doomsday-Survivalist:latest",
            description: "The latest version of the Doomsday Survivalist model by Darkstorm2150"
        },
        {
            id: 42,
            alias: "ollama-create",
            name: "hub/darkstorm2150/OllamaCreate:latest",
            description: "The latest version of the OllamaCreate model by Darkstorm2150"
        },
        {
            id: 43,
            alias: "ooh-ollama",
            name: "hub/darkstorm2150/Ooh-Ollama:latest",
            description: "The latest version of the Ooh-Ollama model by Darkstorm2150"
        },
        {
            id: 44,
            alias: "psychologist",
            name: "hub/darkstorm2150/Psychologist:latest",
            description: "The latest version of the Psychologist model by Darkstorm2150"
        },
        {
            id: 45,
            alias: "ravengpt",
            name: "hub/darkstorm2150/RavenGPT:latest",
            description: "The latest version of the RavenGPT model by Darkstorm2150"
        },
        {
            id: 46,
            alias: "urban-survivalist",
            name: "hub/darkstorm2150/Urban-Survivalist:latest",
            description: "The latest version of the Urban Survivalist model by Darkstorm2150"
        },
        {
            id: 47,
            alias: "wilderness-survivalist",
            name: "hub/darkstorm2150/Wilderness-Survivalist:latest",
            description: "The latest version of the Wilderness Survivalist model by Darkstorm2150"
        },
        {
            id: 48,
            alias: "debate-coach",
            name: "hub/debate-coach:latest",
            description: "The latest version of the Debate Coach model"
        },
        {
            id: 49,
            alias: "debater",
            name: "hub/debater:latest",
            description: "The latest version of the Debater model"
        },
        {
            id: 50,
            alias: "dentist",
            name: "hub/dentist:latest",
            description: "The latest version of the Dentist model"
        },
        {
            id: 51,
            alias: "devops",
            name: "hub/devops:latest",
            description: "The latest version of the DevOps model"
        },
        {
            id: 52,
            alias: "doctor",
            name: "hub/doctor:latest",
            description: "The latest version of the Doctor model"
        },
        {
            id: 53,
            alias: "cardiologist",
            name: "hub/doctor/cardiologist:latest",
            description: "The latest version of the Cardiologist model"
        },
        {
            id: 54,
            alias: "dermatologist",
            name: "hub/doctor/dermatologist:latest",
            description: "The latest version of the Dermatologist model"
        },
        {
            id: 55,
            alias: "gastroenterologist",
            name: "hub/doctor/gastroenterologist:latest",
            description: "The latest version of the Gastroenterologist model"
        },
        {
            id: 56,
            alias: "neurologist",
            name: "hub/doctor/neurologist:latest",
            description: "The latest version of the Neurologist model"
        },
        {
            id: 57,
            alias: "psychologist",
            name: "hub/doctor/psychologist:latest",
            description: "The latest version of the Psychologist model"
        },
        {
            id: 58,
            alias: "doge",
            name: "hub/doge:latest",
            description: "The latest version of the Doge model"
        },
        {
            id: 59,
            alias: "who-am-i",
            name: "hub/dubmaster/who-am-i-game:latest",
            description: "The latest version of the Who-Am-I Game model by Dubmaster"
        },
        {
            id: 60,
            alias: "dr.-evelyn",
            name: "hub/dwrou/dr.-evelyn:latest",
            description: "The latest version of the Dr. Evelyn model by Dwrou"
        },
        {
            id: 61,
            alias: "elon-musk",
            name: "hub/elon-musk:latest",
            description: "The latest version of the Elon Musk model"
        },
        {
            id: 62,
            alias: "contract-analyzer",
            name: "hub/elonmusk/contract-analyzer-:latest",
            description: "The latest version of the Contract Analyzer model by Elonmusk"
        },
        {
            id: 63,
            alias: "artteacher",
            name: "hub/emclinux/artteacher:latest",
            description: "The latest version of the Artteacher model by Emclinux"
        },
        {
            id: 64,
            alias: "english-translator",
            name: "hub/english-translator-and-improver:latest",
            description: "The latest version of the English Translator and Improver model"
        },
        {
            id: 65,
            alias: "etymologist",
            name: "hub/etymologist:latest",
            description: "The latest version of the Etymologist model"
        },
        {
            id: 66,
            alias: "btc-trader",
            name: "hub/fabienpichon/btc_trader_one:latest",
            description: "The latest version of the BTC Trader One model by Fabienpichon"
        },
        {
            id: 67,
            alias: "football-commentator",
            name: "hub/football-commentator:latest",
            description: "The latest version of the Football Commentator model"
        },
        {
            id: 68,
            alias: "mr-zurkon",
            name: "hub/helloandre/mr-zurkon:latest",
            description: "The latest version of the Mr. Zurkon model by Helloandre"
        },
        {
            id: 69,
            alias: "python-coder",
            name: "hub/janduplessis883/python-coder:latest",
            description: "The latest version of the Python Coder model by Janduplessis883"
        },
        {
            id: 70,
            alias: "librarian",
            name: "hub/javi/librarian:latest",
            description: "The latest version of the Librarian model by Javi"
        },
        {
            id: 71,
            alias: "jeff-bezos",
            name: "hub/jeff-bezos:latest",
            description: "The latest version of the Jeff Bezos model"
        },
        {
            id: 72,
            alias: "english-teacher",
            name: "hub/kamjin/english-teacher:latest",
            description: "The latest version of the English Teacher model by Kamjin"
        },
        {
            id: 73,
            alias: "minecraft",
            name: "hub/krsmes/minecraft:latest",
            description: "The latest version of the Minecraft model by Krsmes"
        },
        {
            id: 74,
            alias: "linux",
            name: "hub/linux-terminal:latest",
            description: "The latest version of the Linux Terminal model"
        },
        {
            id: 75,
            alias: "dejargonizer",
            name: "hub/louisguitton/dejargonizer:latest",
            description: "The latest version of the Dejargonizer model by Louisguitton"
        },
        {
            id: 76,
            alias: "magician",
            name: "hub/magician:latest",
            description: "The latest version of the Magician model"
        },
        {
            id: 77,
            alias: "mario",
            name: "hub/mario:latest",
            description: "The latest version of the Mario model"
        },
        {
            id: 78,
            alias: "math-teacher",
            name: "hub/math-teacher:latest",
            description: "The latest version of the Math Teacher model"
        },
        {
            id: 79,
            alias: "js-test",
            name: "hub/matteo/js-assistant-test:latest",
            description: "The latest version of the JS Assistant Test model by Matteo"
        },
        {
            id: 80,
            alias: "mental-health",
            name: "hub/mental-health-adviser:latest",
            description: "The latest version of the Mental Health Adviser model"
        },
        {
            id: 81,
            alias: "Midjourney-prompt",
            name: "hub/midjourney-prompt-generator:latest",
            description: "The latest version of the Midjourney Prompt Generator model"
        },
        {
            id: 82,
            alias: "stable-prompt",
            name: "hub/mlemasters2012/stable-diffusion-prompt:latest",
            description: "The latest version of the Stable Diffusion Prompt model by Mlemasters2012"
        },
        {
            id: 83,
            alias: "motivational-coach",
            name: "hub/motivational-coach:latest",
            description: "The latest version of the Motivational Coach model"
        },
        {
            id: 84,
            alias: "motivational-speaker",
            name: "hub/motivational-speaker:latest",
            description: "The latest version of the Motivational Speaker model"
        },
        {
            id: 85,
            alias: "bakllava",
            name: "hub/neuromorph1c/bakllava:latest",
            description: "The latest version of the Bakllava model by Neuromorph1c"
        },
        {
            id: 86,
            alias: "cortana",
            name: "hub/newjoker/cortana:latest",
            description: "The latest version of the Cortana model by Newjoker"
        },
        {
            id: 87,
            alias: "the-good",
            name: "hub/nicluckie/the-good-doctor:latest",
            description: "The latest version of the Good Doctor model by Nicluckie"
        },
        {
            id: 88,
            alias: "novelist",
            name: "hub/novelist:latest",
            description: "The latest version of the Novelist model"
        },
        {
            id: 89,
            alias: "personal-trainer",
            name: "hub/personal-trainer:latest",
            description: "The latest version of the Personal Trainer model"
        },
        {
            id: 90,
            alias: "pet-behaviorist",
            name: "hub/pet-behaviorist:latest",
            description: "The latest version of the Pet Behaviorist model"
        },
        {
            id: 91,
            alias: "philosopher",
            name: "hub/philosopher:latest",
            description: "The latest version of the Philosopher model"
        },
        {
            id: 92,
            alias: "philosophy-teacher",
            name: "hub/philosophy-teacher:latest",
            description: "The latest version of the Philosophy Teacher model"
        },
        {
            id: 93,
            alias: "plagiarism-checker",
            name: "hub/plagiarism-checker:latest",
            description: "The latest version of the Plagiarism Checker model"
        },
        {
            id: 94,
            alias: "poet",
            name: "hub/poet:latest",
            description: "The latest version of the Poet model"
        },
        {
            id: 95,
            alias: "rapper",
            name: "hub/rapper:latest",
            description: "The latest version of the Rapper model"
        },
        {
            id: 96,
            alias: "real-estate",
            name: "hub/real-estate-agent:latest",
            description: "The latest version of the Real Estate Agent model"
        },
        {
            id: 97,
            alias: "recipe-maker",
            name: "hub/recipe-maker:latest",
            description: "The latest version of the Recipe Maker model"
        },
        {
            id: 98,
            alias: "recruiter",
            name: "hub/recruiter:latest",
            description: "The latest version of the Recruiter model"
        },
        {
            id: 99,
            alias: "relationship-coach",
            name: "hub/relationship-coach:latest",
            description: "The latest version of the Relationship Coach model"
        },
        {
            id: 100,
            alias: "ry4n",
            name: "hub/ry4not4/ry4n:latest",
            description: "The latest version of the Ry4n model by Ry4not4"
        },
        {
            id: 101,
            alias: "adam-genius",
            name: "hub/sagist/adam-musical-genius:latest",
            description: "The latest version of the Adam Musical Genius model by Sagist"
        },
        {
            id: 102,
            alias: "screenwriter",
            name: "hub/screenwriter:latest",
            description: "The latest version of the Screenwriter model"
        },
        {
            id: 103,
            alias: "lao-tzu",
            name: "hub/spooknik/lao-tzu:latest",
            description: "The latest version of the Lao-Tzu model by Spooknik"
        },
        {
            id: 104,
            alias: "raw-writer",
            name: "hub/sramelyk/raw-lyrics-writer:latest",
            description: "The latest version of the Raw Lyrics Writer model by Sramelyk"
        },
        {
            id: 105,
            alias: "stand-up",
            name: "hub/stand-up-comedian:latest",
            description: "The latest version of the Stand-Up Comedian model"
        },
        {
            id: 106,
            alias: "storyteller",
            name: "hub/storyteller:latest",
            description: "The latest version of the Storyteller model"
        },
        {
            id: 107,
            alias: "website-to-text",
            name: "hub/stroben/websitescreenshot_to_text:latest",
            description: "The latest version of the Websitescreenshot to Text model by Stroben"
        },
        {
            id: 108,
            alias: "ten-tweets",
            name: "hub/ten-tweets:latest",
            description: "The latest version of the Ten Tweets model"
        },
        {
            id: 109,
            alias: "jungian-dream",
            name: "hub/theory/jungian-dream-interpreter:latest",
            description: "The latest version of the Jungian Dream Interpreter model by Theory"
        },
        {
            id: 110,
            alias: "expert-dave",
            name: "hub/threadabort/expert-old-man-dave:latest",
            description: "The latest version of the Expert Old Man Dave model by Threadabort"
        },
        {
            id: 111,
            alias: "travel-guide",
            name: "hub/travel-guide:latest",
            description: "The latest version of the Travel Guide model"
        },
        {
            id: 112,
            alias: "chatgpt-4",
            name: "hub/uaquax/chatgpt-4-uncensored:latest",
            description: "The latest version of the ChatGPT-4 Uncensored model by Uaquax"
        },
        {
            id: 113,
            alias: "enhancer",
            name: "hub/uaquax/enhancer:latest",
            description: "The latest version of the Enhancer model by Uaquax"
        },
        {
            id: 114,
            alias: "sd-expert",
            name: "hub/unkillable/sdexpert:latest",
            description: "The latest version of the SDExpert model by Unkillable"
        },
        {
            id: 115,
            alias: "uxui",
            name: "hub/uxui-developer:latest",
            description: "The latest version of the UX/UI Developer model"
        },
        {
            id: 116,
            alias: "cro-expert",
            name: "hub/warlax/cro-expert:latest",
            description: "The latest version of the CRO Expert model by Warlax"
        },
        {
            id: 117,
            alias: "web-design",
            name: "hub/web-design-consultant:latest",
            description: "The latest version of the Web Design Consultant model"
        },
        {
            id: 118,
            alias: "william-shakespeare",
            name: "hub/william-shakespeare:latest",
            description: "The latest version of the William Shakespeare model"
        },
        {
            id: 119,
            alias: "nba-expert",
            name: "hub/williamhill/nba-expert:latest",
            description: "The latest version of the NBA Expert model by Williamhill"
        },
        {
            id: 120,
            alias: "trash-talker",
            name: "hub/wygocuxyco/trash_talker:latest",
            description: "The latest version of the Trash Talker model by Wygocuxyco"
        },
        {
            id: 121,
            alias: "whiterabbit",
            name: "jimscard/whiterabbit-neo:latest",
            description: "The latest version of the Whiterabbit-Neo model by Jimscard"
        },
        {
            id: 122,
            alias: "llama2",
            name: "llama2:latest",
            description: "The latest version of the Llama2 model"
        },
        {
            id: 123,
            alias: "llama3",
            name: "llama3:latest",
            description: "The latest version of the Llama3 model"
        },
        {
            id: 124,
            alias: "llava-13b-q8",
            name: "llava:13b-v1.5-q8_0",
            description: "The 13-billion parameter version 1.5 model with Q8_0 settings"
        },
        {
            id: 125,
            alias: "llava-13b",
            name: "llava:13b",
            description: "The 13-billion parameter version 1.5 model"
        },
        {
            id: 126,
            alias: "medllama2",
            name: "medllama2:latest",
            description: "The latest version of the Medllama2 model"
        },
        {
            id: 127,
            alias: "mistral",
            name: "mistral:latest",
            description: "The latest version of the Mistral model"
        },
        {
            id: 128,
            alias: "nous-hermes",
            name: "nous-hermes:latest",
            description: "The latest version of the Nous Hermes model"
        },
        {
            id: 129,
            alias: "openchat",
            name: "openchat:latest",
            description: "The latest version of the Openchat model"
        },
        {
            id: 130,
            alias: "openhermes",
            name: "openhermes:latest",
            description: "The latest version of the Openhermes model"
        },
        {
            id: 131,
            alias: "openhermes2.5-mistral-7b-q4_K_M",
            name: "openhermes2.5-mistral:7b-q4_K_M",
            description: "A 7-billion parameter model with version 2.5 and Q4_K_M settings"
        },
        {
            id: 132,
            alias: "openhermes2.5-mistral",
            name: "openhermes2.5-mistral:latest",
            description: "The latest version of the Openhermes model with version 2.5 and Mistral settings"
        },
        {
            id: 133,
            alias: "orca-mini",
            name: "orca-mini:latest",
            description: "The latest version of the Orca Mini model"
        },
        {
            id: 134,
            alias: "phi",
            name: "phi:latest",
            description: "The latest version of the Phi model"
        },
        {
            id: 135,
            alias: "phi3",
            name: "phi3:latest",
            description: "The latest version of the Phi3 model"
        },
        {
            id: 136,
            alias: "samantha-mistral",
            name: "samantha-mistral:latest",
            description: "The latest version of the Samantha Mistral model"
        },
        {
            id: 137,
            alias: "stablelm2",
            name: "stablelm2:latest",
            description: "The latest version of the StableLM2 model"
        },
        {
            id: 138,
            alias: "starling-lm-7b-q5_K_M",
            name: "starling-lm:7b-alpha-q5_K_M",
            description: "A 7-billion parameter model with alpha settings and Q5_K_M settings"
        },
        {
            id: 139,
            alias: "starling-lm",
            name: "starling-lm:latest",
            description: "The latest version of the Starling LM model"
        },
        {
            id: 140,
            alias: "tinyllama",
            name: "tinyllama:latest",
            description: "The latest version of the Tiny Llama model"
        },
        {
            id: 141,
            alias: "wizard-math",
            name: "wizard-math:latest",
            description: "The latest version of the Wizard Math model"
        },
        {
            id: 142,
            alias: "wizard-vicuna-7b",
            name: "wizard-vicuna-uncensored:7b",
            description: "A 7-billion parameter model with uncensored settings"
        },
        {
            id: 143,
            alias: "wizard-vicuna",
            name: "wizard-vicuna-uncensored:latest",
            description: "The latest version of the Wizard Vicuna Uncensored model"
        },
        {
            id: 144,
            alias: "zephyr",
            name: "zephyr:latest",
            description: "The latest version of the Zephyr model"
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

    static getModelsListJson(): string[] {
        const outputs = [];
        for (const model of OllamaPlugin.Models) {
            outputs.push(JSON.stringify(model, null, 2));
        }

        return outputs;
    }
}
