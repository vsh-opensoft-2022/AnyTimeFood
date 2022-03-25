import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getUserinfo = async (req: Request, res: Response) => {
    dbConn.query('select * FROM userinfo', (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        res.status(200).send(result);
    });
}

exports.getAllAddresses = async (req: Request, res: Response) => {
    dbConn.query('select * FROM address', (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        res.status(200).send(result);
    });
}

exports.addAddress = async (req: Request, res: Response) => {
    const newitem = req.body;
    dbConn.query(
        `insert into address (address,street,city,state,pincode) values ('${newitem.name}','${newitem.category}',${newitem.nonveg},'${newitem.price}')`, (err: any) => {
            if (err) console.log(err);
            res.status(201).send("Item added successfully!");
        });
}

exports.deleteAddressById = async (req: Request, res: Response) => {
    dbConn.query(`delete from address where id='${req.params.id}'`, (err: any) => {
        if (err) console.log('error while fetching data');
        res.status(202).send("Item deleted successfully");
    });
}

