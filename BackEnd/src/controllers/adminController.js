const db = require("../models/index");
const joi = require("joi").extend(require('@joi/date'));
const multer = require("multer");
const fs = require("fs");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
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
    // limits: { fileSize: 3000000 },
})
const { Op } = db.Sequelize

//==========================================

module.exports = {
    getAllResep: async function(req, res){
        const {limit, search} = req.query;  
        const getResep = await db.Recipes.findAll();

        let resep = []
        for (let i = 0 ; i < getResep.length; i++){
            const getIngredients = await db.Ingredients.findAll({
                where: {
                    recipe_id: getResep[i].dataValues.id
                }
            });

            const getSteps = await db.Steps.findAll({
                where: {
                    recipe_id: getResep[i].dataValues.id
                }
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
                recipe_id: getResep[i].dataValues.id,
                name: getResep[i].dataValues.name,
                image  :getResep[i].dataValues.image_url,
                description: getResep[i].dataValues.description,
                like : getResep[i].dataValues.suka,
                ingredients,
                steps
            })
        }
        // sort by name
        resep.sort((a, b) => {
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
            resep = resep.slice(0, limit)
        }
        
        // search by name
        if (search !== undefined && search !== ""){
            resep = resep.filter(item => {
                return item.name.toLowerCase().includes(search.toLowerCase())
            })
        }
        return res.status(200).json(resep);
    },
    getAllUsers: async function(req, res){
        const {limit, filter, search} = req.query;        
        let result = [];

        if (filter == "dietisian" ){
            const getDietisian = await db.User.findAll()
            for (let i = 0 ; i < getDietisian.length; i++){
                result.push({
                    id  :getDietisian[i].dataValues.id,
                    name: getDietisian[i].dataValues.display_name,
                    email: getDietisian[i].dataValues.email,
                    username: getDietisian[i].dataValues.username,
                    phone_number: getDietisian[i].dataValues.phone_number,
                    birthdate: getDietisian[i].dataValues.birthdate,
                    address: getDietisian[i].dataValues.address,
                    profile_picture: getDietisian[i].dataValues.profile_picture,
                    role: "Dietisian"
                })
            }
        } else if (filter == "doctor" ){
            const getDoctor = await db.Doctor.findAll()
            for (let i = 0 ; i < getDoctor.length; i++){
                result.push({
                    id  :getDoctor[i].dataValues.id,
                    name: getDoctor[i].dataValues.display_name,
                    email: getDoctor[i].dataValues.email,
                    username: getDoctor[i].dataValues.username,
                    phone_number: getDoctor[i].dataValues.phone_number,
                    birthdate: getDoctor[i].dataValues.birthdate,
                    address: getDoctor[i].dataValues.address,
                    profile_picture: getDoctor[i].dataValues.profile_picture,
                    role: "Konsultan"
                })
            }
        } else {
            const getDietisian = await db.User.findAll()
            const getDoctor = await db.Doctor.findAll()
            for (let i = 0 ; i < getDietisian.length; i++){
                result.push({
                    id  :getDietisian[i].dataValues.id,
                    name: getDietisian[i].dataValues.display_name,
                    email: getDietisian[i].dataValues.email,
                    username: getDietisian[i].dataValues.username,
                    phone_number: getDietisian[i].dataValues.phone_number,
                    birthdate: getDietisian[i].dataValues.birthdate,
                    address: getDietisian[i].dataValues.address,
                    profile_picture: getDietisian[i].dataValues.profile_picture,
                    role: "Dietisian"
                })
            }
            for (let i = 0 ; i < getDoctor.length; i++){
                result.push({
                    id  :getDoctor[i].dataValues.id,
                    name: getDoctor[i].dataValues.display_name,
                    email: getDoctor[i].dataValues.email,
                    username: getDoctor[i].dataValues.username,
                    phone_number: getDoctor[i].dataValues.phone_number,
                    birthdate: getDoctor[i].dataValues.birthdate,
                    address: getDoctor[i].dataValues.address,
                    profile_picture: getDoctor[i].dataValues.profile_picture,
                    role: "Konsultan"
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
    addRecipe: async function(req, res){
        const doctorId = -1; //-1 kalo admin
        const name = req.body.name;
        const desc = req.body.description;
        const ingredients = req.body.ingredients;
        const steps = req.body.steps;
        const path = req.body.image_url;
        const nutrition = req.body.nutrition;

        const noResep = await db.Recipes.findAll();

        let noUrut = noResep.length + 1;
        let newId = "REC" + noUrut.toString().padStart(3, '0');
        
        let resep = await db.Recipes.create({
            id: newId,
            name: name,
            description: desc,
            doctor_id: doctorId,
            suka : 0,
            rating : 0,
            image_url : path,
            nutritions : nutrition
        })

        console.log(req.body)

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
            "by" : "admin",
            "total_ingredients" : ingredients.length,
            "total_steps" : steps.length,
            "image_url" : path,
            "suka" : 0,
            "rating" : 0,
        }
        res.status(201).json(result);
    },
    uploadImage: async function(req, res){
        const uploadFile = upload.single("file")
        uploadFile(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).send({ msg: "File too large" });
            } else if (err) {
                return res.status(400).send({ msg: "File not supported" });
            }
            res.status(200).json(req.file);
        })
    },
    getUserById: async function(req, res){
        const {role, id} = req.params;

        if (role == "Dietisian"){
            const getUser = await db.User.findByPk(id)
            return res.status(200).send(getUser)
        } else if (role == "Konsultan"){
            const getDoctor = await db.Doctor.findByPk(id)
            return res.status(200).send(getDoctor)
        }
    },
    getRecipeById: async function(req, res){
        const id = req.params.id;
        let resep = [];
        const getRecipe = await db.Recipes.findOne({
            where: {
                id: id
            }
        })

        const getIngredients = await db.Ingredients.findAll({
            where: {
                recipe_id: id
            }, 
            attributes : ['name', 'qty', 'uom']
        })

        const getSteps = await db.Steps.findAll({
            where: {
                recipe_id: id
            },
            attributes: ['desc']
        })

        let step = [];

        for(let i = 0 ; i < getSteps.length; i++){
            step.push(getSteps[i].dataValues.desc )
        }

        resep.push({
            recipe_id: getRecipe.id,
            name: getRecipe.name,
            image :getRecipe.image_url,
            description: getRecipe.description,
            like : getRecipe.suka,
            ingredients : getIngredients,
            steps : step
        })

        return res.status(200).send(resep)
        // return res.status(200).send(getIngredients)
    },
}