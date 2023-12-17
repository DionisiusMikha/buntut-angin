const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();

router.get("/", userController.getAllUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/addRatingComment", userController.ratingComment);
router.get("/getUserByID/:id", userController.getUserByID);
router.get("/getLoginUser", userController.getLoginUser);
router.put("/edit/:id_user", userController.editUser);
router.put("/edit-picture/:id_user", userController.editProfilePicture);
router.get("/cekProfil", userController.cekProfilKonsultan);
router.get("/profile-picture/:id_user", userController.getProfilePicture);
router.get("/resep", userController.getAllResep);
router.get("/jadwal", userController.getSchedule);
router.post("/janjian/:username", userController.janjian);
router.post("/subscription/:username", userController.subscription);
router.post("/changeStatusSubscription/:id", userController.changeStatusSubscription);
router.put("/updateLike/:id", userController.updateLike);


module.exports = router;