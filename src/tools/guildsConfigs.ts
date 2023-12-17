import { env } from "process";

export const guildsConfigs = [
    {
        //Defaults
        guildId: "default",
        welcome: {
            channelId: null,
            card: {
                getTitle: () => "Welcome !!!",
                getMsg: (params: any) => "We are glad to have you here!"
            },
            getContent: (params: any) => `🤖  Greetings <@${params.member.id}> ! ⚡👾`
        },
        goodbye: {
            channelId: null,
            card: {
                getTitle: () => "Bye bye",
                getMsg: () => "We'll miss him / her!"
            },
            getContent: (params: any) => `🤖  Say goodbye to <@${params.member.id}> ! 😢👾`
        }
    },
    {
        // RaFuX
        guildId: "276931890735218689",
        welcome: {
            channelId: null,
            card: {
                getTitle: () => "Welcome !!!",
                getMsg: (params: any) => "We are glad to have you here!"
            },
            getContent: (params: any) => `🤖  Greetings <@${params.member.id}> ! ⚡👾`
        },
        goodbye: {
            channelId: null,
            card: {
                getTitle: () => "Bye bye",
                getMsg: () => "We'll miss him / her!"
            },
            getContent: (params: any) => `🤖  Say goodbye to <@${params.member.id}> ! 😢👾`
        },
        cs2RconChannels: {
            "1185347837026914304": {
                port: 27016,
                ip: "rvdprojects.synology.me",
                password: env["RCON_PASS_192_168_1_128_27016"],
                region: "US_EAST",
            },
            "1185593961541275698": {
                dev:true,
                port: 27016,
                ip: "rvdprojects.synology.me",
                password: env["RCON_PASS_192_168_1_128_27016"],
                region: "US_EAST",
            }
        },
        cs2ChatChannels: {
            "1185991869121957938": {
                port: 27016,
                ip: "rvdprojects.synology.me",
                password: env["RCON_PASS_192_168_1_128_27016"],
                region: "US_EAST",
            },
            "1185983351325200444": {
                dev:true,
                port: 27016,
                ip: "rvdprojects.synology.me",
                password: env["RCON_PASS_192_168_1_128_27016"],
                region: "US_EAST",
            }
        }
    },
    {
        //TempCity
        guildId: "770057600867237898",
        welcome: {
            channelId: "1088581487470850140",
            getContent: (params: any) => {
                return `🖥️ 🤖  Greetings <@${params.member.id}> ! ⚡  Contact <@258071819108614144> if you need any help needed !👾  🖥️\n
        - Informations et channel Français plus bas -  Contactez <@258071819108614144>  au besoin !
        - Información y canal Espanol mas abajo - ¡ Contacte a <@312456737070252034> si es necesario !`;
            }
        },
        goodbye: {
            channelId: "1086738313689440276",
            getContent: (params: any) => {
                return `🖥️ 🤖  Goodbye <@${params.member.id}>! We'll miss you, not right now, but probably later!!! ⚡ 🖥️\n\n`;
            }
        }
    },
    {
        //CS2-CustomMaps
        guildId: "1166437263543128144",
        welcome: {
            channelId: "1166437265501847584",
            getContent: (params: any) => {
                return `🖥️ 🤖  Greetings <@${params.member.id}> ! ⚡  Welcome to CS2-CustomsMaps's Discord! You'll find Custom Maps and Custom CS2 Servers over here! GLHF!👾  🖥️\n`;
            }
        },
        goodbye: {
            channelId: "1166585676297412658",
            card: {
                getTitle: () => "Bye bye",
                getMsg: () => "We'll miss him / her!"
            },
            getContent: (params: any) => {
                return `🖥️ 🤖  Goodbye <@${params.member.id}>! We'll miss you, not right now, but probably later!!! ⚡ 🖥️\n\n`;
            }
        },
        cs2RconChannels: {
            "1185404438412808313": {
                port: 27016,
                ip: "rvdprojects.synology.me",
                password: env["RCON_PASS_192_168_1_128_27016"],
                region: "US_EAST",
            }
        },
        cs2ChatChannels: {
            "1185992702928621630": {
                port: 27016,
                ip: "rvdprojects.synology.me",
                password: env["RCON_PASS_192_168_1_128_27016"],
                region: "US_EAST",
            }
        }
    }
];

export function getGuildConfigsById(guildId: string) {
    const found = guildsConfigs.find((config) => {
        return config.guildId === guildId;
    });

    return found;
}
