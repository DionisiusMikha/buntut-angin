require("dotenv").config()
const User = require('../models/users');
const Doctor = require('../models/doctor');
const Recipe = require("../models/recipes");
const Ingredient = require("../models/ingredients");
const Step = require('../models/steps');
const Subscription = require('../models/subscription')
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
const multer = require('multer');
const fs = require('fs');

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

function convertDate(tanggal) {
    const [day, month, year] = tanggal.split('/');
    const dateTime = new Date(`${year}-${month}-${day}T11:00:00`);
    return dateTime;
}

module.exports = {
    getAllResep: async function(req, res){
        const {limit, search} = req.query;
        const getResep = await Recipe.find();

        let resep = [];
        for (let i = 0; i < getResep.length; i++){
            const getIngredients = await Ingredient.find({
                recipe_id: getResep[i]._id
            })
            const getSteps = await Step.find({
                recipe_id: getResep[i]  ._id
            })

            let ingredients = [];
            for (let j = 0 ; j < getIngredients.length; j++){
                ingredients.push(getIngredients[j].name + " " + getIngredients[j].qty + " " + getIngredients[j].uom)
            }

            let steps = [];
            for (let j = 0; j < getSteps.length; j++){
                steps.push(getSteps[j].desc)
            }

            resep.push({
                recipe_id: getResep[i]._id,
                name: getResep[i].name,
                description: getResep[i].desc,
                like: getResep[i].like,
                ingredients,
                steps
            })
        }
        return res.status(200).json(resep);
    },
    getAllUser: async function(req, res){
        const {limit, filter, search} = req.query;
        let result = [];

        if (filter == "dietisian"){
            const getDietisian = await User.find()
            for (let i = 0; i < getDietisian.length; i++){
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
        else if (filter == "doctor"){
            const getDoctor = await Doctor.find()
            for (let i = 0; i < getDoctor.length; i++){
                result.push({
                    id  :getDoctor[i]._id,
                    name: getDoctor[i].display_name,
                    email: getDoctor[i].email,
                    username: getDoctor[i].username,
                    phone_number: getDoctor[i].phone_number,
                    birthdate: getDoctor[i].birthdate,
                    address: getDoctor[i].address,
                    profile_picture: getDoctor[i].profile_picture,
                    role: "Konsultan"
                })
            }
        }
        else {
            const getDietisian = await User.find();
            const getDoctor = await Doctor.find();
            for (let i = 0; i < getDietisian.length; i++){
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

            for (let i = 0; i < getDoctor.length; i++){
                result.push({
                    id  :getDoctor[i]._id,
                    name: getDoctor[i].display_name,
                    email: getDoctor[i].email,
                    username: getDoctor[i].username,
                    phone_number: getDoctor[i].phone_number,
                    birthdate: getDoctor[i].birthdate,
                    address: getDoctor[i].address,
                    profile_picture: getDoctor[i].profile_picture,
                    role: "Konsultan"
                })
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
        }
    },
    addRecipe: async function(req, res){
        const doctorId = -1;
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
    updateRecipe: async function(req, res){
        const { recipe_id } = req.params;
        const { name, description, ingredientsName, ingredientsQty, ingredientsUom, steps, image_url, calories, carbo, protein, fat } = req.body;

        let updateRecipe = await Recipe.updateOne({
            _id: recipe_id
        }, {
            $set: {
                name,
                description,
                image_url,
                calories,
                carbo,
                protein,
                fat
            }
        })

        let bahan = await Ingredient.updateOne({
            recipe_id: recipe_id
        }, {
            $set: {
                name: ingredientsName,
                qty: ingredientsQty,
                uom: ingredientsUom
            }
        })

        let panjangBahan = JSON.parse(ingredientsName).length;
        let panjangLangkah = JSON.parse(steps).length;

        let langkah = await Step.updateOne({
            recipe_id: recipe_id
        }, {
            $set: {
                desc: steps
            }
        })

        const result = {
            "recipe_id" : recipe_id,
            "name" : name,
            "description" : description,
            "by" : "admin",
            "total_ingredients" : panjangBahan,
            "total_steps" : panjangLangkah,
            "image_url" : image_url,
            "like" : 0,
            "rating" : 0
        }
        res.status(200).json(result);
    },
    uploadImage: async function(req, res){
        const uploadFile = upload.single("picture")
        uploadFile(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).send({ msg: "File too large" });
            } else if (err) {
                return res.status(400).send({ msg: "File not supported" });
            }
            fs.renameSync(req.file.path, req.file.path.replace("uploads", "assets"))
            res.status(200).json(req.file);
        })
    },
    getUserById: async function(req, res){
        const {role, id} = req.params;

        if (role == "Dietisian"){
            const getDietisian = await User.findOne({
                _id: id
            })
            return res.status(200).send(getDietisian)
        }
        else if (role == "Konsultan"){
            const getDoctor = await Doctor.findOne({
                _id: id
            })
            return res.status(200).send(getDoctor);
        }
    },
    getRecipeById: async function(req, res){
        const {recipe_id} = req.params;
        let resep = [];
        const getRecipe = await Recipe.findOne({
            _id: recipe_id
        })

        const getIngredients = await Ingredient.find({
            recipe_id: recipe_id,
        }).select('name qty uom')

        const getSteps = await Step.find({
            recipe_id: recipe_id,
        }).select('desc')

        let step = [];
        for (let i = 0; i < getSteps.length; i++){
            step.push(getSteps[i].desc)
        }

        resep.push({
            recipe_id: getRecipe._id,
            name: getRecipe.name,
            image: getRecipe.image_url,
            desc: getRecipe.desc,
            like: getRecipe.like,
            rating: getRecipe.rating,
            comments: getRecipe.comments,
            calories: getRecipe.calories,
            carbo: getRecipe.carbo,
            protein: getRecipe.protein,
            fat: getRecipe.fat,
            ingredients: getIngredients,
            steps: step
        })
        return res.status(200).send(resep)
    },
    addDoctor: async function(req, res){
        const { username, email, display_name, birthdate, password, phone_number,address } = req.body;

        const checkDoctor = await Doctor.findOne({
            username: username,
            email: email
        });

        if (checkDoctor){
            const result = {
                "message" : "User already exists"
            }
            res.status(400).json(result);
        }
        else {
            const today = new Date();
            const tanggal = new Date(birthdate);
            let umur = today.getFullYear() - tanggal.getFullYear();

            const newDoctor = new Doctor({
                display_name,
                email,
                username,
                password,
                birthdate: convertDate(birthdate),
                address,
                phone_number
            })

            try {
                let insertedDoctor = await newDoctor.save();
                const result = {
                    "message" : "Doctor added",
                    "username" : username,
                    "email" : email,
                    "display_name" : display_name,
                    "birthdate" : birthdate,
                    "address" : address,
                }
                res.status(201).json(result);
            }
            catch(err){
                return res.status(400).json({msg: err.message});
            }
        }
    },
    addDietisian: async function(req, res){
        const {display_name, email, username, password, birthdate, phone_number, address, weight, height, gender} = req.body;

        const checkUser = await User.findOne({
            username: username,
            email: email
        })

        if (checkUser){
            const result = {
                "message" : "User already exists"
            }
            res.status(400).json(result);
        }
        else {
            const today = new Date();
            const tanggal = new Date(birthdate);
            let umur = today.getFullYear() - tanggal.getFullYear();

            const newUser = new User({
                display_name,
                email,
                username,
                password,
                birthdate: convertDate(birthdate),
                balance: 0,
                weight,
                height,
                gender,
                address,
                phone_number
            })

            try {
                let insertedUser = await newUser.save();

                const result = {
                    "message" : "User added",
                    "username" : username,
                    "email" : email,
                    "display_name" : display_name,
                    "birthdate" : birthdate,
                    "age" : umur,
                    "jenis_kelamin" : genders
                }
                res.status(201).json(result);
            }
            catch(err){
                return res.status(400).json({msg: err.message});
            }
        }
    },
    getTop3Recipes : async function (req, res){
        const getResep = await Recipe.find()
                         .sort({like: 'desc'})
                         .limit(3)
        
        let result = [];
        for (let i = 0; i < getResep.length; i++){
            const getIngredients = await Ingredient.find({
                recipe_id: getResep[i]._id
            })

            const getSteps = await Step.find({
                recipe_id: getResep[i]._id
            })

            let ingredients = [];
            for (let j = 0; j < getIngredients.length; j++){
                ingredients.push(getIngredients[j].name + " " + getIngredients[j].qty + " " + getIngredients[j].uom)
            }

            let steps = [];
            for (let j = 0; j < getSteps.length; j++){
                steps.push(getSteps[j].desc)
            }

            result.push({
                recipe_id: getResep[i]._id,
                name: getResep[i].name,
                image: getResep[i].image_url,
                description: getResep[i].desc,
                like: getResep[i].like,
                rating: getResep[i].rating,
                ingredients,
                steps
            })
        }

        res.status(200).json(result)
    },
    getAllSubscriptions: async function(req, res){
        const {limit, search} = req.query;        
        let result = [];

        const getSubs = await Subscription.find()
                        .select('id user_id period status invoice_id')
                        .sort({_id: 'desc'})
        
        for (let i = 0; i < getSubs.length; i++){
            if (getSubs[i].status == 1){
                if (result.length == 0){
                    const getUser = await User.findOne({
                        _id: getSubs[i].user_id
                    })

                    let statusSubs = "";
                    const today = new Date();
                    
                    if (getSubs[i].period > today){
                        statusSubs = "active"
                    }
                    else {
                        statusSubs = "expired"
                    }
                    result.push({
                        id  :getSubs[i]._id,
                        userId : getSubs[i].user_id,
                        name: getUser.display_name,
                        period : new Date(getSubs[i].period).toISOString().slice(0, 10).replace('T', ' '),
                        statusPembayaran: getSubs[i].status,
                        status: statusSubs,
                        invoice_id : getSubs[i].invoice_id
                    })
                }
                else {
                    let ada = false;
                    for (let j = 0; j < result.length; j++){
                        if (result[j].userId == getSubs[i].user_id){
                            ada = true;
                        }
                    }
                    if (!ada){
                        const getUser = await User.findOne({
                            _id: getSubs[i].user_id
                        })

                        let statusSubs = "";
                        const today = new Date();
                        if (getSubs[i].period > today){
                            statusSubs = "active"
                        }
                        else {
                            statusSubs = "expired"
                        }
                        result.push({
                            id  :getSubs[i]._id,
                            userId : getSubs[i].user_id,
                            name: getUser.display_name,
                            period : new Date(getSubs[i].period).toISOString().slice(0, 10).replace('T', ' '),
                            statusPembayaran: getSubs[i].status,
                            status: statusSubs,
                            invoice_id : getSubs[i].invoice_id
                        })
                    }
                }
            }
        }
        result.sort((a, b) => {
            if (a.name < b.name){
                return -1
            }
            if (a.name > b.name){
                return 1
            }
            return 0
        })

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
    getSubscriptionsById: async function(req, res){
        const { user_id } = req.params;
        const getSubs = await Subscription.find({
            user_id: user_id
        })
        const getUser = await User.findOne({
            _id: user_id
        })

        let result = [];
        let totalBayar = 0;
        for (let i = 0; i < getSubs.length; i++){
            let statusSubs = "";
            const today = new Date();
            if (getSubs[i].period > today && getSubs[i].status == 1){
                statusSubs = "active"
            }
            else {
                statusSubs = "expired"
            }
            if (getSubs[i].status == 1){
                totalBayar += 85000
            }
            result.push({
                id  :getSubs[i]._id,
                userId : getSubs[i].user_id,
                period : new Date(getSubs[i].period).toISOString().slice(0, 10).replace('T', ' '),
                statusPembayaran: getSubs[i].status,
                status: statusSubs,
                invoice_id : getSubs[i].invoice_id,
            })
        }
        return res.status(200).send({
            "message" : "success",
            "user" : getUser,
            "data" : result,
            total : totalBayar,
        })
    }
}