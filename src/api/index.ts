import express, { NextFunction, Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { textToLines } from '../tools/myFunctions';
import { getGuildConfigsById } from '../tools/guildsConfigs';
import { client } from '..';
import { TextBasedChannel } from 'discord.js';

/////////////////////////////////////

const router = Router();

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
];


// https://github.com/akzet1n/csgo-http-log-parser/blob/main/src/controllers/parser.controller.js
router.post('/logs', async (req: Request, res: Response) => {
    const guild = await client.guilds.fetch("276931890735218689");
    let channel = await guild?.channels.fetch("1185639534780764242") as TextBasedChannel;
    const isText = channel?.isTextBased ?? false;
    if (!isText) {
        return;
    }

    const outputs = textToLines(JSON.stringify(req.body), 1800);
    for (let i = 0; i < outputs.length; i++) {
        channel.send('```' + outputs[i] + "```");
    }

    return res.status(200).json({ message: "OK" });
});

/////////////////////////////////////

export function initExpress() {
    const app = express();
    app.use(express.json());
    app.use('/cs2', router);


    // Add this error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong');
    });

    app.listen(3434, () => {
        console.log(`Server running at http://localhost:3434`);
    });
}
