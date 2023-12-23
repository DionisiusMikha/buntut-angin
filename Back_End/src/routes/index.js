const userRouter = require('./users');
const doctorRouter = require('./doctor')
const { Router } = require('express');

const router = Router();
router.use("/users", userRouter);
router.use("/doctor", doctorRouter);

module.exports = router