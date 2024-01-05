const { Router } = require('express');
const userController = require("../controllers/userController");
const router = Router();

router.get("/tes", userController.test);
router.get("/", userController.getAllUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getLoginUser", userController.getLoginUser);
router.put("/edit/:id_user", userController.editUser);
router.put("/profile_picture/:id_user", userController.editProfilePicture);
router.get("/cek-profile", userController.cekProfileDoctor);
router.get("/users/:id_user", userController.getUserByID);
router.put("/updateLike/:recipe_id", userController.updateLike);
router.get("/resep", userController.getAllResep);
router.get("/visitor-count", userController.visitorCount);
router.post("/addRatingComment", userController.ratingComment);
router.post("/pengajuan-konsultasi", userController.ajukanKonsultasi);
router.get("/jadwal", userController.getSchedule);
router.post("/subscription/:username", userController.subscription);
router.post("/changeStatusSubscription/:id", userController.changeStatusSubscription);
router.get("/getAllDoctor", userController.getAllDoctor);
router.put("/send-verification-email", userController.sendVerificationEmail);
router.put("/verify-email", userController.verifyEmail);
router.put("/change-password", userController.changePassword);
router.get("/get-all-email", userController.getAllEmail);


module.exports = router;