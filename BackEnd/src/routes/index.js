const userRouter = require("./user");
const doctorRouter = require("./doctor");
const adminRouter = require("./admin");
const chatRouter = require("./chat");
const { Router } = require("express");

const router = Router();
router.use("/users", userRouter);
router.use("/doctor", doctorRouter);
router.use("/admin", adminRouter)
router.use("/chats", chatRouter)


module.exports = router;