const { Router } = require('express');
const doctorController = require("../controllers/doctorController");
const router = Router();

router.post("/register", doctorController.registerDoctor);

module.exports = router;