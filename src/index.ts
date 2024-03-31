import 'dotenv/config'
import SentryHelper from "./class/SentryHelper";
import OpenAI from 'openai';

import { ExtendedClient } from "./class/Client";
import { CardHelper } from "./tools/class/CardHelper";
import { ThemeHelper } from "./tools/class/ThemeHelper";
import { YoutubeFetcher } from "./tools/class/YoutubeFetcher";
import { initExpressServer } from "./api";

export const sentryHelper = new SentryHelper().init();
export const client = new ExtendedClient;

export const openAI = new OpenAI();
export const theme = new ThemeHelper;
export const newCard = new CardHelper;
export const ytFetch = new YoutubeFetcher;

// Include process module
const process = require('process');
process.title = "WhatTheChuck";

client.start();
initExpressServer();


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
