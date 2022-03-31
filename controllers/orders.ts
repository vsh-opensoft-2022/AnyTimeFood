import { Request, Response } from 'express';

const dbConn = require('../config/db.config');

exports.getAllOrders = async (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  const mysqlprom = require('mysql2/promise');
  const dbConnSync = await mysqlprom.createConnection({
      host: 'anytimefood.cpavwkcja63z.ap-south-1.rds.amazonaws.com',
      user: 'admin',
      password: 'password123',
      database: 'anytimefooddb',
      port: '3306'
  });
  const [IDs, fields1] = await dbConnSync.execute(`select distinct ID from orders`);
  var orders = [];
  for (let id of IDs) {
    const [result, field] = await dbConnSync.execute(`select * from orders od, orderitems oi, menu m where ${uid}=od.userID and od.userID=oi.userID and od.ID=oi.orderID and oi.menuID=m.ID and ${id.ID}=od.ID`);
    orders.push({"orderID":id.ID, "data":result});
  }
  res.status(200).send(orders);
};
exports.getOrderbyID = async (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  const id = Number(req.params.id);
  dbConn.query(`select * from orders od, orderitems oi, menu m where ${uid}=od.userID and od.userID=oi.userID and oi.orderID=od.ID and m.ID=oi.menuID and ${id}=od.ID`, (err: any, result: any) => {
    if (err) console.log(err);
    res.status(200).send({"orderID":id, "data":result});
  });
};

exports.addOrder = async (req: Request, res: Response) => {
  const uid = Number(req.params.uid);  
  const mysqlprom = require('mysql2/promise');
  const dbConnSync = await mysqlprom.createConnection({
      host: 'anytimefood.cpavwkcja63z.ap-south-1.rds.amazonaws.com',
      user: 'admin',
      password: 'password123',
      database: 'anytimefooddb',
      port: '3306'
  });
  const [total, fields1] = await dbConnSync.execute(`select total from carts where carts.userID = ${uid}`);
  await dbConnSync.execute(`insert into orders (status,total,date,time,userID) values (0, ${total[0].total}, current_date(), current_time(), ${uid})`);
  const [newID, fields2] = await dbConnSync.execute(`select last_insert_id() id`);
  const [newOrder, fields3] = await dbConnSync.execute(`select quantity, menuID from menu m, cartitems ct where m.ID = ct.menuID and ct.userID = ${uid}`);
  for (let newItem of Object(newOrder)) {
    await dbConnSync.execute(`insert into orderitems (quantity,menuID,orderID,userID) values (${newItem.quantity}, ${newItem.menuID}, ${newID[0].id}, ${uid})`);
  }
  await dbConnSync.execute(`delete from cartitems where userID = ${uid}`);
  res.status(201).send("order added.");
};

exports.addOrderFeedback = async (req: Request, res: Response) => {
  const uid = Number(req.params.uid);
  const review = req.body;
  dbConn.query(`insert into feedback (rating,feedback,ordersID,userID) values (${review.rating},${review.feedback},${review.orderID},${uid})`, (err: any, result: any) => {
    if (err) console.log(err);
    res.status(200).send("feedback entry done!");
  });
};

