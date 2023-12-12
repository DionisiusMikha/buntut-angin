const db = require("../models/index");
const axios = require("axios")
const joi = require("joi").extend(require('@joi/date'));
const multer = require("multer");
const fs = require("fs");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");

module.exports = {
    sendMessage: async function (req, res){
        // const chat_id = req.body.chat_id
        const value = req.body.value

        const newChat = await db.Chat.create({
            value: value
        })

        return res.status(201).json({
            message: "Message added!",
            chat: newChat.value
        })
    }
}