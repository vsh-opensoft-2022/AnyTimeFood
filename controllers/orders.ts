import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getAllOrders = async (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  dbConn.query(`select * from orders or , orderitem oi ,menu m where ${uid}=or.userID and or.userID=oi.userID and or.ID=oi.ordersID and oi.menuID=m.ID`, (err: any, result: any) => {
    if (err) console.log(err);
    res.status(200).send(result);
  });
};
/*
exports.addOrder = (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  var newOrder;
  var total = 0;
  var newID
  dbConn.query(`select quantity, menuID from menu m, cartItem ct where m.ID = ct.menuID and ct.userID = ${uid}`, (err: any, result: any) => {
    if (err) console.log("1 hello", err);
    newOrder = result;
  });
  dbConn.query(`select total from cart where cart.userID = ${uid}`, (err: any, result: any) => {
    if (err) console.log("2 hello", err);
    total = result[0].total;
    console.log(total);
  });
  dbConn.query(`insert into orders (status,total,date,time,userID) values (0, ${total}, current_date(), current_time(), ${uid})`, (err: any) => {
    if (err) console.log("3 hello", err);
  });
  dbConn.query(`select ID from orders where orders.userID = ${uid}`, (err: any, result: any) => {
    if (err) console.log("4 hello", err);
    newID = result[0].ID;
  });
  console.log(total);
  console.log(newOrder);
  for (let newItem of Object(newOrder)) {
    dbConn.query(`insert into orderitem (quantity,menuID,ordersID,userID) values (${newItem.quantity}, ${newItem.menuID}, ${newID}, ${uid})`, (err: any) => {
      if (err) console.log(err);
      res.status(201).send("");
    });
  }
};
*/
exports.addOrderFeedback = async (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  res.status(202).send("not yet done");
};

