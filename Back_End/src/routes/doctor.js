const { Router } = require('express');
const doctorController = require("../controllers/doctorController");
const router = Router();

router.post("/register", doctorController.registerDoctor);
router.post("/login", doctorController.loginDoctor);
router.put("/edit/:id_doctor", doctorController.editDoctor);
router.put("/profile_picture/:id_doctor", doctorController.editProfilePicture);

module.exports = router;