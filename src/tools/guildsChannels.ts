export const guildsChannels = [
    {
        guildId: "1166437263543128144",
        welcomeChannelId: null,
        removeChannelId: "1166585676297412658",
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