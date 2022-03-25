import { Request, Response, Errback } from 'express';

const dbConn = require('../config/db.config');

//get all the available items
exports.getAllItems = async (req: Request, res: Response) => {
    dbConn.query('select * from menu', (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        res.status(200).send(result);
    });
};

//get an item by its name
exports.getItemByName = async (req: Request, res: Response) => {
    dbConn.query(`select * from menu where menu.name = '${req.params.name}'`, (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        res.status(200).send(result);
    });
};

//add an item to the menu
exports.addItem = async (req: Request, res: Response) => {
    const newitem = req.body;
    dbConn.query(
        `insert into menu (name,category,nonveg,price) values ('${newitem.name}','${newitem.category}',${newitem.nonveg},'${newitem.price}')`, (err: any) => {
            if (err) console.log(err);
            res.status(201).send("Item added successfully!");
        });
};

//add an item to the menu
exports.deleteItemByName = async (req: Request, res: Response) => {
    dbConn.query(`delete from menu where name='${req.params.name}'`, (err: any) => {
        if (err) console.log('error while fetching data');
        res.status(202).send("Item deleted successfully");
    });
};