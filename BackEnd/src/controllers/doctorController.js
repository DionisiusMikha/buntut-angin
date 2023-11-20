const db = require("../models/index");
const joi = require("joi").extend(require('@joi/date'));
const multer = require("multer");
const fs = require("fs");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
const upload = multer({
    dest : "./uploads",
})
const { Op } = db.Sequelize; 


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

const checkUsername = async(username) => {
    cariUser = await db.Doctor.findAndCountAll({
        where: {
            username: username
        }
    })
    if (cariUser.count > 0){
        throw new Error("Username already exists")
    }
}

module.exports = {
    getUserByID,
    registerDoctor: async function (req, res){
        const uploadFile = upload.single("profile_picture")
        uploadFile(req, res, async function(err){
            if (err instanceof multer.MulterError){
                return res.status(400).json({msg: "File too large"});
            }
            else if (err){
                return res.status(400).json({msg: "File not supported"});
            }

            const {username, email, display_name, date_of_birth, password, confirm_password, phone_number, address} = req.body;

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
                })
            })

            try{
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

            const newUser = db.Doctor.create({
                display_name : display_name,
                email : email,
                username : username,
                password : password,
                phone_number : phone_number,
                birthdate : date_of_birth,
                address: address,
                status: 1,
                profile_picture : `/assets/${username}.png`
            })

            const result = {
                "message" : "Registration Success",
                "username" : username,
                "email" : email,
                "display_name" : display_name,
                "phone_number" : phone_number,
                "address" : address,
                "profile_picture" : `/assets/${username}.png`
            }
            res.status(201).json(result);
        })
    },
    loginDoctor: async function(req, res){
        const {username, password} = req.body;
        const checkUser = await db.Doctor.findOne({
            where: {
                username: username
            }
        })

        if (checkUser == null){
            const result = {
                "message" : "Doctor not found"
            }
            return res.status(404).json(result);
        }
        else {
            if (checkUser.dataValues.password == password){
                // const role = checkUser.dataValues.role;
                const token = jwt.sign({
                    id: checkUser.id,
                    username: username,
                    // role: role
                }, PRIVATE_KEY, {
                    expiresIn: 86400
                });

                const result = {
                    "message" : "Login success",
                    "token" : token,
                    // "role" : role
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
    editDoctor: async function(req, res){
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

            const checkUser = await db.Doctor.findByPk(idUser)
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
                        const updateUser = await db.Doctor.update({
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
    addRecipe: async function(req, res){
        const doctorId = req.body.doctor_id;
        const name = req.body.name;
        const desc = req.body.description;
        const ingredients = req.body.ingredients;
        const steps = req.body.steps;

        const cekDokter = await db.Doctor.findByPk(doctorId);
        const noResep = await db.Recipes.findAll();

        if (!cekDokter){
            const result = {
                "message" : "Doctor not found"
            }
            res.status(404).json(result);
        }
        else { 
            let noUrut = noResep.length + 1;
            let newId = "REC" + noUrut.toString().padStart(3, '0');
            let resep = await db.Recipes.create({
                id: newId,
                name: name,
                description: desc,
                doctor_id: doctorId
            })

            const getResep = await db.Recipes.findAll();
            for (let i = 0 ; i < ingredients.length; i++){
                let bahan = await db.Ingredients.create({
                    name: ingredients[i].name,
                    qty: ingredients[i].qty,
                    uom: ingredients[i].uom,
                    recipe_id: newId
                })
            }

            for (let i = 0; i < steps.length; i++){
                let langkah = await db.Steps.create({
                    desc: steps[i],
                    recipe_id: newId
                })
            }

            const result = {
                "recipe_id" : newId,
                "doctor_id" : doctorId,
                "name" : name,
                "description" : desc,
                "by" : cekDokter.dataValues.display_name,
                "total_ingredients" : ingredients.length,
                "total_steps" : steps.length
            }
            res.status(201).json(result);
        }
    },
    viewUser: async function(req, res){
        const display_name = req.body.display_name;
        const cariUser = await db.User.findAll({
            where: {
                display_name: {
                    [Op.like]: '%'+display_name+'%'
                }
            }
        })

        if (cariUser.length == 0){
            const result = {
                "message" : "User not found"
            }
            res.status(404).json(result);
        }
        else {
            const user = [];
            for (let i = 0; i < cariUser.length; i++){
                user.push({
                    id: cariUser[i].dataValues.id,
                    username: cariUser[i].dataValues.username,
                    display_name: cariUser[i].dataValues.display_name,
                    age: cariUser[i].dataValues.age,
                    height: cariUser[i].dataValues.height,
                    weight: cariUser[i].dataValues.weight,
                    phone_number: cariUser[i].dataValues.phone_number,
                    address: cariUser[i].dataValues.address
                })
            }
    
            const result = {
                user
            }
            res.status(200).json(result);
        }
    },
    rekomendasiMenu: async function(req, res){
        const namaDokter = req.body.nama_dokter;
        const nama = req.body.nama_resep;

        // const cariResep = await db.Recipes.findAll({
        //     where: {
        //         name: {
        //             [Op.like] : '%'+nama+'%'
        //         }
        //     }
        // })

        const cariResep = await db.Recipes.findAll({
            where: {
                name: nama
            }
        })

        const cariDokter = await db.Doctor.findAll({
            where: {
                display_name: namaDokter
            }
        })

        if (cariDokter.length == 0) {
            const result = {
                "message" : "Doctor not found"
            }
            res.status(404).json(result);
        }
        else {
            const newRecommendation = await db.Recommendation.create({
                recipe_id: cariResep[0].dataValues.id,
                doctor_id: cariDokter[0].dataValues.id
            })

            const result = {
                "Nama resep" : nama,
                "Recommended by" : namaDokter
            }
            res.status(201).json(result);
        }
    }
}