import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

//get all categories of food items available
exports.getAllCategories = async (req: Request, res: Response) => {
    dbConn.query(`select * from categories`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
};

//get items by category
// {
//      "categoryID": 1 
// }
exports.getItemByCategory = async (req: Request, res: Response) => {
    const id = req.params.category;
    dbConn.query(`select * from menu where categoryID = ${id}`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
};