const homerouter = require("express").Router();
const home = require("../controllers/home");

homerouter.get("/", home.getPopularitems);

module.exports = homerouter;