// user router to handle userinfo requests
const userRouter = require("express").Router();
const userinfo = require("../controllers/userinfo");

userRouter.post("/",userinfo.UserAuthentication);
userRouter
    .route("/:uid")
    .get(userinfo.getUserinfo);
userRouter
    .route("/:uid/addresses")
    .get(userinfo.getUserAddresses)
    .post(userinfo.addAddress);
userRouter
    .route("/:id")
    .delete(userinfo.deleteAddressById);

module.exports = userRouter;