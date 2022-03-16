import { Sequelize } from "sequelize";
import CustomerModel from "../models/CustomerModel";

import Logger from "./logger";

const sequelize = new Sequelize(process.env.DATABASE_STRING || "", {
    logging: false,
    dialect: 'postgres'
});

const Customer = CustomerModel(sequelize);

sequelize.sync({alter: true}).then(() => {
    Logger.info("db and tables have been created")
});

module.exports = {
    Customer
};