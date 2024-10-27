
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            environment: "dev" | "prod";
            appId: string;
            botToken: string;
            guildIds: string;
            inviteUrl: string;
            CS2_RCON_PASS_192_168_1_128_27015:string;
            CS2_RCON_PASS_192_168_1_128_27016:string;
            DB_CONN_STRING:string,
            DB_NAME:string,
        }
    }
}

export {};