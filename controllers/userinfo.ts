import { Request, Response } from 'express';

//database connection instance
const dbConn = require('../config/db.config');

// extracting the user data based on the user ID from the database
exports.getUserinfo = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    dbConn.query(`select name,phone_number, email from users where ID = ${uid}`, (err: any, result: any) => {
        if (err){
            console.log('error while fetching data');
            throw err;
        }
        console.log("fetched user data.");
        res.status(200).send(result);
    });
}

//route: /users/:uid
//updating basic user details
// {
//      "name": xyz,
//      "category": abc,
//      "price": 99.99
// }
exports.updateinfo = async (req: Request, res: Response) => {
    const uid = Number(req.params.uid);
    const new_details = req.body;
    dbConn.query(`update users set (name,email) values (${new_details.name},${new_details.email})`, (err: any) => {
        if (err){
            console.log('error while updating data');
            throw err;
        }
        console.log("data updated successfully!");
        res.status(201).send();
    });
}

//route: /users/:uid
// extracting all the addresses of a user using the user ID
exports.getUserAddresses = async (req: Request, res: Response) => {
    dbConn.query(`select * from addresses where userID = ${req.params.uid}`, (err: any, result: any) => {
        if (err){
            console.log('error while fetching data');
            throw err;
        }
        console.log("fetched user addresses.");
        res.status(200).send(result);
    });
}

//route: /users/:uid/addresses
// request to add new address of a user to the database
// example request: 
// {
//      "name": xyz,
//      "category": abc,
//      "price": 99.99
// }
exports.addAddress = async (req: Request, res: Response) => {
    const newitem = req.body;
    dbConn.query(
        `insert into addresses (address,street,city,state,pincode) values ('${newitem.name}','${newitem.category}',${newitem.nonveg},'${newitem.price}')`, (err: any) => {
            if (err){
                console.log(err);
                throw err;
            }
            console.log("new address added.");
            res.status(201).send("Item added successfully!");
        }
    );
}

//route: /users/:uid/:id
//delete address of a user by uid
exports.deleteAddressById = async (req: Request, res: Response) => {
    dbConn.query(`delete from addresses where id=${req.params.id} && userID = ${req.params.uid}`, (err: any) => {
        if (err) console.log(err);
        console.log("address deleted successfully.");
        res.status(202).send("Item deleted successfully");
    });
}

//route: /users
//post request to authenticate user
//example request:
// {
//    "name": xyz,
//    "password": abc
// }
// it returns:
// {
//    "flag": true,
//    "uid": 1
// }
exports.UserAuthentication = async (req: Request, res: Response) => {
    const user_details = req.body;
    dbConn.query(`select * from users`, (err: any, users: any) => {
        if (err) console.log('error while fetching data');
        var flag:Boolean = false;
        var id = -1;
        for(let user of users){
            if(user.name == user_details.name && user.password == user_details.password){
                flag = true;
                id = user.ID;   
            }
        }
        if(flag) console.log("Login successfull!");
        else console.log("Login failed!");
        res.status(200).send({"flag": flag, "uid": id});
    });
}
