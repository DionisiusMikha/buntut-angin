const { Router } = require('express');
const userController = require("../controllers/userController");
const router = Router();

router.get("/", userController.getAllUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getLoginUser", userController.getLoginUser);

module.exports = router;