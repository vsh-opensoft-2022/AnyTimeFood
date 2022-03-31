const cartRouter = require("express").Router();
const cart = require("../controllers/cart");

cartRouter
    .route("/:uid")
    .get(cart.getCartItems)
    .post(cart.addItem)
    .patch(cart.updateItemCount)
    .delete(cart.clearCart);


module.exports = cartRouter;