import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const home = require("./routes/home");
const menu = require("./routes/menu");
const categories = require("./routes/categories");
const userinfo = require("./routes/userinfo");

// Setup environment variables from .env file.
dotenv.config();

// Initialize express framework.
const app: Express = express();

// Test route to check if API is running.
app.use(express.json());
app.use('/', home);
app.use('/home', home);
app.use('/menu', menu);
app.use('/categories', categories);
app.use('/userinfo', userinfo);

// Configuring PORT to start server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT} ⚡`));