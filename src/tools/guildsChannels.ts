export const guildsChannels = [
    {
        //Defaults
        guildId: "default",
        welcome: {
            channelId: null,
            card: {
                getTitle: () => "Welcome",
                getMsg: (params:any) => "We'll miss him / her!"
            },
            getMsg: (params:any) => `🤖  Greetings <@${params.member.id}> ! ⚡👾`
        },
        goodbye: {
            channelId: null,
            card: {
                getTitle: () => "Bye bye",
                getMsg: () => "We'll miss him / her!"
            },
            getMsg: (params:any) => `🤖  Say goddbye to <@${params.member.id}> ! 😢👾`
        }
    },
    {
        //TempCity
        guildId: "770057600867237898",
        welcome: {
            channelId: "1088581487470850140",
            card: {
                getTitle: null,
                getMsg: null
            },
            getMsg: (params: any) => {
                return `🖥️ 🤖  Greetings <@${params.member.id}> ! ⚡  Contact <@258071819108614144> if you need any help needed !👾  🖥️\n
        - Informations et channel Français plus bas -  Contactez <@258071819108614144>  au besoin !
        - Información y canal Espanol mas abajo - ¡ Contacte a <@312456737070252034> si es necesario !`;
            }
        },
        goodbye: {
            channelId: "1086738313689440276",
            card: {
                getTitle: null,
                getMsg: null
            },
            getMsg: (params: any) => {
                return `🖥️ 🤖  Goodbye <@${params.member.id}>! We'll miss you, not right now, but probably later!!! ⚡ 🖥️\n\n`;
            }
        }
    },
    {
        //CS2-CustomMaps
        guildId: "1166437263543128144",
        welcome: {
            channelId: "1166437265501847584",
            card: {
                getTitle: () => "Welcome",
                getMsg: () => "Welcome to TempCity"
            },
            getMsg: (params: any) => {
                return `🖥️ 🤖  Greetings <@${params.member.id}> ! ⚡  Welcome to CS2-CustomsMaps's Discord! You'll find Custom Maps and Custom CS2 Servers over here! GLHF!👾  🖥️\n`;
            }
        },
        goodbye: {
            channelId: "1166585676297412658",
            card: {
                getTitle: () => "Bye bye",
                getMsg: () => "We'll miss him / her!"
            },
            getMsg: (params: any) => {
                return `🖥️ 🤖  Goodbye <@${params.member.id}>! We'll miss you, not right now, but probably later!!! ⚡ 🖥️\n\n`;
            }
        }
    },
    {
        guildId: "770057600867237898",
        welcomeChannelId: "1088581487470850140",
        removeChannelId: "1086738313689440276",
    },
];

export function getById(guildId: string) {
    for (let i = 0; i < guildsChannels.length; i++) {
        const current = guildsChannels[i];
        if (current.guildId === guildId) {
            return current;
        }
    }
}
