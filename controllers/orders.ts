import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getAllOrders =  (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  dbConn.query(`select * from orders od , orderitems oi ,menu m where ${uid}=od.userID and od.userID=oi.userID and od.ID=oi.order ID and oi.menuID=m.ID`, (err: any, result: any) => {
    if (err) console.log(err);
    res.status(200).send(result);
  });
};

exports.addOrder = async (req: Request, res: Response) => {
  const uid = Number(req.params.uid);  
  const mysql = require('mysql2/promise');
  const dbConn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'anytimefooddb'
  });
  const [total, fields1] = await dbConn.execute(`select total from carts where carts.userID = ${uid}`);
  console.log("total", total);
  console.log("uid", uid);
  await dbConn.execute(`insert into orders (status,total,date,time,userID) values (0, ${total[0].total}, current_date(), current_time(), ${uid})`);
  const [newID, fields2] = await dbConn.execute(`select last_insert_id() id`);
  console.log("newID", newID);
  const [newOrder, fields3] = await dbConn.execute(`select quantity, menuID from menu m, cartItems ct where m.ID = ct.menuID and ct.userID = ${uid}`);
  console.log(newOrder);
  for (let newItem of Object(newOrder)) {
    await dbConn.execute(`insert into orderitems (quantity,menuID,orderID,userID) values (${newItem.quantity}, ${newItem.menuID}, ${newID[0].id}, ${uid})`);
  }
  await dbConn.execute(`delete from cartitems where userID = ${uid}`);
  await dbConn.execute(`delete from carts where userID = ${uid}`);
  res.status(201).send("");
};

exports.addOrderFeedback = async (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  res.status(202).send("not yet done");
};

