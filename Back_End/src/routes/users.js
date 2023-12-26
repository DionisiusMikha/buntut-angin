const { Router } = require('express');
const userController = require("../controllers/userController");
const router = Router();

router.get("/", userController.getAllUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getLoginUser", userController.getLoginUser);
router.put("/edit/:id_user", userController.editUser);
router.get("/visitor-count", userController.visitorCount);
router.put("/profile_picture/:id_user", userController.editProfilePicture);
router.get("/getAllDoctor", userController.getAllDoctor);
router.get("/resep", userController.getAllResep);
router.get("/:id_user", userController.getUserByID);
router.put("/updateLike/:recipe_id", userController.updateLike);
router.post("/addRatingComment", userController.ratingComment);


module.exports = router;