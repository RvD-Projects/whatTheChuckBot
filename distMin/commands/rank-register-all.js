"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const Command_1=require("../structures/Command"),Levels_1=require("../tools/class/Levels");exports.default=new Command_1.Command({name:"rank-register-all",description:"Will check for unegistered users and register them to the ranking system.",run:async({interaction:e})=>{await e.deferReply({ephemeral:!0});var r=await Levels_1.Levels.updateUsers(e.guild);return e.followUp({content:r})}});