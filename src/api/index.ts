import path from 'path';
import http from 'https';
import https from 'https';
import { readFileSync } from 'fs';

import cors from 'cors';
import helmet from 'helmet';
import { Express } from 'express-serve-static-core';
import express from 'express';

import Cs2Router from './Http/Routers/Cs2Router';
import RootRouter from './Http/Routers/rootRouter';

export function initExpressServer() {
    const app = express();
    setupAppConfigs(app);
    setupRoutes(app);
    setupServer(app);
}

function setupServer(app: Express) {
    const serverOptions = {
        key: readFileSync(path.join(__dirname, 'certs/server.key')),
        cert: readFileSync(path.join(__dirname, 'certs/server.cert')),
    };

    const httpServer = http.createServer(app);
    httpServer.listen(3434, () => {
        console.log(`\n|--------HTTP Server listening on port 3434!--------|\n`);
    });

    const httpsServer = https.createServer(serverOptions, app);
    httpsServer.listen(3438, () => {
        console.log(`\n|--------HTTPS Server listening on port 3438!--------|\n`);
    });
}

function setupAppConfigs(app: Express) {
    app.disable('x-powered-by');
    app.use(express.json());
    app.use(helmet());
    app.set('trust proxy', 1);
    
    app.use(cors({
        origin: [
            'https://192.168.1.100',
            'https://192.168.1.128',
            'https://rvdprojects.synology.me',
        ],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: true,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }));
}

function setupRoutes(app: Express) {
    app.use('/', RootRouter);
    app.use('/cs2', Cs2Router);
}

