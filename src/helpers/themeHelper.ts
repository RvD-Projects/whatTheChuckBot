import { PATHS } from "..";
import { getRndInteger } from "./helpers";

export class ThemeHelper {
    BackgroundImages = {
        WelcomerLightStyle: [
            `${PATHS.banners}light.png`,
            `${PATHS.banners}light-1.png`,
            `${PATHS.banners}light-2.png`,
            `${PATHS.banners}light-3.png`,
            `${PATHS.banners}light-4.png`,
        ],
        WelcomerDarkStyle: [
            `${PATHS.banners}dark.png`,
            `${PATHS.banners}dark-1.png`,
            `${PATHS.banners}dark-2.png`,
            `${PATHS.banners}dark-3.png`,
        ],
        WelcomerCustomStyle: [
            `${PATHS.banners}custom.png`,
            `${PATHS.banners}custom-1.png`,
            `${PATHS.banners}custom-2.png`,
            `${PATHS.banners}custom-3.png`,
        ],
    }

    WelcomerLightStyle = {
        name: "WelcomerLightStyle",
        titleColor: "#ffffff",
        titleBorderColor: "#000000",
        usernameColor: "#000000",
        usernameBoxColor: "#ffffff",
        hashTagColor: "#ffffff",
        discriminatorColor: "#000000",
        discriminatorBoxColor: "#ffffff",
        messageColor: "#000000",
        messageBoxColor: "#ffffff",
        borderColor: "#ffffff",
        avatarColor: "#ffffff",
        backgroundColor: "#ffffff",

        opacityBorder: "0.2",
        opacityusernameBox: "0.5",
        opacityDiscriminatorBox: "0.5",
    }

    WelcomerDarkStyle = {
        name: "WelcomerDarkStyle",
        titleColor: "#000000",
        titleBorderColor: "#ffffff",
        usernameColor: "#ffffff",
        usernameBoxColor: "#000000",
        hashTagColor: "#000000",
        discriminatorColor: "#ffffff",
        discriminatorBoxColor: "#000000",
        messageColor: "#ffffff",
        messageBoxColor: "#000000",
        borderColor: "#000000",
        avatarColor: "#ffffff",
        backgroundColor: "#000000",

        opacityBorder: "0.2",
        opacityusernameBox: "0.5",
        opacityDiscriminatorBox: "0.5",
    }

    WelcomerCustomStyle = {
        name: "WelcomerCustomStyle",
        titleColor: "#ffffff",
        titleBorderColor: "#000000",
        usernameColor: "#000000",
        usernameBoxColor: "#ffffff",
        hashTagColor: "#ffffff",
        discriminatorColor: "#000000",
        discriminatorBoxColor: "#ffffff",
        messageColor: "#000000",
        messageBoxColor: "#ffffff",
        borderColor: "#ffffff",
        avatarColor: "#000000",
        backgroundColor: "#ffffff",

        opacityBorder: "0.2",
        opacityusernameBox: "0.5",
        opacityDiscriminatorBox: "0.5",
    }

    welcomerStyles = [
        this.WelcomerLightStyle,
        this.WelcomerDarkStyle,
        this.WelcomerCustomStyle,
    ];

    setRndWelcomeStyle(card: any) {
        const rnd = getRndInteger(0, this.welcomerStyles.length - 1)
        this.setWelcomeStyle(card, this.welcomerStyles[rnd]);
    }


    setWelcomeStyle(card, style = this.WelcomerCustomStyle) {

        // Colors hexadecimal
        style.titleColor ? card.setColor("title", style.titleColor) : null;
        style.titleBorderColor ? card.setColor("title-border", style.titleBorderColor) : null;

        style.usernameColor ? card.setColor("username", style.usernameColor) : null;
        style.usernameBoxColor ? card.setColor("username-box", style.usernameBoxColor) : null;

        style.discriminatorColor ? card.setColor("discriminator", style.discriminatorColor) : null;
        style.discriminatorBoxColor ? card.setColor("discriminator-box", style.discriminatorBoxColor) : null;

        style.messageColor ? card.setColor("message", style.messageColor) : null;
        style.messageBoxColor ? card.setColor("message-box", style.messageBoxColor) : null;

        style.borderColor ? card.setColor("border", style.borderColor) : null;
        style.avatarColor ? card.setColor("avatar", style.avatarColor) : null;
        style.hashTagColor ? card.setColor("hashtag", style.hashTagColor) : null;
        style.backgroundColor ? card.setColor("background", style.backgroundColor) : null;

        // Opacities [0,1]
        style.opacityBorder ? card.setOpacity("border", style.opacityBorder) : null;
        style.opacityusernameBox ? card.setOpacity("username-box", style.opacityusernameBox) : null;
        style.opacityDiscriminatorBox ? card.setOpacity("discriminator-box", style.opacityDiscriminatorBox) : null;

        // Background-Img -> will be static and png formatted
        const rndIndex = getRndInteger(0, this.BackgroundImages[style.name].length - 1);
        card.setBackground(this.BackgroundImages[style.name][rndIndex]);
    }
}