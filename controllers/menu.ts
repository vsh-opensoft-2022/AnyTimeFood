import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getAllItems = async (req: Request, res: Response) => {
    dbConn.query('select * from menu', (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
};

exports.getItemByName = async (req: Request, res: Response) => {
    dbConn.query(`select * from menu where menu.name = '${req.params.name}'`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
};

exports.getItemByID = async (req: Request, res: Response) => {
    dbConn.query(`select * from menu where menu.ID = '${req.params.id}'`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
};

exports.addItem = async (req: Request, res: Response) => {
    const newitem = req.body;
    dbConn.query(`insert into menu (name,category,nonveg,price,frequency) values ('${newitem.name}','${newitem.category}',${newitem.nonveg},'${newitem.price}',0)`, (err: any) => {
        if (err) console.log(err);
    });
};

exports.deleteItemByID = async (req: Request, res: Response) => {
    dbConn.query(`delete * from menu where id='${req.params.id}'`, (err: any) => {
        if (err) console.log(err);
    });
};