import { Request, Response } from 'express';

exports.getCartItems = async (req: Request, res: Response) => {
    dbConn.query(`select * from menu m, cartItem ct, cart c where m.ID = ct.menu_ID`, (err: any, result: any) => {
        if (err) console.log('error while fetching data');
        res.status(202).send("Item deleted successfully");
    });
}

exports.addToCart = async (req: Request, res: Response) => {
    const newItem = req.body;

}

exports.deleteItem = async (req: Request, res: Response) => {

}

exports.updateItem = async (req: Request, res: Response) => {
    res.status(200);
}