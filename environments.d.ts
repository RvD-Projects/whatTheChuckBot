
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            environment: "dev" | "prod";
            appId: string;
            botToken: string;
            guildIds: string;
            inviteUrl: string;
            DB_CONN_STRING:string,
            DB_NAME:string,
        }
    }
}

export {};