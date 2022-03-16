const userRouter = require("express").Router();
const userinfo = require("../controllers/userinfo");

userRouter.get("/", userinfo.getUserinfo);
userRouter
    .route("/addresses")
    .get(userinfo.getAllAddresses)
    .post(userinfo.addAddress);

module.exports = userRouter;