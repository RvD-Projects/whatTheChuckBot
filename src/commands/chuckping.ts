import { Command } from "../class/Command";


export default new Command({
    name: "chuckping",
    description: "Will reply with pong.",
    run: async ({ interaction }) => {
        interaction.followUp("Pong");
    }
});
