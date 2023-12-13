const { Router } = require("express");
const adminController = require("../controllers/adminController")
const router = Router();

// resep
router.get("/resep", adminController.getAllResep);
router.get("/getTop3Recipes", adminController.getTop3Recipes);
router.post("/resep", adminController.addRecipe);
router.put("/resep/:id", adminController.updateRecipe);
router.get("/resep/:id", adminController.getRecipeById);

// user
router.get("/users", adminController.getAllUsers);
router.post("/users/doctor", adminController.addDoctor);
router.post("/users/dietisian", adminController.addDietisian);
router.get("/users/:role/:id", adminController.getUserById);

// image
router.post("/image/:name", adminController.uploadImage);

// subs
router.get("/subs", adminController.getAllSubscriptions);
router.get("/subs/:id", adminController.getSubscriptionsById);

module.exports = router;