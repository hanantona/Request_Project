const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const statusRouter = require("./statusRouter");
const typeRouter = require("./typeRouter");
const typeInfoRouter = require("./typeInfoRouter");
const deliveryDateRouter = require("./deliveryDateRouter");
const deliveryTimeRouter = require("./deliveryTimeRouter");
const requestRouter = require("./requestRouter");

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/status", statusRouter);
router.use("/type", typeRouter);
router.use("/date", deliveryDateRouter);
router.use("/time", deliveryTimeRouter);
router.use("/typeInfo", typeInfoRouter);
router.use("/request", requestRouter);

module.exports = router;
