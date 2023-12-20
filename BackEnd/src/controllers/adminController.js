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
    limits: { fileSize: 3000000 },
})
const { Op } = db.Sequelize

function dateToString(tanggal){
    return (tanggal.toISOString().slice(0, 10).replace('T', ' '))
}

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
    updateRecipe: async function(req, res){
        const recipe_id = req.params.id;
        const name = req.body.name;
        const desc = req.body.description;
        const ingredientsName = req.body.ingredientsName;
        const ingredientsQty = req.body.ingredientsQty;
        const ingredientsUom = req.body.ingredientsUom;
        const steps = req.body.steps;
        const path = req.body.image_url;
        const calories = req.body.calories;
        const carbo = req.body.carbo;
        const protein = req.body.protein;
        const fat = req.body.fat;
    
        console.log(recipe_id)
        console.log(steps)
        let resepUpdate = await db.Recipes.update({
            name: name,
            description: desc,
            image_url : path,
            calories : calories,
            carbo : carbo,
            protein : protein,
            fat : fat
        }, 
        {
            where: {
                id: recipe_id
            }
        })

        let bahan = await db.Ingredients.update({
            name: ingredientsName,
            qty: ingredientsQty,
            uom: ingredientsUom,
        }, 
        {
            where: {
                recipe_id: recipe_id
            }
        })

        let panjangBahan = JSON.parse(ingredientsName).length;
        let panjangLangkah = JSON.parse(steps).length;

        let langkah = await db.Steps.update({
            desc: steps,
        }, 
        {
            where: {
                recipe_id: recipe_id
            }
        })

        const result = {
            "recipe_id" : recipe_id,
            "name" : name,
            "description" : desc,
            "by" : "admin",
            "total_ingredients" : panjangBahan,
            "total_steps" : panjangLangkah,
            "image_url" : path,
            "suka" : 0,
            "rating" : 0,
        }
        res.status(201).json(result);
    },
    addRecipe: async function(req, res){
        const doctorId = -1; //-1 kalo admin
        const name = req.body.name;
        const desc = req.body.description;
        const ingredientsName = req.body.ingredientsName;
        const ingredientsQty = req.body.ingredientsQty;
        const ingredientsUom = req.body.ingredientsUom;
        const steps = req.body.steps;
        const path = req.body.image_url;
        const calories = req.body.calories;
        const carbo = req.body.carbo;
        const protein = req.body.protein;
        const fat = req.body.fat;

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
            calories : calories,
            carbo : carbo,
            protein : protein,
            fat : fat
        })

        let panjangBahan = JSON.parse(ingredientsName).length;
        let panjangLangkah = JSON.parse(steps).length;

        let bahan = await db.Ingredients.create({
            name: ingredientsName,
            qty: ingredientsQty,
            uom: ingredientsUom,
            recipe_id: newId
        })
        
        let langkah = await db.Steps.create({
            desc: steps,
            recipe_id: newId
        })
        

        const result = {
            "recipe_id" : newId,
            "doctor_id" : doctorId,
            "name" : name,
            "description" : desc,
            "by" : "admin",
            "total_ingredients" : panjangBahan,
            "total_steps" : panjangLangkah,
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
            fs.renameSync(req.file.path, req.file.path.replace("uploads", "assets"))
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
            desc: getRecipe.description,
            like : getRecipe.suka,
            rating : getRecipe.rating,
            comments : getRecipe.comments,
            calories : getRecipe.calories,
            carbo : getRecipe.carbo,
            protein : getRecipe.protein,
            fat : getRecipe.fat,
            ingredients : getIngredients,
            steps : step
        })

        return res.status(200).send(resep)
        // return res.status(200).send(getIngredients)
    },
    addDoctor : async function(req, res){
        const { username, email, display_name, birthdate, password, phone_number, address} = req.body;
        console.log(req.body)
        
        const hasil = await db.Doctor.findOne({
            where: {
                username: username,
                email: email
            }
        });
        

        if (hasil){
            return res.status(400).json({msg: "user already_exist"})
        }
        
        const today = new Date();
        const tanggal = new Date(birthdate);
        let umur = today.getFullYear() - tanggal.getFullYear();
        console.log(umur)

        const newUser = db.Doctor.create({
            display_name : display_name,
            email : email,
            username : username,
            password : password,
            birthdate : birthdate,
            address: address,
            phone_number: phone_number,
        })

        const result = {
            "message" : "success",
            "username" : username,
            "email" : email,
            "display_name" : display_name,
            "birthdate" : birthdate,
            "phone_number" : phone_number,
            "address" : address,
        }

        return res.status(201).json(result);
    },
    addDietisian : async function(req, res){
        const {display_name, email, username, password, birthdate, phone_number, address, weight, height, gender} = req.body;
        
        const hasil = await db.User.findOne({
            where: {
                username: username,
                email: email
            }
        });
        

        if (hasil){
            return res.status(400).json({msg: "already_exist"})
        }
        
        const today = new Date();
        const birthDate = new Date(birthdate);
        let umur = today.getFullYear() - birthDate.getFullYear();
        console.log(umur)

        const newUser = db.User.create({
            display_name : display_name,
            email : email,
            username : username,
            password : password,
            birthdate : birthdate,
            balance : 0,
            weight : weight,
            height : height,
            jenis_kelamin : gender,
            age : umur,
            address: address,
            phone_number: phone_number,
        })

        const result = {
            "message" : "success",
            "username" : username,
            "email" : email,
            "display_name" : display_name,
            "birthdate" : birthdate,
            "age" : umur,
            "jenis_kelamin" : gender
        }

        return res.status(201).json(result);
    },
    getAllSubscriptions: async function(req, res){
        const {limit, search} = req.query;        
        let result = [];

        const getSubs = await db.Subscription.findAll({
            attributes: ['id', 'user_id', 'period', 'status', 'invoice_id'],
            order : [
                ['id', 'DESC']
            ]
        })

        for (let i = 0 ; i < getSubs.length; i++){
            if (getSubs[i].dataValues.status == 1){
                if (result.length == 0){
                    const getUser = await db.User.findByPk(getSubs[i].dataValues.user_id)
                    let statusSubs = "";
                    const today = new Date();
                    if (getSubs[i].dataValues.period > today){
                        statusSubs = "active"
                    } else {
                        statusSubs = "expired"
                    }
                    result.push({
                        id  :getSubs[i].dataValues.id,
                        userId : getSubs[i].dataValues.user_id,
                        name: getUser.dataValues.display_name,
                        period : new Date(getSubs[i].dataValues.period).toISOString().slice(0, 10).replace('T', ' '),
                        statusPembayaran: getSubs[i].dataValues.status,
                        status: statusSubs,
                        invoice_id : getSubs[i].dataValues.invoice_id
                    })
                } else {
                    // cek apakah ada user id di result
                    let ada = false;
                    for (let j = 0 ; j < result.length; j++){
                        if (result[j].userId == getSubs[i].dataValues.user_id){
                            ada = true;
                        }
                    }
                    if (!ada){
                        const getUser = await db.User.findByPk(getSubs[i].dataValues.user_id)
                        let statusSubs = "";
                        const today = new Date();
                        if (getSubs[i].dataValues.period > today){
                            statusSubs = "active"
                        } else {
                            statusSubs = "expired"
                        }
                        result.push({
                            id  :getSubs[i].dataValues.id,
                            userId : getSubs[i].dataValues.user_id,
                            name: getUser.dataValues.display_name,
                            period : new Date(getSubs[i].dataValues.period).toISOString().slice(0, 10).replace('T', ' '),
                            statusPembayaran: getSubs[i].dataValues.status,
                            status: statusSubs,
                            invoice_id : getSubs[i].dataValues.invoice_id
                        })
                    }
                }
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
    getSubscriptionsById : async function (req, res){
        const userId = req.params.id;
        const getSubs = await db.Subscription.findAll({
            where: {
                user_id: userId
            }
        })
        const getUser = await db.User.findByPk(userId)
        
        let result = [];
        let totalBayar = 0;
        for (let i = 0 ; i < getSubs.length; i++){
            let statusSubs = "";
            const today = new Date();
            if (getSubs[i].dataValues.period > today && getSubs[i].dataValues.status == 1){
                statusSubs = "active"
            } else {
                statusSubs = "expired"
            }
            if (getSubs[i].dataValues.status == 1){
                totalBayar += 85000;
            }
            result.push({
                id  :getSubs[i].dataValues.id,
                userId : getSubs[i].dataValues.user_id,
                period : new Date(getSubs[i].dataValues.period).toISOString().slice(0, 10).replace('T', ' '),
                statusPembayaran: getSubs[i].dataValues.status,
                status: statusSubs,
                invoice_id : getSubs[i].dataValues.invoice_id,
            })
        }

        return res.status(200).send({
            "message" : "success",
            "user" : getUser,
            "data" : result,
            total : totalBayar,
        })
    },
    getTop3Recipes : async function (req, res){
        const getResep = await db.Recipes.findAll({
            order : [
                ['suka', 'DESC']
            ],
            limit : 3
        })

        let result = [];
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

            result.push({
                recipe_id: getResep[i].dataValues.id,
                name: getResep[i].dataValues.name,
                image  :getResep[i].dataValues.image_url,
                description: getResep[i].dataValues.description,
                like : getResep[i].dataValues.suka,
                rating : getResep[i].dataValues.rating,
                ingredients,
                steps
            })
        }

        return res.status(200).send({
            "message" : "success",
            "data" : result
        })
    },
}