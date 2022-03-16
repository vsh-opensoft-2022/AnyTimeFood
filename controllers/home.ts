import { Request, Response } from 'express';

exports.homepage = async (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        data: "Welcome to the Home page",
    });
};