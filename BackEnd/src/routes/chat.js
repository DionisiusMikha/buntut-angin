const { Router } = require("express");
const chatController = require("../controllers/chatController");
const router = Router();

router.post("/message", chatController.sendMessage);
router.get("/get-message/:room_id", chatController.getMessage);
router.get("/get-rooms", chatController.getRooms);
router.get("/get-rooms-user", chatController.getRoomsUser);
router.get("/user/:username/:doctor", chatController.findUser);
router.post("/rooms", chatController.addRooms);
router.get("/room/:id", chatController.getRoomId);



module.exports = router;