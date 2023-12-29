
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildIds: string;
            inviteUrl: string;
            RCON_PASS_192_168_1_128_27015:string;
            RCON_PASS_192_168_1_128_27016:string;
            environment: "dev" | "prod";
        }
    }
}

export {};