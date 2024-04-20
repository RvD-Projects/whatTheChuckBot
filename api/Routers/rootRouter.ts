import express, { NextFunction, Request, Response, Router } from 'express';

const RootRouter = Router();

RootRouter.get('/', async (req: Request, res: Response) => {
    const date = new Date;
    const tzo = date.getTimezoneOffset();
    return res.status(200).json({ 
        serverTime: date.toLocaleString().concat(`, ${tzo}`),
        message: "OK" 
    });
});

export default RootRouter;
