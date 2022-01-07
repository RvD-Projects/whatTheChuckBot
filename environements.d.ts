
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildIds: string;
            inviteUrl: string;
            mongoUrl: string;
            mongoDockerUrl: string;
            welcomeChannel:string;
            enviroment: "dev" | "prod" | "docker";
        }
    }
}

export {};