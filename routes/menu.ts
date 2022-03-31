const menurouter = require("express").Router();
const menu = require("../controllers/menu");

menurouter
    .route("/")
    .get( menu.getAllItems)
    .post(menu.addItem);
  
menurouter
    .route("/:name")
    .get(menu.getItemByName);

menurouter
    .route("/:id")
    .get(menu.getItemByID)
    .delete(menu.deleteItemByID);

module.exports = menurouter;