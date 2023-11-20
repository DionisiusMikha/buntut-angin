const db = require("../models/index");
const joi = require("joi").extend(require('@joi/date'));
const multer = require("multer");
const fs = require("fs");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
const { date } = require("joi");
const upload = multer({
    dest : "./uploads",
})

//==========================================

const checkUsername = async(username) => {
    cariUser = await db.User.findAndCountAll({
        where: {
            username: username
        }
    })
    if (cariUser.count > 0){
        throw new Error("Username already exists")
    }
}

module.exports = {
    getAllUser: async function (req, res){
        const users = await db.User.findAll();
        return res.status(200).json(users);
    },
    registerUser: async function (req, res){
        const uploadFile = upload.single("profile_picture")
        uploadFile(req, res, async function(err){
            if (err instanceof multer.MulterError){
                return res.status(400).json({msg: "File too large"})
            }
            else if (err){  
                return res.status(400).json({msg: "File not supported"});
            }

            const {username, email, display_name, date_of_birth, password, confirm_password, role, phone_number, address, weight, height} = req.body;

            const schema = joi.object({
                username : joi.string().required().external(checkUsername).messages({
                    'string.empty' : "Invalid data field username",
                    'any.required' : "Invalid data field username",
                    'any.external' : "Username already exists"
                }),
                email : joi.string().email().required().messages({
                    'string.empty' : "Invalid data field email",
                    'any.required' : "Invalid data field email",
                    'string.email' : "Invalid email address"
                }),
                display_name : joi.string().required().messages({
                    'string.empty' : "Invalid data field name",
                    'any.required' : "Invalid data field name"
                }),
                phone_number: joi.string().required().regex(/^[0-9]{11}$/).messages({
                    'string.empty' : "Invalid data field phone number",
                    'any.required' : "Invalid data field phone number",
                    'string.pattern.base' : "Invalid phone number format"
                }),
                date_of_birth : joi.date().format('YYYY-MM-DD').required().messages({
                    'string.empty' : "Invalid data field date",
                    'any.required' : "Invalid data field date",
                    'date.format' : "Invalid date format"
                }),
                password : joi.string().required().messages({
                    'string.empty' : "Invalid data field password",
                    'any.required' : "Invalid data field password"
                }),
                confirm_password : joi.string().required().messages({
                    'string.empty' : "Invalid data field confirm password",
                    'any.required' : "Invalid data field confirm password"
                }),
                address: joi.string().required().messages({
                    'string.empty' : 'Invalid data field address',
                    'any.required' : 'Invalid data field adrress'
                }),
                weight : joi.number().required().messages({
                    'any.integer' : 'Invalid data field weight',
                    'any.required' : 'Invalid data field weight'
                }),
                height : joi.number().required().messages({
                    'any.integer' : 'Invalid data field height',
                    'any.required' : 'Invalid data field height'
                }),
            })

            try {
                await schema.validateAsync(req.body);
            }
            catch(err){
                return res.status(400).json({
                    "message" : err.message
                })
            }

            if (password != confirm_password){
                const result = {
                    "message" : "Password and Confirm Password doesn\'t match"
                }
                res.status(400).json(result);
            }

            fs.renameSync(
                `./uploads/${req.file.filename}`,
                `./assets/${username}.png`
            );
            
            const today = new Date();
            const birthDate = new Date(date_of_birth);
            let umur = today.getFullYear() - birthDate.getFullYear();

            const newUser = db.User.create({
                display_name : display_name,
                email : email,
                username : username,
                password : password,
                phone_number : phone_number,
                birthdate : date_of_birth,
                address: address,
                balance : 0,
                status: 1,
                weight : weight,
                height : height,
                age : umur,
                profile_picture : `/assets/${username}.png`
            })

            const result = {
                "message" : "Registration Success",
                "username" : username,
                "email" : email,
                "display_name" : display_name,
                "phone_number" : phone_number,
                "birthdate" : date_of_birth,
                "address" : address,
                "weight" : weight,
                "height" : height,
                "age" : umur,
                "profile_picture" : `/assets/${username}.png`
            }
            res.status(201).json(result);
        })
    },
    loginUser: async function(req, res){
        const {username, password} = req.body;
        const checkUser = await db.User.findOne({
            where: {
                username: username
            }
        })

        if (checkUser == null){
            const result = {
                "message" : "User not found"
            }
            return res.status(404).json(result);
        }
        else {
            if (checkUser.dataValues.password == password){
                const role = checkUser.dataValues.role;
                const token = jwt.sign({
                    id: checkUser.id,
                    username: username,
                }, PRIVATE_KEY, {
                    expiresIn: 86400
                });

                const result = {
                    "message" : "Login success",
                    "token" : token,
                }
                return res.status(200).json(result);
            }
            else {
                const result = {
                    "message" : "Wrong Password"
                }
                return res.status(400).json(result);
            }
        }
    },
    getLoginUser: async function(req, res){
        const token = req.headers['x-auth-token'];
        if (!token){
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }
        try{
            const userLogin = jwt.verify(token, PRIVATE_KEY);
            const user = await db.User.findByPk(userLogin.id);
            if (!user){
                const result = {
                    "message" : "User not found"
                }
                res.status(404).json(result);
            }
            else {
                const result = {
                    "message" : "User found",
                    data : user
                }
                res.status(200).json(result);
            }
        } catch(err){
            return res.status(400).send('Invalid JWT Key');
        }
    },
    editUser: async function(req, res){
        const uploadFile = upload.single("profile_picture");
        uploadFile(req, res, async function (err){
            if (err instanceof multer.MulterError){
                return res.status(400).send({msg: "File too large"});
            }
            else if (err){
                return res.status(400).send({msg: "File not supported"});
            }
            const idUser = req.params.id_user;
            const {username, email, phone_number, date_of_birth, display_name} = req.body;

            const checkUser = await db.User.findByPk(idUser)
            if (!checkUser){
                const result = {
                    "message" : "User not found"
                }
                res.status(404).json(result);
            }
            else {
                if (checkUser.dataValues.username == username){
                    const result = {
                        "message" : "User already exists"
                    }
                    res.status(400).json(result);
                }
                else {
                    try{
                        const updateUser = await db.User.update({
                            username: username,
                            email: email,
                            phone_number: phone_number,
                            birthdate: date_of_birth,
                            display_name: display_name,
                            profile_picture : `/assets/${checkUser.dataValues.username}.png`
                        }, {
                            where: {
                                id: idUser
                            }
                        })
                        fs.renameSync(
                            `./uploads/${req.file.filename}`,
                            `./assets/${checkUser.dataValues.username}.png`
                        );
                        const result = {
                            "message" : "Data updated",
                            "username" : username,
                            "email" : email,
                            "phone_number" : phone_number,
                            "birthdate" : date_of_birth,
                            "display_name" : display_name,
                            "profile_picture" : `/assets/${checkUser.dataValues.username}.png`
                        }
                        res.status(200).json(result);
                    }
                    catch(err){
                        return res.status(400).json({message: "Error updating data", error: err.message});
                    }
                }
            }
        })
    },
    cekProfilKonsultan: async function(req, res){
        // const idKonsultan = req.params.id_konsultan;
        const token = req.headers['x-auth-token'];
        // console.log(token);
        if (!token){
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }
        else {
            try {
                let userdata = jwt.verify(token, PRIVATE_KEY);
                if (userdata.role == 'dietisian'){
                    const cariKonsultan = await db.User.findAll({
                        where:{
                            role: 'konsultan',
                            status: 1
                        }
                    })
                    if (cariKonsultan.length == 0){
                        const result = {
                            "message" : "Tidak ada konsultan"
                        }
                        res.status(404).json(result);
                    }
                    else {
                        const result = cariKonsultan.map((konsultan) => {
                            return {
                                "Name" : konsultan.dataValues.display_name,
                                "Phone Number" : konsultan.dataValues.phone_number,
                                "Email" : konsultan.dataValues.email
                            }
                        });
                        res.status(200).json(result);
                    }
                }
                else {
                    const result = {
                        "message" : "Bukan dietisian"
                    }
                    res.status(400).json(result);
                }
            }
            catch(err){
                return res.status(400).send('Invalid JWT Key');
            }
        }
    },
    lihat
}