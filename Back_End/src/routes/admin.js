const { Router } = require('express');
const adminController = require("../controllers/adminController");
const router = Router();

router.get("/resep", adminController.getAllResep);
router.get("/users", adminController.getAllUser);
router.post("/add_recipe", adminController.addRecipe);
router.post("/image/:name", adminController.uploadImage);
router.get("/users/:role/:id", adminController.getUserById);
router.get("/resep/:recipe_id", adminController.getRecipeById);
router.post("/users/doctor", adminController.addDoctor);
router.post("/users/dietisian", adminController.addDietisian);
router.get("/getTop3Recipes", adminController.getTop3Recipes);

module.exports = router