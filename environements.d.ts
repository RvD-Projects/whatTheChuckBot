
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildIds: string;
            inviteUrl: string;
            mongoUrl: string;
            welcomeChannel:string;
            enviroment: "dev" | "prod" | "debug";
        }
    }
}

export {};