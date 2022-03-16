const homerouter = require("express").Router();
const home = require("../controllers/home");

homerouter.get("/", home.homepage);

module.exports = homerouter;