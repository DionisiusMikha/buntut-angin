const db = require("../models/index");
const { Op } = require("sequelize");
const axios = require("axios")
const joi = require("joi").extend(require('@joi/date'));
const multer = require("multer");
const fs = require("fs");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");

module.exports = {
    sendMessage: async function (req, res){
        // const chat_id = req.body.chat_id
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
    getUsername: async function (req, res){
        const { room_id } = req.params;
        const username = await db.Room.findOne({    
            where: {
                room_id: room_id
            },
            attributes: ["name", "username"]
        })

        return res.status(200).json(username);
    },
    getRooms: async function (req, res){
        const { username, search } = req.query;
        try {
            const room = await db.Room.findAll()
            let ruang = [];
            for(let i = 0; i < room.length; i++){
                if(room[i].username.includes(username)){
                    let user = JSON.parse(room[i].username);
                    let anotherUser = "";
                    if(user[0] == username){
                        anotherUser = user[1];
                    } else {
                        anotherUser = user[0];
                    }
                    ruang.push({
                        room_id: room[i].room_id,
                        name: room[i].name,
                        username: user,
                        anotherUser: anotherUser
                    });
                }
            }

            // search
            if(search != ""){
                ruang = ruang.filter((item) => {
                    return item.anotherUser.toLowerCase().includes(search.toLowerCase());
                });
            }
            return res.status(200).send(ruang);
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    addRooms : async function(req, res){
        const {user1, user2, name} = req.body;
        const allRoom = await db.Room.findAll({
            attributes: ["room_id"],
            order : [["room_id", "DESC"]]
        });
        let room_id = 0;
        if(allRoom.length == 0){
            room_id = 1;
        } else {
            let hasil = parseInt((allRoom[0].room_id).substring(4,5));           
            room_id = hasil + 1;
        }
        const newRoom = await db.Room.create({
            room_id: `ROOM${room_id}`,
            name: name,
            username: JSON.stringify([user1, user2])
        });
        return res.status(201).json({
            message: "Room added!",
            room: {
                room_id: newRoom.room_id,
                name: newRoom.name,
                username: {
                    user1: user1,
                    user2: user2
                }
            }
        })
    },
    getAnotherUsername: async function (req, res){
        const { username, roomId } = req.query;
        const room = await db.Room.findByPk(roomId);
        console.log(room.dataValues.username);
        let user = JSON.parse(room.dataValues.username);
        let anotherUser = "";
        if(user[0] == username){
            anotherUser = user[1];
        } else {
            anotherUser = user[0];
        }
        return res.status(200).json(anotherUser);
    }
}