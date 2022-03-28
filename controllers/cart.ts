import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getCartItems = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    dbConn.query(`select * from menu m, cartItems ct where m.ID = ct.menuID && ct.userID = ${uid}`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(200).send(result);
    });
}

exports.addItem = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    const mysql = require('mysql2/promise');
    const dbConn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'anytimefooddb'
    });
    const newItem = req.body;
    const [price, fields1] = await dbConn.query(`select price from menu where ID = ${newItem.menuID}`);
    await dbConn.query(`update carts set total = total + ${price[0].price} where carts.userID = ${uid}`);
    await dbConn.query(`insert into cartitems (quantity,menuID,userID) values (1,${newItem.menuID},${uid})`);
    res.status(201).send("Item added successfully!");
}

exports.updateItemCount = async (req: Request, res: Response) => {
    const mysql = require('mysql2/promise');
    const dbConnSync = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'anytimefooddb'
    });
    const item = req.body;
    const uid = Number(req.params.uid);
    const [itemdata, fields1] = await dbConnSync.query(`select price,quantity from menu m, cartitems ct where m.ID = ct.menuID and ct.userID = ${uid}`);
    await dbConnSync.query(`update carts set total = total + ${itemdata[0].price * (item.quantity - itemdata[0].quantity)} where userID = ${uid}`);
    if (item.quantity == 0) {
        await dbConnSync.query(`delete from cartitems where menuID = ${item.menuID} and userID = ${uid}`);
        res.status(204).send("count updated successfully!");
    }
    else {
        await dbConnSync.query(`update cartItems set quantity = ${item.quantity} where menuID=${item.menuID} and userID=${uid}`);
        res.status(201).send("count updated successfully!");
    }
}

exports.clearCart = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    dbConn.query(`delete from cartitems where userID = ${uid}`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(202).send("cart empty");
    });
}