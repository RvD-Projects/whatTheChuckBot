import express, { NextFunction, Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { TextBasedChannel } from 'discord.js';
import { client } from '../../src';
import { textToLines } from '../../src/tools/myFunctions';


const Cs2Router = Router();

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
];

// https://github.com/akzet1n/csgo-http-log-parser/blob/main/src/controllers/parser.controller.js
Cs2Router.post('/logs', async (req: Request, res: Response) => {
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

export default Cs2Router;
