import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getUserinfo = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    dbConn.query(`select * from users where ID = ${uid}`, (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        console.log("fetched user data.");
        res.status(200).send(result);
    });
}

exports.getUserAddresses = async (req: Request, res: Response) => {
    dbConn.query(`select * from addresses where userID = ${req.params.uid}`, (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        console.log("fetched user addresses.");
        res.status(200).send(result);
    });
}

exports.addAddress = async (req: Request, res: Response) => {
    const newitem = req.body;
    dbConn.query(
        `insert into addresses (address,street,city,state,pincode) values ('${newitem.name}','${newitem.category}',${newitem.nonveg},'${newitem.price}')`, (err: any) => {
            if (err) console.log(err);
            console.log("new address added.");
            res.status(201).send("Item added successfully!");
        }
    );
}

exports.deleteAddressById = async (req: Request, res: Response) => {
    dbConn.query(`delete from addresses where id='${req.params.id}'`, (err: any) => {
        if (err) console.log(err);
        console.log("address deleted successfully.");
        res.status(202).send("Item deleted successfully");
    });
}

