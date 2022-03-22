import { DataTypes, Sequelize } from "sequelize";
import CustomerModel from "../models/CustomerModel";

import Logger from "./logger";

export const sequelize = new Sequelize(process.env.DATABASE_STRING || "", {
    logging: false,
    dialect: 'postgres'
});

export const Customer = CustomerModel(sequelize, DataTypes);

sequelize.sync({alter: true}).then(() => {
    Logger.info("db and tables have been created")
});