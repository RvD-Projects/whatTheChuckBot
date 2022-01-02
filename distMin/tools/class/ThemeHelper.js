"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ThemeHelper=void 0;class ThemeHelper{WelcomerLightStyle={titleColor:"#ffffff",titleborderColor:"#000000",usernameColor:"#000000",usernameBoxColor:"#ffffff",hashTagColor:"#ffffff",discriminatorColor:"#000000",discriminatorBoxColor:"#ffffff",messageColor:"#000000",messageBoxColor:"#ffffff",borderColor:"#ffffff",avatarColor:"#ffffff",backgroundColor:"#ffffff",opacityBorder:"0.2",opacityusernameBox:"0.5",opacityDiscriminatorBox:"0.5",backgroundImage:"assets/img/lightWelcomeBanner.jpg"};WelcomerDarkStyle={titleColor:"#000000",titleborderColor:"#ffffff",usernameColor:"#ffffff",usernameBoxColor:"#000000",hashTagColor:"#000000",discriminatorColor:"#ffffff",discriminatorBoxColor:"#000000",messageColor:"#ffffff",messageBoxColor:"#000000",borderColor:"#000000",avatarColor:"#ffffff",backgroundColor:"#000000",opacityBorder:"0.2",opacityusernameBox:"0.5",opacityDiscriminatorBox:"0.5",backgroundImage:"assets/img/darkWelcomeBanner.jpg"};WelcomerCustomStyle={titleColor:"#ffffff",titleborderColor:"#000000",usernameColor:"#000000",usernameBoxColor:"#ffffff",hashTagColor:"#ffffff",discriminatorColor:"#000000",discriminatorBoxColor:"#ffffff",messageColor:"#000000",messageBoxColor:"#ffffff",borderColor:"#ffffff",avatarColor:"#000000",backgroundColor:"#ffffff",opacityBorder:"0.2",opacityusernameBox:"0.5",opacityDiscriminatorBox:"0.5",backgroundImage:"assets/img/customWelcomeBanner.jpg"};welcomerStyles=[this.WelcomerCustomStyle,this.WelcomerDarkStyle,this.WelcomerLightStyle];setRndWelcomeStyle(o){var r=this.welcomerStyles.length-1,r=Math.floor(Math.random()*(1+r));this.setWelcomeStyle(o,this.welcomerStyles[r])}setWelcomeStyle(o,r=this.WelcomerCustomStyle){r.titleColor&&o.setColor("title",r.titleColor),r.titleborderColor&&o.setColor("title-border",r.titleborderColor),r.usernameColor&&o.setColor("username",r.usernameColor),r.usernameBoxColor&&o.setColor("username-box",r.usernameBoxColor),r.discriminatorColor&&o.setColor("discriminator",r.discriminatorColor),r.discriminatorBoxColor&&o.setColor("discriminator-box",r.discriminatorBoxColor),r.messageColor&&o.setColor("message",r.messageColor),r.messageBoxColor&&o.setColor("message-box",r.messageBoxColor),r.borderColor&&o.setColor("border",r.borderColor),r.avatarColor&&o.setColor("avatar",r.avatarColor),r.hashTagColor&&o.setColor("hashtag",r.hashTagColor),r.backgroundColor&&o.setColor("background",r.backgroundColor),r.opacityBorder&&o.setOpacity("border",r.opacityBorder),r.opacityusernameBox&&o.setOpacity("username-box",r.opacityusernameBox),r.opacityDiscriminatorBox&&o.setOpacity("discriminator-box",r.opacityDiscriminatorBox),r.backgroundImage&&o.setBackground(r.backgroundImage)}}exports.ThemeHelper=ThemeHelper;