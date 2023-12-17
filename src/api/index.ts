import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { Express } from 'express-serve-static-core';
import session from 'express-session';
import { readFileSync } from 'fs';
import path from 'path';

import Cs2Router from './Http/Routers/Cs2Router';


export function initExpress() {
    const app = express();
    setupAppConfigs(app);
    setupRoutes(app);
    setupServer(app);
}

function setupServer(app: Express) {
    const serverOptions = {
        // cert: readFileSync(path.join(__dirname, 'certs/host.crt')),
        // key: readFileSync(path.join(__dirname, 'certs/host.key')),
    }

    const server = require('https').Server(serverOptions, app);
    server.listen(3434, () => {
        console.log(`Server running at http://localhost:3434`);
    });
}

function setupAppConfigs(app: Express) {
    app.disable('x-powered-by');
    app.use(express.json());
    app.use(helmet());

    app.set('trust proxy', 1);
    app.use(session({
        secret: 'igVg1iV2x7cyAPu',
        name: 'wfEj9FcCiQOhmHD'
    }));
}

function setupRoutes(app: Express) {
    app.use('/cs2', Cs2Router);
    // Add this error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong');
    });
}

