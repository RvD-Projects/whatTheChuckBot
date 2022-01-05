import { Command } from "../class/Command";


export default new Command({
    name: "ping",
    description: "Will reply with pong. Good to know if bot is up and running.",
    run: async ({ interaction }) => {
        await interaction.deferReply({ephemeral: true});
        interaction.followUp("Pong");
        return;
    }
});
