"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const __1=require(".."),Command_1=require("../structures/Command");exports.default=new Command_1.Command({name:"chuckhelp",description:"Will print this help menu.",run:async({interaction:e})=>{await e.deferReply({ephemeral:!1});var t=await __1.client.getCommandsHelp();e.followUp(t)}});