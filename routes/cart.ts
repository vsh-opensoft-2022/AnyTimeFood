const cartRouter = require("express").Router();
const cart = require("../controllers/cart");

cartRouter
    .route("/")
    .get(cart.getCartItems)
    .post(cart.addToCart)
    .patch(cart.updateItem)
    .delete(cart.deleteItem);


module.exports = cartRouter;