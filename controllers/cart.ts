import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

//route: /cart/:uid
//get items in cart of a user
// {
//      "name": xyz,
//      "category": abc,
//      "price": 99.99
// }
exports.getCartItems = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    dbConn.query(`select * from menu m, cartitems ct where m.ID = ct.menuID && ct.userID = ${uid}`, (err: any, result: any) => {
        if (err){
            console.log(err);
            throw err;
        }
        res.status(200).send(result);
    });
}

//route: /cart/:uid/:id
exports.getQuantityByID = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    const id = Number(req.params.id);
    dbConn.query(`select quantity from menu m, cartitems ct where m.ID = ct.menuID && ct.userID = ${uid} && m.ID = ${id}`, (err: any, result: any) => {
        if (err){
            console.log(err);
            throw err;
        }
        res.status(200).send(result[0]);
    });
}
//route: cart/:uid
//add an item instance to the cart
exports.addItem = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    const mysqlprom = require('mysql2/promise');
    const dbConnSync = await mysqlprom.createConnection({
        host: 'anytimefood.cpavwkcja63z.ap-south-1.rds.amazonaws.com',
        user: 'admin',
        password: 'password123',
        database: 'anytimefooddb',
        port: '3306'
    });
    const newItem = req.body;
    const [price, fields1] = await dbConnSync.query(`select price from menu where ID = ${newItem.menuID}`);
    await dbConnSync.query(`update carts set total = total + ${price[0].price} where carts.userID = ${uid}`);
    await dbConnSync.query(`insert into cartitems (quantity,menuID,userID) values (1,${newItem.menuID},${uid})`);
    res.status(201).send("Item added successfully!");
}

//route: cart/:uid
//update the quantity of an item int the cart
exports.updateItemCount = async (req: Request, res: Response) => {
    const mysqlprom = require('mysql2/promise');
    const dbConnSync = await mysqlprom.createConnection({
        host: 'anytimefood.cpavwkcja63z.ap-south-1.rds.amazonaws.com',
        user: 'admin',
        password: 'password123',
        database: 'anytimefooddb',
        port: '3306'
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
        await dbConnSync.query(`update cartitems set quantity = ${item.quantity} where menuID=${item.menuID} and userID=${uid}`);
        res.status(201).send("count updated successfully!");
    }
}

//clear the cart instance
exports.clearCart = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    dbConn.query(`delete from cartitems where userID = ${uid}`, (err: any, result: any) => {
        if (err){
            console.log(err);
            throw err;
        }
        res.status(202).send("cart empty");
    });
}