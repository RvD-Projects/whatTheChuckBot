import 'dotenv/config'
import SentryHelper from "./helpers/sentryHelper";
import OpenAI from 'openai';

import { AppClient } from "./class/appClient";
import { CardHelper } from "./helpers/cardHelper";
import { ThemeHelper } from "./helpers/themeHelper";
import { initExpressServer } from '../api';
import { dirname } from 'path';

const rootDir = dirname(__dirname + "../");

export const PATHS = {
    root: `${rootDir}/`,
    shells: `${rootDir}/shells/`,
    bashes: `${rootDir}/shells/bash/`,
    banners: `${rootDir}/assets/img/banners/`
};

export const sentryHelper = new SentryHelper().init();
export const client = new AppClient;

export const openAI = new OpenAI();
export const theme = new ThemeHelper;
export const newCard = new CardHelper;

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
