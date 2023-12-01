
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildIds: string;
            inviteUrl: string;
            cs2ManagerId: string
            environment: "dev" | "prod";
        }
    }
}

export {};