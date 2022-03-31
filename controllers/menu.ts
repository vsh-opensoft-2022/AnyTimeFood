import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

// route: /menu
//get all items available in the menu
exports.getAllItems = async (req: Request, res: Response) => {
    dbConn.query('select * from menu', (err: any, result: any) => {
        if (err) console.log(err);
        var arr = [];
        for (let item of result) {
            arr.push({ "ID": item.ID, "name": item.name, "photo": Buffer.from(item.photo).toString('base64'), "categoryID": [item.categoryID], "menu": item })
        }
        res.status(200).send(arr);
    });
};

//route: /menu/:name
//get Item details by name
exports.getItemByName = async (req: Request, res: Response) => {
    dbConn.query(`select * from menu where menu.name = '${req.params.name}'`, (err: any, result: any) => {
        if (err) console.log(err);
        var arr = [];
        for (let item of result) {
            arr.push({ "ID": item.ID, "name": item.name, "photo": Buffer.from(item.photo).toString('base64'), "categoryID": [item.categoryID], "menu": item })
        }
        res.status(200).send(arr);
    });
};

//route: /menu/:id
//get item by item id
exports.getItemByID = async (req: Request, res: Response) => {
    dbConn.query(`select * from menu where menu.ID = '${req.params.id}'`, (err: any, result: any) => {
        if (err) console.log(err);
        var arr = [];
        for (let item of result) {
            arr.push({ "ID": item.ID, "name": item.name, "photo": Buffer.from(item.photo).toString('base64'), "categoryID": [item.categoryID], "menu": item })
        }
        res.status(200).send(arr);
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