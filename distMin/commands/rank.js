"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const __1=require(".."),Command_1=require("../class/Command"),Levels_1=require("../tools/class/Levels");exports.default=new Command_1.Command({name:"rank",description:"Will print out the rank card of a user (your's by default).",options:[{name:"user",type:"USER",description:"The user to get rank from.",required:!1},{name:"public",type:"BOOLEAN",description:"Show the card to th public? Default = True (True|False)",required:!1},{name:"light",type:"BOOLEAN",description:"[BETA] Overwrite the card style to light mode? (True|False)",required:!1}],run:async({interaction:e,args:r})=>{var t=!!r.getBoolean("public");await e.deferReply({ephemeral:t});t=r.getUser("user"),r.getBoolean("light"),r=t?await e.guild.members.cache.get(t.id):e.member,t=e.guild;let a=await Levels_1.Levels.fetch(r.id,t.id,!0);if(a||(await e.editReply("Account's not found! We are trying to register you! ⚙⚙⚙"),await Levels_1.Levels.createUser(r.id,t.id),a=await Levels_1.Levels.fetch(r.id,t.id,!0)),!a)return e.followUp("We could not register you sorry 😞, contact the server administrators!");t={requieredXp:Levels_1.Levels.xpFor(a.level+1)};return await __1.newCard.render(r,a,t,"rank"),e.followUp({content:"Here's the info we got on this user so far. 🚀🚀🚀",files:[__1.newCard.attachement]})}});