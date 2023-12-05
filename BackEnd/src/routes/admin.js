const { Router } = require("express");
const adminController = require("../controllers/adminController")
const router = Router();

router.get("/resep", adminController.getAllResep);
router.post("/resep", adminController.addRecipe);
router.get("/users", adminController.getAllUsers);
router.get("/users/:role/:id", adminController.getUserById);
router.post("/image/:name", adminController.uploadImage);

module.exports = router;