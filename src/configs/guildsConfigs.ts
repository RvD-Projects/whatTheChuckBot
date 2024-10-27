import { GuildMember } from "discord.js";
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
            getContent: (params: any) => `🤖  Greetings <@${params.member.id}>! ⚡👾`
        },
        goodbye: {
            channelId: null,
            card: {
                getTitle: () => "Bye bye",
                getMsg: (params: any) => "We'll miss him / her!"
            },
            getContent: (params: any) => `🤖  Say goodbye to <@${params.member.id}>! 😢👾`
        },
        boost: {
            channelId: null,
            card: {
                getTitle: () => "New Boost !!!",
                getMsg: (params: any) => "Thank you for the support!"
            },
            getContent: (params: any) => `🤖 Big thanks to <@${params.member.id}> for boosting the server! ⚡👾`
        },
        cs2: {
            dockerAccess: ['cs2Admin'],
            rconChannels: [],
            chatChannels: [],
        },
        ollama: {
            url: "https://api.ctrlaidel.com/api"
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
        cs2: {
            dockerAccess: ['cs2Admin'],
            rconChannels: {
                "1185347837026914304": {
                    region: "US_EAST",
                    ip: env["CS2_IP_SWT"],
                    port: env["CS2_RCON_PORT_SWT"],
                    password: env["CS2_RCON_PASS_SWT"],
                },
            },
            chatChannels: {
                "1185991869121957938": {
                    region: "US_EAST",
                    ip: env["CS2_IP_SWT"],
                    port: env["CS2_RCON_PORT_SWT"],
                    password: env["CS2_RCON_PASS_SWT"],
                }
            },
        }
    },
    {
        //TempCity
        guildId: "770057600867237898",
        welcome: {
            channelId: "1088581487470850140",
            getContent: (params: any) => {
                return `🖥️ 🤖  Greetings <@${params.member.id}> ! ⚡  Contact <@258071819108614144> or <@691686714976239726> if you need any help!👾  🖥️\n
        - Informations et channel Français plus bas -  Contactez <@258071819108614144> ou <@691686714976239726> au besoin !`;
            }
        },
        goodbye: {
            channelId: "1234280957192835092",
            getContent: (params: any) => {
                return `🖥️ 🤖  Goodbye <@${params.member.id}>! We'll miss you, not right now, but probably later!!! ⚡ 🖥️\n\n`;
            }
        }
    },
    {
        //Smoking_Volcano
        guildId: "1166437263543128144",
        welcome: {
            channelId: "1166437265501847584",
            getContent: (params: any) => {
                return `🌋 🔥 Greetings <@${params.member.id}>! 🌋 Welcome to S_Smoking V_Volcano's Discord! Here, you'll dive into a volcanic mix of gaming, from Palworld to Minecraft, CS2, and beyond, as we explore different games from time to time! Dive into the lava of gaming and have a blast! 🔥 GLHF! 🎮\n`;
            }
        },
        goodbye: {
            channelId: "1234281655393452093",
            card: {
                getTitle: () => "Bye bye",
                getMsg: () => "We'll miss him / her!"
            },
            getContent: (params: any) => {
                return `🖥️ 🤖  Goodbye <@${params.member.id}>! We'll miss you, not right now, but probably later!!! ⚡ 🖥️\n\n`;
            }
        },
    },
    {
        // StillNoCake
        guildId: "1202439418204389417",
    },
    {
        // Pankunai
        guildId: "1211321545109012561",
        welcome: {
            channelId: "1211321545226588209",
            card: {
                getTitle: () => "Bienvenue !!!",
                getMsg: (params: any) => "Merci de nous avoir rejoints !"
            },
            getContent: (params: any) => `🤖  Bienvenue <@${params.member.id}> ! ⚡👾`
        },
        goodbye: {
            channelId: "000000000000000"
        }
    },
    {
        // RevolutionCraft
        guildId: "1233759327110565968",
        welcome: {
            card: {
                getTitle: () => "Bienvenue !!",
                getMsg: (params: any) => "Trop content de t'accueillir!"
            },
            channelId: "1233759327614013451",
            getContent: (params: any) => {
                return `🖥️ 🤖  Salutation <@${params.member.id}> ! ⚡ Bienvenue sur RevolutionCraft. Notre I.P. est: revocraft.org  🖥️! \n\n Pour toutes questions, rejoindre <@258071819108614144> ou <@691686714976239726> en dm par ping! 👾👾 🖥️`;
            }
        },
        goodbye: {
            channelId: "1233906597743427684",
            getContent: (params: any) => {
                return `🖥️ 🤖  Goodbye <@${params.member.id}>! On va s'ennuyer, peut-être pas tout de suite, mais plus tard j'en suis sur!!! ⚡ 🖥️\n\n`;
            }
        }
    },
    {
        //FC / FreakingClowning
        guildId: "984305093010673684",
        welcome: {
            channelId: 984330000893345802,
            card: {
                getTitle: () => "Welcome !!!",
                getMsg: (params: any) => "We are glad to have you here!"
            },
            getContent: (params: any) => `🤖  Greetings <@${params.member.id}> ! ⚡👾`
        },
        goodbye: {
            channelId: "1237543989360463972",
            card: {
                getTitle: () => "Bye bye",
                getMsg: () => "We'll miss him / her!"
            },
            getContent: (params: any) => `🤖  Say goodbye to <@${params.member.id}> ! 😢👾`
        }
    },
    {
        //CtrlAiDel
        guildId: "1200447572322549850",
        welcome: {
            channelId: "1200447573685706945",
            card: {
                getTitle: () => "Welcome !!!",
                getMsg: (params: any) => "We are glad to have you here!"
            },
            getContent: (params: any) => `🤖  Greetings <@${params.member.id}> ! ⚡👾`
        },
        goodbye: {
            channelId: "1237581020144992337",
            card: {
                getTitle: () => "Bye bye",
                getMsg: () => "We'll miss him / her!"
            },
            getContent: (params: any) => `🤖  Say goodbye to <@${params.member.id}> ! 😢👾`
        }
    },
];

export function getDefaultConfigs() {
    return getGuildConfigsById('default');
}

export function getGuildConfigsById(guildId: string) {
    const def = guildId !== "default" ? getDefaultConfigs() : {};
    const found = guildsConfigs.find((config) => {
        return config.guildId === guildId;
    });

    return Object.assign(def, found ?? {});
}

export function hasCs2DockerAccess(member: GuildMember) {
    const guildId = member.guild.id;
    const config = guildsConfigs.find((config) => {
        return config.guildId === guildId && config.cs2;
    });

    if (!config) {
        return null;
    }

    if (member.guild.ownerId === member.id) {
        return true;
    }

    const accesses: String[] = config.cs2?.dockerAccess;
    if (!accesses?.length) {
        return false;
    }

    for (const role of member.roles.cache.values()) {
        const name: string = role.name.toLowerCase();
        if (accesses.includes(name)) {
            return true;
        }
    }

    return false;
}
