import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getAllOrders =  (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  dbConn.query(`select * from orders od, orderitems oi, menu m where ${uid}=od.userID and od.userID=oi.userID and od.ID=oi.orderID and oi.menuID=m.ID`, (err: any, result: any) => {
    if (err) console.log(err);
    res.status(200).send(result);
  });
};
exports.getOrderbyID =  (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  const id = Number(req.params.id);
  dbConn.query(`select * from orders od, orderitems oi, menu m where ${uid}=od.userID and od.userID=oi.userID and od.ID=oi.orderID and oi.menuID=m.ID and od.ID=${id}`, (err: any, result: any) => {
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
  await dbConn.execute(`insert into orders (status,total,date,time,userID) values (0, ${total[0].total}, current_date(), current_time(), ${uid})`);
  const [newID, fields2] = await dbConn.execute(`select last_insert_id() id`);
  const [newOrder, fields3] = await dbConn.execute(`select quantity, menuID from menu m, cartItems ct where m.ID = ct.menuID and ct.userID = ${uid}`);
  for (let newItem of Object(newOrder)) {
    await dbConn.execute(`insert into orderitems (quantity,menuID,orderID,userID) values (${newItem.quantity}, ${newItem.menuID}, ${newID[0].id}, ${uid})`);
  }
  await dbConn.execute(`delete from cartitems where userID = ${uid}`);
  res.status(201).send("");
};

exports.addOrderFeedback = async (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  res.status(202).send("not yet done");
};

