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
            dockerAccess: ['owner', 'admin']
        },
        ollama: {
            url: "http://ctrlaidel.ddns.net:11434/api"
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
            rconChannels: {
                "1185347837026914304": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                },
                "1185593961541275698": {
                    dev: true,
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                }
            },
            chatChannels: {
                "1185991869121957938": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                },
                "1185983351325200444": {
                    dev: true,
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                }
            }
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
        cs2: {
            rconChannels: {
                "1202439558952910871": {
                    port: 27015,
                    ip: "ts.stillnocake.com",
                    password: env["RCON_PASS_STILL_NO_CAKE"],
                    region: "US_EAST",
                }
            },
            chatChannels: {
                "1202440139083882527": {
                    port: 27015,
                    ip: "ts.stillnocake.com",
                    password: env["RCON_PASS_STILL_NO_CAKE"],
                    region: "US_EAST",
                },
            }
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
                return `🖥️ 🤖  Salutation <@${params.member.id}> ! ⚡ Bienvenue sur RevolutionCraft. Pour nous rejoindre, la IP est la suivante: "server-new.minecraft.tumeniaises.ca:25580" \n\n Pour toute question rejoindre WeConnected en dm --> <@258071819108614144> 👾  🖥️`;
            }
        },
        goodbye: {
            channelId: "1233906597743427684",
            getContent: (params: any) => {
                return `🖥️ 🤖  Goodbye <@${params.member.id}>! On va s'ennuyer, peut-être pas tout de suite, mais plus tard j'en suis sur!!! ⚡ 🖥️\n\n`;
            }
        }
    },
];

export function getDefaultConfigs() {
    return getGuildConfigsById('default');
}

export function getGuildConfigsById(guildId: string) {
    const found = guildsConfigs.find((config) => {
        return config.guildId === guildId;
    });

    return found;
}

export function hasCs2DockerAccess(member: GuildMember) {
    const guildId = member.guild.id;
    const config = guildsConfigs.find((config) => {
        return config.guildId === guildId;
    });

    if (!config) {
        console.log("No config found.");
        return null;
    }

    if (member.guild.ownerId === member.id) {
        return true;
    }

    const accesses: String[] = getDefaultConfigs().cs2.dockerAccess
        .concat(config.cs2.dockerAccess ?? []);

    for (const role of member.roles.cache.values()) {
        const name: string = role.name.toLowerCase();
        if (accesses.includes(name)) {
            return true;
        }
    }

    return false;
}
