"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandHelper = exports.newCard = exports.theme = exports.client = void 0;
const tslib_1 = require("tslib");
require('dotenv').config();
const Client_1 = require("./class/Client");
const CardHelper_1 = require("./tools/class/CardHelper");
const CommandHelper_1 = (0, tslib_1.__importDefault)(require("./tools/class/CommandHelper"));
const Levels_1 = require("./tools/class/Levels");
const ThemeHelper_1 = require("./tools/class/ThemeHelper");
exports.client = new Client_1.ExtendedClient();
exports.theme = new ThemeHelper_1.ThemeHelper();
exports.newCard = new CardHelper_1.CardHelper();
exports.commandHelper = new CommandHelper_1.default();
const levelsWithMongoDB = new Levels_1.Levels();
exports.client.start();
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
