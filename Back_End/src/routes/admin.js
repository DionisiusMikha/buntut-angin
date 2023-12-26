const { Router } = require('express');
const adminController = require("../controllers/adminController");
const router = Router();

router.get("/resep", adminController.getAllResep);
router.get("/users", adminController.getAllUser);
router.post("/add_recipe", adminController.addRecipe);
router.post("/image/:name", adminController.uploadImage);
router.get("/users/:role/:id", adminController.getUserById);
router.get("/resep/:recipe_id", adminController.getRecipeById);

module.exports = router