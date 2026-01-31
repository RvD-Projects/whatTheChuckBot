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
        // StillNoCake
        guildId: "1202439418204389417",
    },
    {
        // RVÐ-Projects
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
                "1300142162817581116": {
                    region: "US_EAST",
                    ip: env["CS2_IP_SWT"],
                    port: env["CS2_PORT_SWT"],
                    rconPort: env["CS2_RCON_PORT_SWT"],
                    password: env["CS2_RCON_PASS_SWT"],
                },
            },
            chatChannels: {
                "1300142238109794365": {
                    region: "US_EAST",
                    ip: env["CS2_IP_SWT"],
                    port: env["CS2_PORT_SWT"],
                    rconPort: env["CS2_RCON_PORT_SWT"],
                    password: env["CS2_RCON_PASS_SWT"],
                }
            },
        }
    },
    {
        // FC We Live looping
        guildId: "984305093010673684",
        welcome: {
            channelId: "984330000893345802",
            card: {
                getTitle: () => "Bienvenue !!!",
                getMsg: (params: any) => "Très content de t'avoir parmis nous!"
            },
            getContent: (params: any) => `🤖  Salutation <@${params.member.id}> ! ⚡👾`
        },
        goodbye: {
            channelId: "1465001127685914684",
            card: {
                getTitle: () => "Bon débarras!",
                getMsg: () => "On va peut-être s'ennuyer un peu!"
            },
            getContent: (params: any) => `🤖  Dites aurevoir à <@${params.member.id}> ! 😢👾`
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
