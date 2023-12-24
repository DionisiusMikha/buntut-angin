const { Router } = require('express');
const doctorController = require("../controllers/doctorController");
const router = Router();

router.post("/register", doctorController.registerDoctor);
router.post("/login", doctorController.loginDoctor);

module.exports = router;