require('dotenv').config();
import { ExtendedClient } from "./class/Client";
import { CardHelper } from "./tools/class/CardHelper";
import CommandHelper from "./tools/class/CommandHelper";
import { DeezerApi } from "./tools/class/DeezerApi";
import { Levels } from "./tools/class/Levels";
import { ThemeHelper } from "./tools/class/ThemeHelper";
import { VoiceConnectionsHelper } from "./tools/class/VoiceConnectionsHelper";
export const client = new ExtendedClient();
export const theme = new ThemeHelper();
export const newCard = new CardHelper();
export const commandHelper = new CommandHelper();
export const voiceConnectionsHelper = new VoiceConnectionsHelper();
export const deezerApi = new DeezerApi()
const levelsWithMongoDB = new Levels();


client.start();


//  $$\      $$\                     $$\                 $$\                  $$$$$$\              $$\     $$\                     $$\ 
//  $$$\    $$$ |                    \__|                \__|                $$  __$$\             $$ |    \__|                    $$ |
//  $$$$\  $$$$ | $$$$$$\   $$$$$$\  $$\  $$$$$$$\       $$\ $$$$$$$\        $$ /  $$ | $$$$$$$\ $$$$$$\   $$\  $$$$$$\  $$$$$$$\  $$ |
//  $$\$$\$$ $$ | \____$$\ $$  __$$\ $$ |$$  _____|      $$ |$$  __$$\       $$$$$$$$ |$$  _____|\_$$  _|  $$ |$$  __$$\ $$  __$$\ $$ |
//  $$ \$$$  $$ | $$$$$$$ |$$ /  $$ |$$ |$$ /            $$ |$$ |  $$ |      $$  __$$ |$$ /        $$ |    $$ |$$ /  $$ |$$ |  $$ |\__|
//  $$ |\$  /$$ |$$  __$$ |$$ |  $$ |$$ |$$ |            $$ |$$ |  $$ |      $$ |  $$ |$$ |        $$ |$$\ $$ |$$ |  $$ |$$ |  $$ |    
//  $$ | \_/ $$ |\$$$$$$$ |\$$$$$$$ |$$ |\$$$$$$$\       $$ |$$ |  $$ |      $$ |  $$ |\$$$$$$$\   \$$$$  |$$ |\$$$$$$  |$$ |  $$ |$$\ 
//  \__|     \__| \_______| \____$$ |\__| \_______|      \__|\__|  \__|      \__|  \__| \_______|   \____/ \__| \______/ \__|  \__|\__|
//                         $$\   $$ |                                                                                                  
//                         \$$$$$$  |                                                                                                  
//                          \______/
