const userRouter = require("./user");
const doctorRouter = require("./doctor");
const adminRouter = require("./admin");
const { Router } = require("express");

const router = Router();
router.use("/users", userRouter);
router.use("/doctor", doctorRouter);
router.use("/admin", adminRouter)


module.exports = router;