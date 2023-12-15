const { Router } = require("express");
const chatController = require("../controllers/chatController");
const router = Router();

router.post("/message", chatController.sendMessage);
router.get("/get-message/:room_id", chatController.getMessage);
router.get("/get-username/:room_id", chatController.getUsername);
router.get("/get-rooms", chatController.getRooms);
router.post("/rooms", chatController.addRooms);
router.get("/room/:id", chatController.getRoomById);
router.get("/anotherUsername", chatController.getAnotherUsername);


module.exports = router;