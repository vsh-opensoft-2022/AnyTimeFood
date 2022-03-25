import { Request, Response } from 'express';

exports.getAllCategories = async (req: Request, res: Response) => {
    dbConn.query(`select distinct category from menu`, (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        res.status(200).send(result);
    });
};

exports.getItemByCategory = async (req: Request, res: Response) => {
    const category = req.params.category;
    dbConn.query(`select * from menu where category = "${category}"`, (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        res.status(200).send(result);
    });
};