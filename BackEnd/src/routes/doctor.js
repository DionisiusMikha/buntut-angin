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

module.exports = router;