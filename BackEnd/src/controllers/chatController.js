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
        console.log(req.body)
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
        const { username } = req.query;

        try {
            const result = await db.Room.findAll({
                where: {
                    username: {
                        [Op.like]: `%${username}%`
                    }
                }
            })
    
            return res.status(200).send(result);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}