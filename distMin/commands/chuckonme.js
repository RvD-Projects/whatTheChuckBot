"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const Command_1=require("../class/Command"),HttpFetcher_1=require("../tools/class/HttpFetcher"),myFunctions_1=require("../tools/myFunctions");async function fetchTheChuck(){let e={};let t=new HttpFetcher_1.HttpFetcher("Post","https://api.icndb.com/jokes/random/");var o=await t.execute();return e.valid=!1,o?.value?.joke&&o?.value?.id&&(e.id=o.value.id,e.value=o.value.joke,e.valid=!0),e}exports.default=new Command_1.Command({name:"chuckonme",description:"Will fetch and post a Chuk Norris joke.",run:async({interaction:e})=>{const t=await fetchTheChuck();return t?.valid?(t.value=(0,myFunctions_1.unescapeEntities)(t.value),e.followUp(t.value)):e.followUp("No results found...")}});