import { Request, Response } from 'express';
import { readFileSync, writeFile } from 'fs';

const userinfo = JSON.parse(readFileSync(`${__dirname}/../../data/userinfo.json`, 'utf-8'));

exports.getUserinfo = async (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        userinfo,
    });
}

exports.getAllAddresses = async (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        addresses: userinfo.addresses,
    });
}

exports.addAddress = async (req: Request, res: Response) => {
    userinfo.addresses.push(req.body);
    writeFile(
        `${__dirname}/../../data/userinfo.json`,
        JSON.stringify(userinfo),
        err => {
            res.status(201).json({
                status: "success",
                data: {
                    newAddress: req.body,
                }
            });
        }
    );
}