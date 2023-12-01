const { Router } = require("express");
const adminController = require("../controllers/adminControllers")
const router = Router();

router.get("/resep", adminController.getAllResep);

module.exports = router()