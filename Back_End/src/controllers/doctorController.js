require("dotenv").config()
const Doctor = require('../models/doctor');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");

function convertDate(tanggal) {
    const [day, month, year] = tanggal.split('/');
    const dateTime = new Date(`${year}-${month}-${day}T11:00:00`);
    return dateTime;
}

function dateToString(tanggal) {
    return (tanggal.toISOString().slice(0, 10).replace('T', ' '))
}

module.exports = {
    registerDoctor: async function(req, res){
        const {username, email, display_name, birthdate, password, phone_number, address} = req.body;
        const checkDoctor = await Doctor.findOne({
            username: username,
            email: email
        })

        if (checkDoctor){
            const result = {
                "message" : "User already exists"
            }
            res.status(400).json(result);
        }
        else {
            const newDoctor = new Doctor({
                username,
                email,
                display_name,
                birthdate: convertDate(birthdate),
                password,
                phone_number,
                address
            })
            try {
                const insertedDoctor = await newDoctor.save();
                const result = {
                    "message" : "Doctor added",
                    "username" : username,
                    "email" : email,
                    "display_name" : display_name,
                    "birthdate" : birthdate,
                    "password" : password,
                    "phone_number" : phone_number,
                    "address" : address
                }
                res.status(201).json(result);
            }
            catch(err){
                res.status(500).json({message: err.message});
            }
        }
    },
    loginDoctor: async function(req, res){
        const {username, password} = req.body;

        const checkDoctor = await Doctor.find({
            username: username
        })
        if(!checkDoctor){
            const result = {
                "message" : "Doctor not found"
            }
            res.status(404).json(result);
        }
        else {
            if (checkDoctor.password == password){
                const token = jwt.sign({
                    id: checkDoctor._id,
                    username: username
                }, PRIVATE_KEY, {
                    expiresIn: 86400
                });

                const result = {
                    "message" : "Login success",
                    "token" : token
                }
                res.status(200).json(result);
            }
            else {
                const result = {
                    "message" : "Wrong password"
                }
                res.status(400).json(result);
            }
        }
    },
    editDoctor: async function(req, res){
        const idUser = req.params.id_user;
        const { username, email, phone_number, birthdate, display_name, address, gender } = req.body;

        const checkDoctor = await Doctor.find({
            _id: idUser
        })

        if (!checkDoctor){
            const result = {
                "message" : "Doctor not found"
            }
            res.status(404).json(result);
        }
        else {
            
        }
    }
}