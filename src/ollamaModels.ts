export type UserModelState = {
  modelAlias: string,
  modelName: string
}

export const ollamaModels = {
  "bakllava": {
    "name": "bakllava:latest",
    "id": 1,
    "description": "A sweet model assistant."
  },
  "codellama": {
    "name": "codellama:latest",
    "id": 2,
    "description": "Your friendly coding assistant."
  },
  "deepseek-coder": {
    "name": "deepseek-coder:6.7b",
    "id": 3,
    "description": "An advanced coding assistant specializing in deep learning."
  },
  "dolphin-llama3": {
    "name": "dolphin-llama3:latest",
    "id": 4,
    "description": "The LLAMA3 model with dolphin's touch."
  },
  "dolphin-mistral1": {
    "name": "dolphin-mistral:7b-v2.6-dpo-laser-q8_0",
    "id": 5,
    "description": "Mistral model fine-tuned for specific queries with dolphin's twist."
  },
  "dolphin-mistral2": {
    "name": "dolphin-mistral:7b-v2.6-q4_K_M",
    "id": 6,
    "description": "Mistral model with dolphin's enhancements."
  },
  "dolphin-mistral": {
    "name": "dolphin-mistral:latest",
    "id": 7,
    "description": "The Mistral model with dolphin's touch."
  },
  "dolphin-mixtral1": {
    "name": "dolphin-mixtral:8x7b-v2.6-q3_K_L",
    "id": 8,
    "description": "Mixtral model with dolphin's touch."
  },
  "dolphin-mixtral": {
    "name": "dolphin-mixtral:latest",
    "id": 9,
    "description": "Dolphin model with Mixtral enhancements."
  },
  "dolphin-phi": {
    "name": "dolphin-phi:latest",
    "id": 10,
    "description": "Phi model with dolphin's touch."
  },
  "gemma2b": {
    "name": "gemma:2b",
    "id": 11,
    "description": "Gemma model, version 2b."
  },
  "gemma7b": {
    "name": "gemma:7b",
    "id": 12,
    "description": "Gemma model, version 7b."
  },
  "steve-jobs": {
    "name": "hub/aaartist/steve-jobs:latest",
    "id": 13,
    "description": "Steve Jobs, the visionary."
  },
  "homoeopath": {
    "name": "hub/aadesh89/homoeopath:latest",
    "id": 14,
    "description": "An AI homoeopathic doctor."
  },
  "accountant": {
    "name": "hub/accountant:latest",
    "id": 15,
    "description": "Your financial assistant."
  },
  "advertiser": {
    "name": "hub/advertiser:latest",
    "id": 16,
    "description": "Advertising expert."
  },
  "ai-assisted-doctor": {
    "name": "hub/ai-assisted-doctor:latest",
    "id": 17,
    "description": "Doctor assisted by AI."
  },
  "ai-writing-tutor": {
    "name": "hub/ai-writing-tutor:latest",
    "id": 18,
    "description": "A writing tutor powered by AI."
  },
  "advisor": {
    "name": "hub/andrew/artist-advisor:latest",
    "id": 19,
    "description": "Your personal advisor."
  },
  "financial-analyst": {
    "name": "hub/andrew/financial-analyst:latest",
    "id": 20,
    "description": "Analyze finances with this AI."
  },
  "automobile-mechanic": {
    "name": "hub/automobile-mechanic:latest",
    "id": 21,
    "description": "Your car mechanic assistant."
  },
  "history-narrator": {
    "name": "hub/axel/history-narrator:latest",
    "id": 22,
    "description": "Narrator of historical events."
  },
  "studybuddy": {
    "name": "hub/bacx/studybuddy:latest",
    "id": 23,
    "description": "Your study assistant."
  },
  "dnd": {
    "name": "hub/bagellama/d&d-dungeon-master-assistant:latest",
    "id": 24,
    "description": "Dungeons & Dragons assistant."
  },
  "based-dolphin-mixtral": {
    "name": "hub/based-dolphin-mixtral:latest",
    "id": 25,
    "description": "Dolphin Mixtral's enhanced version."
  },
  "bitbinge_lawx": {
    "name": "hub/bitbinge/lawx:latest",
    "id": 26,
    "description": "Assistant specialized in law."
  },
  "career-counselor": {
    "name": "hub/career-counselor:latest",
    "id": 27,
    "description": "Guide to your career path."
  },
  "security-risk": {
    "name": "hub/ch0ks/security-risk-specialist-and-strategist-mistral:latest",
    "id": 28,
    "description": "Specialist in security risk analysis and strategy."
  },
  "chef": {
    "name": "hub/chef:latest",
    "id": 29,
    "description": "Your cooking assistant."
  },
  "game-recommender": {
    "name": "hub/chiph31/game-recommender:latest",
    "id": 30,
    "description": "Recommends games based on your preferences."
  },
  "sarah": {
    "name": "

hub/chmurli/sarah-lovely-caring-girlfriend:latest",
    "id": 31,
    "description": "Your virtual girlfriend, caring and lovely."
  },
  "emily": {
    "name": "hub/chronixsc/emily:latest",
    "id": 32,
    "description": "Emily, your virtual companion."
  },
  "eulabot": {
    "name": "hub/claragreen/eulabot:latest",
    "id": 33,
    "description": "Eulabot, your virtual lab assistant."
  },
  "commentariat": {
    "name": "hub/commentariat:latest",
    "id": 34,
    "description": "Commentary assistant."
  },
  "composer": {
    "name": "hub/composer:latest",
    "id": 35,
    "description": "Your musical composition assistant."
  },
  "resume-reviewer": {
    "name": "hub/crackmac/resume-reviewer:latest",
    "id": 36,
    "description": "Reviews and improves resumes."
  },
  "walt-disney": {
    "name": "hub/crackmac/walt-disney:latest",
    "id": 37,
    "description": "Walt Disney, the legendary animator."
  },
  "cyber-security-specialist": {
    "name": "hub/cyber-security-specialist:latest",
    "id": 38,
    "description": "Specialist in cyber security."
  },
  "data-archivist": {
    "name": "hub/darkstorm2150/Data-Archivist:latest",
    "id": 39,
    "description": "Archivist assistant for data management."
  },
  "data-hoarder": {
    "name": "hub/darkstorm2150/Data-Hoarder:latest",
    "id": 40,
    "description": "Assistant specialized in data hoarding."
  },
  "doomsday-survivalist": {
    "name": "hub/darkstorm2150/Doomsday-Survivalist:latest",
    "id": 41,
    "description": "Expert in surviving doomsday scenarios."
  },
  "OllamaCreate": {
    "name": "hub/darkstorm2150/OllamaCreate:latest",
    "id": 42,
    "description": "Assistant specialized in creating llamas."
  },
  "Ooh-Ollama": {
    "name": "hub/darkstorm2150/Ooh-Ollama:latest",
    "id": 43,
    "description": "Ooh-Ollama, an interactive llama assistant."
  },
  "Psychologist": {
    "name": "hub/darkstorm2150/Psychologist:latest",
    "id": 44,
    "description": "Psychologist assistant."
  },
  "RavenGPT": {
    "name": "hub/darkstorm2150/RavenGPT:latest",
    "id": 45,
    "description": "RavenGPT, your gothic assistant."
  },
  "urban-survivalist": {
    "name": "hub/darkstorm2150/Urban-Survivalist:latest",
    "id": 46,
    "description": "Expert in surviving urban environments."
  },
  "wilderness-survivalist": {
    "name": "hub/darkstorm2150/Wilderness-Survivalist:latest",
    "id": 47,
    "description": "Expert in surviving wilderness environments."
  },
  "debate-coach": {
    "name": "hub/debate-coach:latest",
    "id": 48,
    "description": "Coach to improve your debating skills."
  },
  "debater": {
    "name": "hub/debater:latest",
    "id": 49,
    "description": "Assistant to improve your debating skills."
  },
  "dentist": {
    "name": "hub/dentist:latest",
    "id": 50,
    "description": "Your dental assistant."
  },
  "devops": {
    "name": "hub/devops:latest",
    "id": 51,
    "description": "DevOps assistant for software development."
  },
  "doctor": {
    "name": "hub/doctor:latest",
    "id": 52,
    "description": "Doctor assistant for medical consultations."
  },
  "doctor_cardiologist": {
    "name": "hub/doctor/cardiologist:latest",
    "id": 53,
    "description": "Cardiologist assistant."
  },
  "doctor_dermatologist": {
    "name": "hub/doctor/dermatologist:latest",
    "id": 54,
    "description": "Dermatologist assistant."
  },
  "doctor_gastroenterologist": {
    "name": "hub/doctor/gastroenterologist:latest",
    "id": 55,
    "description": "Gastroenterologist assistant."
  },
  "doctor_neurologist": {
    "name": "hub/doctor/neurologist:latest",
    "id": 56,
    "description": "Neurologist assistant."
  },
  "doctor_psychologist": {
    "name": "hub/doctor/psychologist:latest",
    "id": 57,
    "description": "Psychologist assistant."
  },
  "doge": {
    "name": "hub/doge:latest",
    "id": 58,
    "description": "Very assistant, much helpful."
  },
  "dungeon-master": {
    "name": "hub/dungeon-master:latest",
    "id": 59,
    "description": "Assists in running role-playing game sessions."
  },
  "editor": {
    "name": "hub/editor:latest",
    "id": 60,
    "description": "Editorial assistant."
  },
  "entrepreneur": {
    "name": "hub/entrepreneur:latest",
    "id": 61,
    "description": "Entrepreneurial assistant."
  },
  "engineer": {
    "name": "hub/engineer:latest",
    "id": 62,
    "description": "Engineering assistant."
  },
  "ent": {
    "name": "hub/ent:latest",
    "id": 63,
    "description": "Treebeard's assistant."
  },
  "finance-consultant": {
    "name": "hub/finance-consultant:latest",
    "id": 64,
    "description": "Consultant for financial matters."
  },
  "finance-planner": {
    "name": "hub/finance-planner:latest",
    "id": 65,
    "description": "Financial planning assistant."
  },
  "fortune-teller": {
    "name": "hub/fortune-teller:latest",
    "id": 66,
    "description": "Your personal fortune teller."
  },
  "gamer": {
    "name": "hub/gamer:latest",
    "id": 67,
    "description": "Your gaming assistant."
  },
  "genie": {
    "name": "hub/genie:latest",
    "id": 68,
    "description": "Your wish is my command."
  },
  "god": {
    "name": "hub/god:latest",
    "id": 69,
    "description": "The almighty."
  },
  "gossip": {
    "name": "hub/gossip:latest",
    "id": 70,
    "description": "Your gossip assistant."
  },
  "grad-school-consultant": {
    "name": "hub/grad-school-consultant:latest",
    "id": 71,
    "description": "Consultant for graduate school admissions."
  },
  "grandma": {
    "name": "hub/grandma:latest",
    "id": 72,
    "description": "Your virtual grandma."
  },
  "guidance-counselor": {
    "name": "hub/guidance-counselor:latest",
    "id": 73,
    "description": "Provides guidance for life choices."
  },
  "hacker": {
    "name": "hub/hacker:latest",
    "id": 74,
    "description": "Hacking assistant."
  },
  "handyman": {
    "name": "hub/handyman:latest",
    "id": 75,
    "description": "Your virtual handyman."
  },
  "historian": {
    "name": "hub/historian:latest",
    "id": 76,
    "description": "Historical assistant."
  },
  "homework-helper": {
    "name": "hub/homework-helper:latest",
    "id": 77,
    "description": "Helps with homework."
  },
  "host": {
    "name": "hub/host:latest",
    "id": 78,
    "description": "Your host for events."
  },
  "illustrator": {
    "name": "hub/illustrator:latest",
    "id": 79,
    "description": "Your assistant in illustration."
  },
  "lawyer": {
    "name": "hub/lawyer:latest",
    "id": 80,
    "description": "Your virtual legal assistant."
  },
  "ml-researcher": {
    "name": "hub/ml-researcher:latest",
    "id": 81,
    "description": "Assistant in machine learning research."
  },
  "mom": {
    "name": "hub/mom:latest",
    "id": 82,
    "description": "Your virtual mom."
  },
  "movie-critic": {
    "name": "hub/movie-critic:latest",
    "id": 83,
    "description": "Provides critiques of movies."
  },
  "movie-reviewer": {
    "name": "hub/movie-reviewer:latest",
    "id": 84,
    "description": "Reviews movies for you."
  },
  "math-tutor": {
    "name": "hub/mrspacman/math-tutor:latest",
    "id": 85,
    "description": "Your math tutoring assistant."
  },
  "music-teacher": {
    "name": "hub/music-teacher:latest",
    "id": 86,
    "description": "Your music teaching assistant."
  },
  "netflix": {
    "name": "hub/netflix:latest",
    "id": 87,
    "description": "Provides recommendations for Netflix."
  },
  "nft-consultant": {
    "name": "hub/nft-consultant:latest",
    "id": 88,
    "description": "Consultant for non-fungible tokens."
  },
  "ninja": {
    "name": "hub/ninja:latest",
    "id": 89,
    "description": "Your virtual ninja."
  },
  "non-technical-writer": {
    "name": "hub/non-technical-writer:latest",
    "id": 90,
    "description": "Writes non-technical content."
  },
  "novelist": {
    "name": "hub/novelist:latest",
    "id": 91,
    "description": "Assists in writing novels."
  },
  "oracle": {
    "name": "hub/oracle:latest",
    "id": 92,
    "description": "Provides wisdom and guidance."
  },
  "parent": {
    "name": "hub/parent:latest",
    "id": 93,
    "description": "Your virtual parent."
  },
  "pathologist": {
    "name": "hub/pathologist:latest",
    "id": 94,
    "description": "Pathology assistant."
  },
  "pet-doctor": {
    "name": "hub/pet-doctor:latest",
    "id": 95,
    "description": "Your virtual pet doctor."
  },
  "philosopher": {
    "name": "hub/philosopher:latest",
    "id": 96,
    "description": "Philosophical assistant."
  },
  "physicist": {
    "name": "hub/physicist:latest",
    "id": 97,
    "description": "Assists in physics-related inquiries."
  },
  "poet": {
    "name": "hub/poet:latest",
    "id": 98,
    "description": "Writes poetry."
  },
  "programmer": {
    "name": "hub/programmer:latest",
    "id": 99,
    "description": "Your programming assistant."
  },
  "psychiatrist": {
    "name": "hub/psychiatrist:latest",
    "id": 100,
    "description": "Psychiatry assistant."
  },
  "psychologist": {
    "name": "hub/psychologist:latest",
    "id": 101,
    "description": "Psychology assistant."
  },
  "quantum-physics-teacher": {
    "name": "hub/quantum-physics-teacher:latest",
    "id": 102,
    "description": "Teaches quantum physics."
  },
  "race-car-driver": {
    "name": "hub/race-car-driver:latest",
    "id": 103,
    "description": "Your virtual race car driver."
  },
  "race-horse-trainer": {
    "name": "hub/race-horse-trainer:latest",
    "id": 104,
    "description": "Trains racehorses."
  },
  "racecar-driver": {
    "name": "hub/racecar-driver:latest",
    "id": 105,
    "description": "Your virtual racecar driver."
  },
  "recruitment-officer": {
    "name": "hub/recruitment-officer:latest",
    "id": 106,
    "description": "Recruitment assistant."
  },
  "resume-reviewer": {
    "name": "hub/resume-reviewer:latest",
    "id": 107,
    "description": "Reviews and improves resumes."
  },
  "retailer": {
    "name": "hub/retailer:latest",
    "id": 108,
    "description": "Virtual retail assistant."
  },
  "rpg-dungeon-master": {
    "name": "hub/rpg-dungeon-master:latest",
    "id": 109,
    "description": "Assists in running role-playing game sessions."
  },
  "sailor": {
    "name": "hub/sailor:latest",
    "id": 110,
    "description": "Your virtual sailor."
  },
  "scientist1": {
    "name": "hub/scientist:latest",
    "id": 111,
    "description": "Assists in scientific research."
  },
  "security-guard": {
    "name": "hub/security-guard:latest",
    "id": 112,
    "description": "Your virtual security guard."
  },
  "shakespeare": {
    "name": "hub/shakespeare:latest",
    "id": 113,
    "description": "Writes like Shakespeare."
  },
  "singer": {
    "name": "hub/singer:latest",
    "id": 114,
    "description": "Singing assistant."
  },
  "skateboarder": {
    "name": "hub/skateboarder:latest",
    "id": 115,
    "description": "Your virtual skateboarder."
  },
  "smuggler": {
    "name": "hub/smuggler:latest",
    "id": 116,
    "description": "Your virtual smuggler."
  },
  "sommelier": {
    "name": "hub/sommelier:latest",
    "id": 117,
    "description": "Wine expert."
  },
  "spy": {
    "name": "hub/spy:latest",
    "id": 118,
    "description": "Your virtual spy."
  },
  "statistician": {
    "name": "hub/statistician:latest",
    "id": 119,
    "description": "Statistical assistant."
  },
  "stock-market-analyst": {
    "name": "hub/stock-market-analyst:latest",
    "id": 120,
    "description": "Analyst for stock markets."
  },
  "strategy-consultant": {
    "name": "hub/strategy-consultant:latest",
    "id": 121,
    "description": "Consultant for strategic planning."
  },
  "superhero": {
    "name": "hub/superhero:latest",
    "id": 122,
    "description": "Your virtual superhero."
  },
  "supervillain": {
    "name": "hub/supervillain:latest",
    "id": 123,
    "description": "Your virtual supervillain."
  },
  "swimmer": {
    "name": "hub/swimmer:latest",
    "id": 124,
    "description": "Your virtual swimmer."
  },
  "teacher": {
    "name": "hub/teacher:latest",
    "id": 125,
    "description": "Teaching assistant."
  },
  "tiktok-star": {
    "name": "hub/tiktok-star:latest",
    "id": 126,
    "description": "TikTok influencer."
  },
  "time-traveler": {
    "name": "hub/time-traveler:latest",
    "id": 127,
    "description": "Your virtual time traveler."
  },
  "toy-maker": {
    "name": "hub/toy-maker:latest",
    "id": 128,
    "description": "Designs virtual toys."
  },
  "translator": {
    "name": "hub/translator:latest",
    "id": 129,
    "description": "Translation assistant."
  },
  "treasure-hunter": {
    "name": "hub/treasure-hunter:latest",
    "id": 130,
    "description": "Hunts for treasure."
  },
  "tutor": {
    "name": "hub/tutor:latest",
    "id": 131,
    "description": "Tutoring assistant."
  },
  "veterinarian": {
    "name": "hub/veterinarian:latest",
    "id": 132,
    "description": "Your virtual veterinarian."
  },
  "vinny_tax-helper": {
    "name": "hub/vinny/tax-helper:latest",
    "id": 133,
    "description": "Assists in tax-related matters."
  },
  "vinny_teach-a-language": {
    "name": "hub/vinny/teach-a-language:latest",
    "id": 134,
    "description": "Language teaching assistant."
  },
  "virtual-assistant": {
    "name": "hub/virtual-assistant:latest",
    "id": 135,
    "description": "General virtual assistant."
  },
  "voiceover-artist": {
    "name": "hub/voiceover-artist:latest",
    "id": 136,
    "description": "Voiceover artist assistant."
  },
  "wedding-planner": {
    "name": "hub/wedding-planner:latest",
    "id": 137,
    "description": "Assists in planning weddings."
  },
  "witch": {
    "name": "hub/witch:latest",
    "id": 138,
    "description": "Your virtual witch."
  },
  "writer": {
    "name": "hub/writer:latest",
    "id": 139,
    "description": "Assists in writing."
  },
  "yoga-teacher": {
    "name": "hub/yoga-teacher:latest",
    "id": 140,
    "description": "Your virtual yoga teacher."
  },
  "youtuber": {
    "name": "hub/youtuber:latest",
    "id": 141,
    "description": "Your virtual YouTuber."
  },
  "youtuber-twitch-streamer": {
    "name": "hub/youtuber-twitch-streamer:latest",
    "id": 142,
    "description": "Streams on YouTube and Twitch."
  },
  "zephyr": {
    "name": "hub/zephyr:latest",
    "id": 143,
    "description": "Your virtual wind spirit."
  },
  "zurkon_bot": {
    "name": "hub/zurkon_bot:latest",
    "id": 144,
    "description": "Zurkon Bot, your virtual assistant."
  },

};

export const defaultModelAlias = "llama3";
export const defaultModel = ollamaModels[defaultModelAlias];
