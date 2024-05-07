import 'dotenv/config'
import SentryHelper from "./helpers/SentryHelper";
import OpenAI from 'openai';

import { AppClient } from "./class/AppClient";
import { CardHelper } from "./helpers/CardHelper";
import { ThemeHelper } from "./helpers/ThemeHelper";
import { YoutubeFetcher } from "./class/YoutubeFetcher";
import { initExpressServer } from '../api';

export const PATHS = {
    root: "../",
    shells: "../shells/",
    bashes: "../shells/bash/",
}

export const sentryHelper = new SentryHelper().init();
export const client = new AppClient;

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
