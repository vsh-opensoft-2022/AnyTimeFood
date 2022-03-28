import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getCartItems = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    dbConn.query(`select * from menu m, cartItem ct where m.ID = ct.menuID && userID = ${uid}`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(202).send(result);
    });
}

exports.addItem = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    let newID:number = 1;
    const newItem = req.body;
    let price:number = 0;
    dbConn.query(`select price from menu where ID = ${newItem.menuID}`, (err: any, result: any) => {
        if (err) console.log(err);  
        price = result[0].price;
    });
    dbConn.query(`insert into cart (total, userID) values (${price}, ${uid})`, (err: any) => {
        if (err) console.log(err);
    });
    dbConn.query(`select ID from cart where cart.userID = ${uid}`, (err: any, result: any) => {
        if (err) console.log(err);
        newID = result[0].ID;
        console.log(newID);
    });
    dbConn.query(`insert into cartitem (quantity,menuID,cartID,userID) values (1,${newItem.menuID},${newID},${uid})`, (err: any) => {
        if (err) console.log(err);
        res.send(201).send("");
    });
}

exports.updateItemCount = async (req: Request, res: Response) => {
    var price = 0;
    var oldCount = 0;
    const newCount = req.body.count;
    const uid = Number(req.params.uid);
    dbConn.query(`select price,quantity from menu m, cartitem ct where m.ID = ct.menuID`, (err: any, result: any) => {
        if (err) console.log(err);
        price = result.price;
        oldCount = result.quantity;
    });
    dbConn.query(`update cart set total = total + ${price*(newCount-oldCount)} where ID = ${uid}`, (err: any) => {
        if (err) console.log(err);
    });
    if(newCount == 0){
        dbConn.query(`delete * from cartitem where ID = ${req.body.id} && cartID = ${uid}`, (err: any) => {
            if (err) console.log(err);
            res.status(204).send("");
        });
    }
    dbConn.query(`update cartItem set quantity =  ${newCount}`, (err: any) => {
        if (err) console.log(err);
        res.status(202).send("");
    });
}

exports.clearCart = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    dbConn.query(`delete * from cart where userID = ${uid}`, (err: any, result: any) => {
        if (err) console.log(err);
        res.status(202).send("cart empty");
    });
}