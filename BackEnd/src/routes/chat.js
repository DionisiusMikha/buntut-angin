const { Router } = require("express");
const chatController = require("../controllers/chatController");
const router = Router();

router.post("/message", chatController.sendMessage);

module.exports = router;