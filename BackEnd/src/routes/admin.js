const { Router } = require("express");
const adminController = require("../controllers/adminController")
const router = Router();

router.get("/resep", adminController.getAllResep);
router.post("/resep", adminController.addRecipe);
router.get("/users", adminController.getAllUsers);

module.exports = router;