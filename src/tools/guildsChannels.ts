export const guildsChannels = [
    {
        guildId: "1166437263543128144",
        welcomeChannelId: "1166437265501847584",
        removeChannelId: "1166585676297412658",
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