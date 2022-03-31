// user router to handle userinfo requests
const userRouter = require("express").Router();
const userinfo = require("../controllers/userinfo");

userRouter.post("/",userinfo.UserAuthentication);
userRouter
    .route("/:uid")
    .get(userinfo.getUserinfo)
    .patch(userinfo.updateinfo);
userRouter
    .route("/:uid/addresses")
    .get(userinfo.getUserAddresses)
    .post(userinfo.addAddress);
userRouter
    .route("/:uid/:id")
    .delete(userinfo.deleteAddressById);

module.exports = userRouter;