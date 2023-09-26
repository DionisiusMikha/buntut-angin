const { Router } = require("express");
const doctorController = require("../controllers/doctorController");
const router = Router();

const {
    getUserByID
} = doctorController

router.get("/get-user-by-id/:id", getUserByID);

module.exports = router;