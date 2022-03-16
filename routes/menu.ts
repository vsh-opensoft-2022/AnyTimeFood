const menurouter = require("express").Router();
const menu = require("../controllers/menu");

menurouter
    .route("/")
    .get( menu.getAllItems)
    .post(menu.addItem);
  
menurouter
    .route("/:name")
    .get(menu.getItemByName);

module.exports = menurouter;