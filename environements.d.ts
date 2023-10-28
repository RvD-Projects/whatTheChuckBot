
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildIds: string;
            inviteUrl: string;
            environment: "dev" | "prod";
        }
    }
}

export {};