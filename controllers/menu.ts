import { Request, Response } from 'express';
import { readFileSync, writeFile } from 'fs';

const items = JSON.parse(readFileSync(`${__dirname}/../../data/menu.json`, 'utf-8'));
const categoryList = JSON.parse(readFileSync(`${__dirname}/../../data/categories.json`, 'utf-8'));

//get all the available items
exports.getAllItems = async (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        items
    });
};

//get an item by its name
exports.getItemByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    const item = items.find((el: any) => el.name === name);
    if (item == null) {
        res.status(404).json({
            status: "failure",
            data: "Page Not Found!",
        });
    }
    else{
        res.status(200).json({
            status: "success",
            data: item,
        });
    }
};

//add an item to the menu
exports.addItem = async (req: Request, res: Response) => {
    const newId = items[items.length - 1].id + 1;
    const newitem = Object.assign({ id: newId }, req.body);
    items.push(newitem);
    //find the category
    const index = categoryList.find((el: any) => el.name === newitem.category).id - 1;
    categoryList[index].count += 1;
    //modify the category count
    writeFile(
        `${__dirname}/../../data/categories.json`,
        JSON.stringify(categoryList),
        err => {
            //nothing
        }
    );
    //modifying the menu
    writeFile(
        `${__dirname}/../../data/menu.json`,
        JSON.stringify(items),
        err => {
            res.status(201).json({
                status: "success",
                data: {
                    item: newitem,
                }
            });
        }
    );
};