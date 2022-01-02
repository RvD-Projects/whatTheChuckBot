"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeHelper = void 0;
class ThemeHelper {
    WelcomerLightStyle = {
        titleColor: "#ffffff",
        titleborderColor: "#000000",
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
        backgroundImage: "assets/img/lightWelcomeBanner.jpg"
    };
    WelcomerDarkStyle = {
        titleColor: "#000000",
        titleborderColor: "#ffffff",
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
        backgroundImage: "assets/img/darkWelcomeBanner.jpg"
    };
    WelcomerCustomStyle = {
        titleColor: "#ffffff",
        titleborderColor: "#000000",
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
        backgroundImage: "assets/img/customWelcomeBanner.jpg"
    };
    welcomerStyles = [
        this.WelcomerCustomStyle,
        this.WelcomerDarkStyle,
        this.WelcomerLightStyle
    ];
    setRndWelcomeStyle(card) {
        const max = this.welcomerStyles.length - 1;
        const rnd = Math.floor(Math.random() * (max + 1));
        this.setWelcomeStyle(card, this.welcomerStyles[rnd]);
    }
    setWelcomeStyle(card, style = this.WelcomerCustomStyle) {
        // Colors hexadecimal
        style.titleColor ? card.setColor("title", style.titleColor) : null;
        style.titleborderColor ? card.setColor("title-border", style.titleborderColor) : null;
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
        // Background-Img -> will be static and png formated
        style.backgroundImage ? card.setBackground(style.backgroundImage) : null;
    }
}
exports.ThemeHelper = ThemeHelper;
