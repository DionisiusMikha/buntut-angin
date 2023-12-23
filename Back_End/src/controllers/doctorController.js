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
    }
}