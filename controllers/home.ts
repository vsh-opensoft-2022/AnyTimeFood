import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getPopularitems = async (req: Request, res: Response) => {
    dbConn.query(`select * from menu order by frequency desc`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
}