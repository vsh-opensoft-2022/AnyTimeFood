import { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';

const items = JSON.parse(readFileSync(`${__dirname}/../../data/orders.json`, 'utf-8'));
const orderList = JSON.parse(readFileSync(`${__dirname}/../../data/orders.json`, 'utf-8'));

exports.getAllOrders = async (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        orderList
    });
};

exports.addOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderList.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newOrder
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.addOrderFeedback = async (req: Request, res: Response) => {
  try {
    const updatedList = await orderList.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      data: {
        updatedList
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// exports.addOrderFeedback = async (req: Request, res: Response) => {
//     const orderId = req.params.orderId;
//     const particularOrder = orderList.order.filter((el:any) => el.orderId != orderId);
//     orderList.orders = particularOrder;
//     writeFileSync(
//         `${__dirname}/../../data/userinfo.json`,
//         JSON.stringify(userinfo),
//     );
// }

// exports.addOrder = async (req: Request, res: Response) => {
//     items.push(req.body);
//     writeFileSync(
//         `${__dirname}/../../data/orders.json`,
//         JSON.stringify(items),
//         // err => {
//         //     res.status(201).json({
//         //         status: "success",
//         //         data: {
//         //             newOrder: req.body,
//         //         }
//         //     });
//         // }
//     );
// }