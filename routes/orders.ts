const orderRouter = require("express").Router();
const orders = require("../controllers/orders");

orderRouter.get("/", orders.getAllOrders);
orderRouter.post("/", orders.addOrder);
orderRouter.post("/:orderId", orders.addOrderFeedback);

module.exports = orderRouter;