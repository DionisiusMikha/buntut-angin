require("dotenv").config()
const User = require('../models/users');
const Doctor = require('../models/doctor');
const Recipe = require("../models/recipes");
const Ingredient = require("../models/ingredients");
const Step = require('../models/steps');
const Visitor = require('../models/visitor');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
const multer = require('multer');
const fs = require('fs');
const ip = require('ip');

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
            const today = new Date();
            const birthDate = new Date(convertDate(birthdate));
            let umur = today.getFullYear() - birthDate.getFullYear();
        
            const newUser = new User({
                display_name,
                email,
                username,
                password,
                birthdate: convertDate(birthdate),
                phone_number,
                address,
                age: umur,
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
                    "age" : umur,
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
        const uploadFile = upload.single("profile_picture");
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
                        "message" : "Profile picture updated!",
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
    updateLike: async function(req, res){
        const { recipe_id } = req.params;
        const searchRecipe = await Recipe.findOne({
            _id: recipe_id
        })

        if (!searchRecipe){
            const result = {
                "message" : "Recipe not found"
            }
            res.status(404).json(result);
        }
        else {
            let updateLike = await Recipe.updateOne({
                _id: recipe_id
            },{
                $set: {
                    like: parseInt(searchRecipe.like) + 1
                }
            })

            const result = {
                "message" : "Like added!"
            }
            res.status(200).json(result);
        }
    },
    visitorCount: async function(req, res){
        const ipAddress = ip.address();
        const visitDate = new Date().toISOString().slice(0, 10);

        const newVisitor = new Visitor({
            ip_address: ipAddress,
            date: visitDate
        })
        try {
            let insertedVisitor = await newVisitor.save();
            
            const visitorCount = await Visitor.countDocuments();
            const updateVisitor = await Visitor.updateOne({
                count: null,
            }, {
                $set: {
                    count: visitorCount
                }
            })

            const result = {
                "Visitor count" : visitorCount
            }
            res.status(201).json(result);
        }
        catch(err){
            res.status(400).json({msg: err.message})
        }

    },
    getAllResep: async function(req, res){
        const {search, page} = req.query;
        let offsetValue;

        if (page == 1){
            offsetValue = 0;
        }
        else if (page == 2){
            offsetValue = (page - 1) * 6;
        }
        else {
            offsetValue = ((page - 1) * 6) + 4;
        }

        const getResep = await Recipe.find()
                        .sort({like: 'desc'})
                        .limit(page == 1 ? 6 : 10)
                        .skip(offsetValue + 3);
        let resep = [];
        for (let i = 0; i < getResep.length; i++){
            const getIngredients = await Ingredient.find({
                recipe_id: getResep[i]._id
            })

            const getSteps = await Step.find({
                recipe_id: getResep[i]._id
            })

            let ingredients = [];
            for (let j = 0 ; j < getIngredients.length; j++){
                ingredients.push(getIngredients[j].name + " " + getIngredients[j].qty + " " + getIngredients[j].uom)
            }

            let steps = [];
            for (let j = 0; j < getSteps.length; j++){
                steps.push(getSteps[j].desc)
            }

            let com = "";
            let jumlah = 0;
            if (getResep[i].comment != null){
                com = JSON.parse(getResep[i].comment)
                jumlah = com.length;
            }

            resep.push({
                recipe_id: getResep[i]._id,
                name: getResep[i].name,
                image: getResep[i].image_url,
                description: getResep[i].desc,
                like: getResep[i].like,
                rating: getResep[i].rating,
                comment: com,
                jumlah: jumlah,
                ingredients,
                steps
            })
        }
        return res.status(200).json(resep)
    },
    ratingComment: async function(req, res){
        const {rating, comment, user_id, recipe_id} = req.body;
        const checkUser = await User.findOne({
            _id: user_id
        })

        if (!checkUser){
            const result = {
                "message" : "User not found"
            }
            res.status(404).json(result);
        }
        else {
            const checkRecipe = await Recipe.findOne({
                _id: recipe_id
            })

            if (!checkRecipe){
                const result = {
                    "message" : "Recipe not found"
                }
                res.status(404).json(result);
            }
            else {
                let com = [];
                if (checkRecipe.comments != null){
                    com = JSON.parse(checkRecipe.comments)
                }
                com.push({
                    "rating" : rating,
                    "user_id" : user_id,
                    "comment" : comment
                })

                let newRating = 0;
                if (checkRecipe.rating == null){
                    newRating = rating
                }
                else {
                    newRating = 0;
                    for (let i = 0; i < com.length; i++){
                        newRating += parseInt(com[i].rating);
                    }
                    newRating = newRating / com.length;
                    newRating = newRating.toFixed(2);
                }

                const updateRecipe = await Recipe.updateOne({
                    _id: recipe_id
                }, {
                    $set: {
                        rating: newRating,
                        comments: JSON.stringify(com)
                    }
                })

                let updatedRecipe = await Recipe.findOne({
                    _id: recipe_id
                })
                const result = {
                    "message" : "Recipe updated!",
                    "rating" : newRating,
                    "comment" : com
                }
                return res.status(200).json(result);
            }
        }
    }
}