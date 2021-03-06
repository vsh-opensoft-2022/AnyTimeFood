import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

//
exports.getPopularitems = async (req: Request, res: Response) => {
    dbConn.query(`select * from menu order by frequency desc`, (err: any, result: any) => {
        if (err){
            console.log(err);
            throw err;
        }
        var arr = [];
        for (let item of result) {
            arr.push({ "ID": item.ID, "name": item.name, "photo": Buffer.from(item.photo).toString('base64'), "categoryID": [item.categoryID], "menu": item })
        }
        res.status(200).send(arr);
    });
}