const { Router } = require("express");
const doctorController = require("../controllers/doctorController");
const router = Router();

const {
    getUserByID
} = doctorController

router.get("/get-user-by-id/:id", getUserByID);
router.post("/register", doctorController.registerDoctor);
router.post("/login", doctorController.loginDoctor);
router.post("/recipes", doctorController.addRecipe);
router.post("/viewUser", doctorController.viewUser);
router.post("/rekomendasiMenu", doctorController.rekomendasiMenu);
router.get("/get-jadwal/:id", doctorController.viewJadwal);
router.get("/getLoginUser", doctorController.getLoginUser);
router.get("/users", doctorController.getAllUsers);
router.get("/", doctorController.getAllDoctor);
router.post("/schedule/:username", doctorController.aturJadwal);

module.exports = router;