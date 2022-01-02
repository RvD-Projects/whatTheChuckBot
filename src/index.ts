require('dotenv').config();
import { ExtendedClient } from "./structures/Client";
import { CardHelper } from "./tools/class/CardHelper";
import CommandHelper from "./tools/class/CommandHelper";
import { Levels } from "./tools/class/Levels";
import { ThemeHelper } from "./tools/class/ThemeHelper";
export const client = new ExtendedClient();
export const theme = new ThemeHelper();
export const newCard = new CardHelper();
export const commandHelper = new CommandHelper();

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
