import express, { Express } from 'express';
import dotenv from 'dotenv';

const home = require("./routes/home");
const menu = require("./routes/menu");
const categories = require("./routes/categories");
const userinfo = require("./routes/userinfo");
const cart = require("./routes/cart");
const orders = require("./routes/orders");

const connection = require('./config/db.config');

// Setup environment variables from .env file.
dotenv.config();

// Initialize express framework.
const app: Express = express();

// Test route to check if API is running.
app.use(express.json());

app.use('/' || 'home', home);
app.use('/menu', menu);
app.use('/categories', categories);
app.use('/cart', cart);
app.use('/userinfo', userinfo);
app.use('/orders', orders);



// Configuring PORT to start server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT} ⚡`);
    connection.connect((err: any) => {
        if (err) throw err;
        console.log('Database Connected Successfully!');
    });
});