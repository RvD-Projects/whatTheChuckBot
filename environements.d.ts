
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildIds: string;
            inviteUrl: string;
            mongoUrl: string;
            mongoDevUrl: string;
            welcomeChannel:string;
            enviroment: "dev" | "prod" ;
        }
    }
}

export {};