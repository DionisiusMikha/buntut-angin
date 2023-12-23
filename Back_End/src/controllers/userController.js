require("dotenv").config()
const User = require('../models/users');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");

function convertDate(tanggal) {
    const [day, month, year] = tanggal.split('/');

    const dateTime = new Date(`${year}-${month}-${day}T11:00:00`);
    return dateTime;
}

function dateToString(tanggal){
    return (tanggal.toISOString().slice(0, 10).replace('T', ' '))
}

module.exports = {
    getAllUser: async function(req, res){
        const users = await User.find();
        return res.status(200).json(users);
    },
    registerUser: async function(req, res){
        const {display_name, email, username, password, birthdate, phone_number, address, weight, height, gender} = req.body;

        const hasil = await User.findOne({
            email: email,
            username: username
        })

        if (hasil){
            const result = {
                "message" : "User already exists"
            }
            res.status(400).json(result);
        }
        else {
            const newUser = new User({
                display_name,
                email,
                username,
                password,
                birthdate: convertDate(birthdate),
                phone_number,
                address,
                weight,
                height,
                gender
            })
            try {
                const insertedUser = await newUser.save();
                const result = {
                    "message" : "New user added",
                    "display_name" : display_name,
                    "username" : username,
                    "email" : email,
                    "birthdate" : dateToString(birthdate),
                    "phone_number" : phone_number,
                    "address" : address,
                    "weigth" : weight,
                    "height" : height,
                    "gender" : gender
                }
                res.status(201).json(result);
            }
            catch(err){
                res.status(500).json({message: err.message});
            }
        }
    },
    loginUser: async function(req, res){
        const {username, password} = req.body

        const checkUser = await User.findOne({
            username: username
        })

        if (!checkUser){
            const result = {
                "message" : "User not found"
            }
            res.status(404).json(result);
        }
        else {
            if (checkUser.password == password){
                const token = jwt.sign({
                    username: username,
                }, PRIVATE_KEY, {
                    expiresIn: 86400
                })
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
    getLoginUser: async function(req, res){
        const token = req.headers['x-auth-token'];
        if (!token){
            return res.status(401).json({
                "message" : "Unauthorized!"
            })
        }
        else {
            try {
                const userLogin = jwt.verify(token, PRIVATE_KEY);
                const user = await User.findOne(userLogin.username);

                if (!user){
                    const result = {
                        "message" : "User not found"
                    }
                    res.status(404).json(result);
                }
            }
            catch(err){
                return res.status(500).send('Invalid JWT Key');
            }
        }
    },
    editUser: async function(req, res){
        const idUser = req.params.id_user;
        const {display_name, email, username, password, birthdate, phone_number, address, weight, height, gender} = req.body;

        const checkUser = User.findOne({
            _id: idUser
        })

        if (!checkUser){
            const result = {
                "message" : "User not found"
            }
            res.status(404).json(result);
        }
        else {
            if (checkUser.username == username){
                const result = {
                    "message" : "User already exists"
                }
                res.status(400).json(result);
            }
            else {
                
            }
        }
    }
}