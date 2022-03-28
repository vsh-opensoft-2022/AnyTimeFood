import { Request, Response } from 'express';
import { send } from 'process';

const dbConn = require('../config/db.config');

exports.getUserinfo = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    dbConn.query(`select * from menu m, cartItem ct where m.ID = ct.menu_ID && userID = ${uid}`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(202).send("Item deleted successfully");
    });
    dbConn.query(`select * from users where ID = ${uid}`, (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        res.status(200).send(result);
    });
}

exports.getUserAddresses = async (req: Request, res: Response) => {
    console.log(req.params);
    /* dbConn.query(`select * FROM address where userID = ${req.params.id}`, (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        res.status(200).send(result);
    }); */
    res.status(200).send("ok");
}

exports.addAddress = async (req: Request, res: Response) => {
    const newitem = req.body;
    dbConn.query(
        `insert into address (address,street,city,state,pincode) values ('${newitem.name}','${newitem.category}',${newitem.nonveg},'${newitem.price}')`, (err: any) => {
            if (err) console.log(err);
            res.status(201).send("Item added successfully!");
        }
    );
}

exports.deleteAddressById = async (req: Request, res: Response) => {
    dbConn.query(`delete from address where id='${req.params.id}'`, (err: any) => {
        if (err) console.log(err);
        res.status(202).send("Item deleted successfully");
    });
}

