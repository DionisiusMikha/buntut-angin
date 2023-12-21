const db = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
    sendMessage: async function (req, res){
        const { username, room_id, value } = req.body; 
        // console.log(req.body)
        const newChat = await db.Chat.create({
            username: username,
            room_id: room_id,
            value: value
        })

        return res.status(201).json({
            message: "Message added!",
            chat: newChat.value
        })
    },
    getMessage: async function (req, res){
        const { room_id }  = req.params;

        const result = await db.Chat.findAll({
            where: {
                room_id: room_id
            },
            attributes: ["id", "username", "room_id", "value"]
        })

        return res.status(201).json(result)
    },
    getRooms: async function (req, res){
        const { username, search } = req.query;
        try {
            const room = await db.Room.findAll({
                where: {
                    username_doctor: username,
                    username_user: {
                        [Op.like]: `%${search}%`
                    } 
                }
            })
            
            return res.status(200).send(room);
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    getRoomsUser: async function (req, res){
        const { username, search } = req.query;
        try {
            const room = await db.Room.findAll({
                where: {
                    username_doctor: {
                        [Op.like]: `%${search}%`
                    },
                    username_user: username 
                }
            })
            
            return res.status(200).send(room);
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    addRooms : async function(req, res){
        const { user, doctor } = req.body;
        console.log(user, doctor);
        const allRoom = await db.Room.findAll({
            attributes: ["room_id"],
            order : [["room_id", "DESC"]]
        });

        let room_id = 0;
        if(allRoom.length == 0){
            room_id = 1;
        } else {
            room_id = allRoom.length + 1;
        }

        const newRoom = await db.Room.create({
            room_id: `ROOM${room_id}`,
            username_user: user,
            username_doctor: doctor
        });

        return res.status(201).json({
            message: "Room added!",
            room: {
                room_id: newRoom.room_id,
                name: newRoom.name,
                username: {
                    user1: user,
                    user2: doctor
                }
            }
        })
    },
    getRoomId : async function (req, res){
        const { id } = req.params;
        try {
            const result = await db.Room.findOne({
                where: {
                    room_id: id
                }
            })
    
            return res.status(200).send(result);
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    findUser: async function(req, res){
        const { username, doctor } = req.params;
        try {
            const result = await db.Room.findOne({
                where: {
                    username_user: username,
                    username_doctor: doctor
                }
            })

            if(result){
                return res.status(200).send({message: "exist"});
            }

            return res.status(200).send({message: "null"});
        } catch (error) {
            
        }
    }
}