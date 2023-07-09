
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildIds: string;
            inviteUrl: string;
            welcomeChannel:string;
            environment: "dev" | "prod";
        }
    }
}

export {};