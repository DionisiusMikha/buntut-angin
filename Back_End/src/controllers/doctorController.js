require("dotenv").config()
const Doctor = require('../models/doctor');
const Recipe = require('../models/recipes');
const Ingredient = require('../models/ingredients');
const Step = require('../models/steps');
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

        const checkDoctor = await Doctor.findOne({
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
        const idDoctor = req.params.id_doctor;
        const { username, email, phone_number, birthdate, display_name, address, gender } = req.body;

        const checkDoctor = await Doctor.find({
            _id: idDoctor
        })

        if (!checkDoctor){
            const result = {
                "message" : "Doctor not found"
            }
            res.status(404).json(result);
        }
        else {
            try {
                const updateDoctor = await Doctor.updateOne({
                    _id: idDoctor
                }, {
                    $set: {
                        username,
                        email,
                        phone_number,
                        birthdate: convertDate(birthdate),
                        phone_number,
                        address,
                        display_name,
                        gender
                    }
                })

                const result = {
                    "message" : "Data Updated!",
                    "username" : username,
                    "email" : email,
                    "phone_number" : phone_number,
                    "birthdate" : birthdate,
                    "display_name" : display_name
                }
                res.status(200).json(result);
            }
            catch(err){
                return res.status(400).json(err.message)
            }
        }
    },
    editProfilePicture: async function(req, res){
        const idDoctor = req.params.id_doctor;
        const uploadFile = upload.single("profile_picture");
        uploadFile(req, res, async function(err){
            if (err instanceof multer.MulterError){
                return res.status(400).send({msg: "File too large"});
            }
            else if (err){
                return res.status(400).send({msg: "File not supported"});
            }

            const checkDoctor = await Doctor.findOne({
                _id: idDoctor
            })
            if (!checkDoctor){
                const result = {
                    "message" : "Doctor not found!"
                }
                res.status(404).json(result);
            }
            else {
                try{
                    const updateProfile = await Doctor.updateOne({
                        _id: idDoctor
                    },{
                        $set: {
                            profile_picture: `/assets/${checkDoctor.username}.png`
                        }
                    })
                    fs.renameSync(
                        `./uploads/${req.file.filename}`,
                        `./assets/${checkDoctor.username}.png`
                    )

                    const result = {
                        "message" : "Profile picture updated!",
                        "profile_picture" : `/assets/${checkDoctor.username}.png`
                    }
                    res.status(200).json(result);
                }
                catch(err){
                    return res.status(400).json({message: "Error updating data", error: err.message});
                }
            }
        })
    },
    addRecipe: async function(req, res){
        const doctorId = req.params.doctor_id;
        const {name, description, calories, carbo, protein, fat, ingredients, steps} = req.body

        const checkDoctor = await Doctor.findOne({
            _id: doctorId
        })
        
        if (!checkDoctor){
            const result = {
                "message" : "Doctor not found!"
            }
            res.status(404).json(result);
        }
        else {
            let newRecipe = new Recipe({
                name,
                description,
                calories,
                carbo,
                protein,
                fat,
                doctorId
            })

            const getRecipe = await Recipe.findOne({
                doctor_id: doctorId
            });

            for (let i = 0; i < ingredients.length; i++){
                let newIngredient = new Ingredient({
                    name: ingredients[i].name,
                    qty: ingredients[i].qty,
                    uom: ingredients[i].uom,
                    recipe: getRecipe._id
                })
            }

            for (let i = 0 ; i < steps.length; i++){
                let newStep = new Step({
                    desc: steps[i],
                    recipe_id: getRecipe._id
                })
            }

            const result = {
                "message" : "New recipe added",
                "doctor_id" : doctorId,
                "name" : name,
                "description" : description,
                "calories" : calories,
                "carbo" : carbo,
                "protein" : protein,
                "fat" : fat,
                "by" : checkDoctor.display_name,
                "total_ingredients" : ingredients.length,
                "total_steps" : steps.length
            }
            res.status(201).json(result);
        }
    }
}