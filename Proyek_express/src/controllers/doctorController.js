const db = require("../models/index");
const joi = require("joi").extend(require('@joi/date'));
const multer = require("multer");
const fs = require("fs");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
const upload = multer({
    dest : "./uploads",
})


// Get User
const getUserByID = async(req, res) => {
    const {id} = req.params
    const get_user = await db.User.findOne({
        where: {
            id: id
        },
        attributes: ["id", "display_name", "email", "phone_number", "birthdate", "profile_picture"]
    })

    return res.status(200).send(get_user);
}

const getAllUserByID = async(req, res) => {
    const get_all_user = await db.User.findAll()

    return res.status(200).send(get_all_user)
}

module.exports = {
    getUserByID
}