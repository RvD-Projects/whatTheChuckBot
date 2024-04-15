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
            channelId: "1086738313689440276",
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
            channelId: "1166585676297412658",
            card: {
                getTitle: () => "Bye bye",
                getMsg: () => "We'll miss him / her!"
            },
            getContent: (params: any) => {
                return `🖥️ 🤖  Goodbye <@${params.member.id}>! We'll miss you, not right now, but probably later!!! ⚡ 🖥️\n\n`;
            }
        },
        cs2: {
            dockerAccess: ["trusted player"],
            rconChannels: {
                "1185404438412808313": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                },
                "1203080698710196324": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                    cmdWhitelist: ['map', 'exec', 'sv_gravity', 'host_workshop_map', 'bot_kick']
                },
                "1202829534144237619": {
                    port: 27017,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                },
                "1203080769019584562": {
                    port: 27017,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                    cmdWhitelist: ['map', 'exec', 'sv_gravity', 'host_workshop_map', 'bot_kick']
                }
            },
            chatChannels: {
                "1185992702928621630": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                }
            }
        },
    },
    //RC-505
    {
        guildId: "1197480594284756993",
        goodbye: {
            channelId: "1197687123373990038",
        }
    },
    {
        // StillNoCake
        guildId: "1211321545109012561",
        cs2: {
            dockerAccess: ["trusted player"],
            rconChannels: {
                "1229538317834387486": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                },
                "1229538699063066634": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                    cmdWhitelist: ['map', 'exec', 'sv_gravity', 'host_workshop_map', 'bot_kick']
                },
                "": {
                    port: 27017,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                },
                "": {
                    port: 27017,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                    cmdWhitelist: ['map', 'exec', 'sv_gravity', 'host_workshop_map', 'bot_kick']
                }
            },
            chatChannels: {
                "1185992702928621630": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                }
            }
        }
    //pankunai
        cs2: {
            dockerAccess: ["✧ admin ꒷M", "✧ Owner ꒷],
            rconChannels: {
                "1229538317834387486": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                },
                "1229538699063066634": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                    cmdWhitelist: ['map', 'exec', 'sv_gravity', 'host_workshop_map', 'bot_kick']
                },
                "": {
                    port: 27017,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                },
                "": {
                    port: 27017,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                    cmdWhitelist: ['map', 'exec', 'sv_gravity', 'host_workshop_map', 'bot_kick']
                }
            },
            chatChannels: {
                "": {
                    port: 27016,
                    ip: "rvdprojects.synology.me",
                    password: env["RCON_PASS_192_168_1_128_27016"],
                    region: "US_EAST",
                }
            }
    }
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
