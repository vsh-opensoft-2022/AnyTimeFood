import { Request, Response } from 'express';
import { readFileSync } from 'fs';

const items = JSON.parse(readFileSync(`${__dirname}/../../data/menu.json`, 'utf-8'));
const categoryList = JSON.parse(readFileSync(`${__dirname}/../../data/categories.json`, 'utf-8'));

exports.getAllCategories = async (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        categoryList
    });
};

exports.getItemByCategory = async (req: Request, res: Response) => {
    const category = req.params.id;
    const data = items.filter((el: any) => category == el.category);
    if (data.length == 0) {
        res.status(404).json({
            status: "failure",
            data: "Page Not Found",
        });
    }
    else{
        res.status(200).json({
            status: "success",
            data,
        });
    }
};