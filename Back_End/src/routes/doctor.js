const { Router } = require('express');
const doctorController = require("../controllers/doctorController");
const router = Router();

router.post("/register", doctorController.registerDoctor);
router.post("/login", doctorController.loginDoctor);
router.put("/edit/:id_doctor", doctorController.editDoctor);
router.put("/profile_picture/:id_doctor", doctorController.editProfilePicture);
router.post("/add_recipe/:id_doctor", doctorController.addRecipe);
router.post("/viewUser", doctorController.viewUser);
router.post("/recommendation", doctorController.rekomendasiMenu);
router.get("/", doctorController.getAllDoctor);
router.get("/getLoginDoctor", doctorController.getLoginDoctor);
router.get("/users", doctorController.getAllUsers);
router.post("/schedule/:username", doctorController.aturJadwal);

module.exports = router;