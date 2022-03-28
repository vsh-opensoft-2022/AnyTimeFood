const orderRouter = require("express").Router();
const orders = require("../controllers/orders");

orderRouter.get("/:uid", orders.getAllOrders);
orderRouter.get("/:uid/:id", orders.getOrderbyID);
orderRouter.post("/:uid", orders.addOrder);
orderRouter.post("/feedback/:orderId", orders.addOrderFeedback);

module.exports = orderRouter;