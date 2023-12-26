require("dotenv").config()
const Doctor = require('../models/doctor');
const User = require('../models/users');
const Recipe = require('../models/recipes');
const Ingredient = require('../models/ingredients');
const Recommendation = require('../models/recommendation');
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
        const doctorId = req.params.id_doctor;
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
                doctor_id: doctorId
            })
            await newRecipe.save();

            const getRecipe = await Recipe.findOne({
                doctor_id: doctorId
            });

            if (!getRecipe){
                const result = {
                    "message": "Recipe not found for the given doctor!"
                };
                res.status(404).json(result);
            }
            else {
                console.log(getRecipe._id);
                for (let i = 0; i < ingredients.length; i++){
                    let newIngredient = new Ingredient({
                        name: ingredients[i].name,
                        qty: ingredients[i].qty,
                        uom: ingredients[i].uom,
                        recipe_id: getRecipe._id
                    })
    
                    await newIngredient.save();
                }
    
                for (let i = 0 ; i < steps.length; i++){
                    let newStep = new Step({
                        desc: steps[i],
                        recipe_id: getRecipe._id
                    })
    
                    await newStep.save();
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
                    "by" : "Dr. " + checkDoctor.display_name,
                    "total_ingredients" : ingredients.length,
                    "total_steps" : steps.length
                }
                res.status(201).json(result);

            }
        }
    },
    viewUser: async function(req, res){
        const {search} = req.body;
        const searchUser = await User.find({
            display_name: {
                $regex: new RegExp(search, 'i')
            }
        })

        if (searchUser.length === 0){
            const result = {
                "message" : "User not found!"
            }
            res.status(404).json(result);
        }
        else {
            const users = searchUser.map(user => ({
                id: user._id,
                username: user.username,
                display_name: user.display_name,
                age: user.age,
                height: user.height,
                weight: user.weight,
                phone_number: user.phone_number,
                address: user.address
            }));

            const result = {
                users
            }
            res.status(200).json(result);
        }
    },
    rekomendasiMenu: async function(req, res){
        const { nama_dokter, nama_resep } = req.body;
        const searchRecipe = await Recipe.findOne({
            name: nama_resep
        })
        
        const searchDoctor = await Doctor.findOne({
            display_name: nama_dokter
        })

        if (searchDoctor.length == 0){
            const result = {
                "message" : "Doctor not found"
            }
            res.status(404).json(result);
        }
        else {
            if (searchRecipe.length == 0){
                const result = {
                    "message" : "Recipe not found"
                }
                res.status(404).json(result);
            }
            else {
                console.log(searchDoctor._id);
                console.log(searchRecipe._id);
                const newRecommendation = new Recommendation({
                    recipe_id: searchRecipe._id,
                    doctor_id: searchDoctor._id,
                })

                try{
                    const insertRec = await newRecommendation.save();
                    const result = {
                        "Nama resep" : nama_resep,
                        "Recommended by" : "Dr. " + nama_dokter
                    }
                    res.status(201).json(result);
                }
                catch(err){
                    return res.status(400).json({msg: err.message});
                }
            }
        }
    },
    getAllDoctor: async function(req, res){
        const getDoctor = await Doctor.find();

        return res.status(200).json(getDoctor);
    },
    getLoginDoctor: async function(req, res){
        const token = req.headers['x-auth-token'];
        if (!token){
            const result = {
                "message" : "Unauthorized!"
            }
            res.status(401).json(result);
        }
        else {
            try{
                const doctorLogin = jwt.verify(token, PRIVATE_KEY);
                const doctor = await Doctor.findOne(doctorLogin._id);
    
                if (!doctor){
                    const result = {
                        "message" : "Doctor not found"
                    }
                    res.status(404).json(result);
                }
                else {
                    const result = {
                        "message" : "Doctor found",
                        data: doctor
                    }
                    res.status(200).json(result);
                }
            }
            catch(err){
                return res.status(400).send('Invalid JWT Key');
            }
        }
    },
    getAllUsers: async function(req, res){
        const { limit, filter, search } = req.query;
        let result = [];

        if (filter == "dietisian"){
            const getDietisian = await User.find();
            for (let i = 0; i < getDietisian.length; i++) {
                result.push({
                    id: getDietisian[i]._id,
                    name: getDietisian[i].display_name,
                    email: getDietisian[i].email,
                    username: getDietisian[i].username,
                    phone_number: getDietisian[i].phone_number,
                    birthdate: getDietisian[i].birthdate,
                    address: getDietisian[i].address,
                    profile_picture: getDietisian[i].profile_picture,
                    role: "Dietisian"
                })
            }
        }

        // sort by name
        result.sort((a, b) => {
            if (a.name < b.name){
                return -1
            }
            if (a.name > b.name){
                return 1
            }
            return 0
        })

        // limit
        if (limit !== undefined && limit !== ""){
            result = result.slice(0, limit)
        }

        // search by name
        if (search !== undefined && search !== ""){
            result = result.filter(item => {
                return item.name.toLowerCase().includes(search.toLowerCase())
            })
        }

        return res.status(200).send(result)
    },
    aturJadwal: async function(req, res){
        const {username} = req.params;
        const { tanggal, start, end } = req.body

        const searchDoctor = await Doctor.findOne({
            username: username
        })

        if (!tanggal || !start || !end){
            const result = {
                "message" : "Invalid input!"
            }
            res.status(400).json(result);
        }
        else {
            if (!searchDoctor){
                const result = {
                    "message" : "Doctor not found"
                }
                res.status(404).json(result);
            }
            else {
                
            }
        }
    }
}