import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getAllCategories = async (req: Request, res: Response) => {
    dbConn.query(`select * from categories`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
};

exports.getItemByCategory = async (req: Request, res: Response) => {
    const id = req.params.categoryID;
    dbConn.query(`select * from menu where categoryID = "${id}"`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
};