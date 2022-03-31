import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getAllCategories = async (req: Request, res: Response) => {
    dbConn.query(`select distinct category from menu`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
};

exports.getItemByCategory = async (req: Request, res: Response) => {
    const category = req.params.category;
    dbConn.query(`select * from menu where category = "${category}"`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
};