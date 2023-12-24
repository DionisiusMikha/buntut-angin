require("dotenv").config()
const User = require('../models/users');
const Doctor = require('../models/doctor');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
const multer = require('multer');
const fs = require('fs');

function convertDate(tanggal) {
    const [day, month, year] = tanggal.split('/');
    const dateTime = new Date(`${year}-${month}-${day}T11:00:00`);
    return dateTime;
}

function dateToString(tanggal) {
    return (tanggal.toISOString().slice(0, 10).replace('T', ' '))
}

const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + file.mimetype.split("/")[1]
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }, 
    fileFilter : function(req, file, cb){
        if(file.mimetype != "image/png" || file.mimetype != "image/jpeg"){
          return cb(new Error("Wrong file type"), null)
        }
        cb(null, true)
    },
}) 
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 3000000 }
})

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
                gender,
                balance: 0
            })
            try {
                const insertedUser = await newUser.save();
                const result = {
                    "message" : "New user added",
                    "display_name" : display_name,
                    "username" : username,
                    "email" : email,
                    "birthdate" : birthdate,
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
                    id: checkUser._id,
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
                return res.status(400).send('Invalid JWT Key');
            }
        }
    },
    editUser: async function(req, res){
        const idUser = req.params.id_user;
        const {display_name, email, username, password, birthdate, phone_number, address, weight, height, gender} = req.body;

        const checkUser = await User.findOne({
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
                try {
                    const updateUser = await User.updateOne({
                        _id: idUser
                    },{
                        $set: {
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
                        }
                    })

                    const result = {
                        "message" : "Data Updated",
                        "display_name" : display_name,
                        "username" : username,
                        "email" : email,
                        "birthdate" : birthdate,
                        "phone_number" : phone_number,
                        "address" : address,
                        "weight" : weight,
                        "height" : height,
                        "gender" : gender
                    }
                    res.status(200).json(result);
                }
                catch(err){
                    return res.status(500).json({message: err.message});
                }
            }
        }
    },
    editProfilePicture: async function(req, res){
        const idUser = req.params.id_user;
        const uploadFile = upload.single("file");
        uploadFile(req, res, async function(err){
            if (err instanceof multer.MulterError){
                return res.status(400).send({msg: "File too large"});
            }
            else if (err){
                return res.status(400).send({msg: "File not supported"});
            }

            const checkUser = await User.findOne({
                _id: idUser
            })
            if (!checkUser){
                const result = {
                    "message" : "User not found!"
                }
                res.status(404).json(result);
            }
            else {
                try{
                    const updateProfile = await User.updateOne({
                        _id: idUser
                    }, {
                        $set: {
                            profile_picture: `/assets/${checkUser.username}.png`
                        }
                    })
                    fs.renameSync(
                        `./uploads/${req.file.filename}`,
                        `./assets/${checkUser.username}.png`
                    );

                    const result = {
                        "message" : "Data updated!",
                        "profile_picture" : `/assets/${checkUser.username}.png`
                    }
                    res.status(200).json(result);
                }
                catch(err){
                    return res.status(400).json({message: "Error updating data", error: err.message});
                }
            }
        })
    },
    getAllDoctor: async function(req, res){
        const token = req.headers['x-auth-token'];
        if (!token){
            const result = {
                "message" : "Unauthorized"
            }
            res.status(500).json(result);
        }
        else {
            try {
                const cariDokter = await Doctor.find();
                if (cariDokter.length == 0){
                    const result = {
                        "message" : "There's no doctor"
                    }
                    res.status(400).json(result);
                }
                else {
                    const result = cariDokter.map((doctor) => {
                        return {
                            "Name" : doctor.display_name,
                            "Phone number" : doctor.phone_number,
                            "Email" : doctor.email,
                        }
                    })
                    res.status(200).json(result);
                }
            }
            catch(err){
                return res.status(400).send('Invalid JWT Key')
            }
        }
    },
    getUserByID: async function(req, res){
        const id = req.params.id_user;
        const cekUser = await User.findOne({
            _id: id
        })

        if (!cekUser){
            const result = {
                "message" : "User not found"
            }
            res.status(404).json(result);
        }
        else {
            return res.status(200).json(cekUser);
        }
    },

}