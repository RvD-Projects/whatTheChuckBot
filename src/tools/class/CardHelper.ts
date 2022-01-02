import { theme } from "../..";
import { AnyChannel, GuildMember, MessageAttachment, TextBasedChannel, TextChannel } from "discord.js";
const canvacord = require('canvacord');

export class CardHelper {

    public attachement:MessageAttachment

    send(channel: TextBasedChannel) {
        channel.sendTyping()
        channel.send({
            files: [this.attachement]
        })
    }

    async render(member:GuildMember , userData?:any, extraData?:any, type:string = 'welcomer') {
        let img;

        switch (type) {
            case 'rank':
                let rankCard = new canvacord.Rank()
                .setAvatar(member.displayAvatarURL({format: 'png', size: 512, dynamic: false}))
                .setCurrentXP(userData.xp) // Current User Xp
                .setRequiredXP(extraData.requieredXp) // We calculate the required Xp for the next level
                .setRank(userData.position) // Position of the user on the leaderboard
                .setLevel(userData.level) // Current Level of the user
                .setStatus(member.presence.status)
                .setProgressBar("#FFFFFF")
                .setUsername(member.user.username)
                .setDiscriminator(member.user.discriminator);

                img = await rankCard.build();
                this.attachement = new MessageAttachment(img, "welcome.png")
                break;
            

            // Welcomer
            default:
                let welcomeCard = new canvacord.Welcomer()
                .setUsername(member.user.username + ' no: ' + member.guild.memberCount)
                .setAvatar(member.user.displayAvatarURL({format: "png", dynamic: false}))
                .setMemberCount(member.guild.memberCount)
                welcomeCard.textMessage = `Welcome to ${member.guild.name}`;
                welcomeCard.discriminator = `${member.user.discriminator}`;
                theme.setRndWelcomeStyle(welcomeCard);

                img = await welcomeCard.build();
                this.attachement = new MessageAttachment(img, "welcome.png")
                break;

        } return;
    }
}