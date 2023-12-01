const db = require("../models/index");
const joi = require("joi").extend(require('@joi/date'));
const multer = require("multer");
const fs = require("fs");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
const upload = multer({
    dest : "../../Uploads/User",
})

const { Op } = db.Sequelize

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
    loginUser: async function(req, res){
        const {username, password} = req.body;
        
        const checkUser = await db.User.findOne({
            where: {
                username: username
            }
        })

        if (!checkUser){
            return res.status(404).json({
                message: "user not found"
            });
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
                    "message" : "incorrect password"
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
        const idUser = req.params.id_user;
        const { username, email, phone_number, birthdate, display_name, address, weight, height, profile_picture, gender } = req.body;

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
                res.status(400).json(result)
            }
            else {
                try {
                    const updateUser = db.User.update({
                        username: username,
                        email: email,
                        phone_number: phone_number,
                        birthdate: birthdate,
                        display_name: display_name,
                        address: address,
                        weight: weight,
                        height: height,
                        jenis_kelamin: gender,
                        profile_picture: profile_picture
                    }, {
                        where: {
                            id: idUser
                        }
                    })

                    const result = {
                        "message" : "Data updated",
                        "username" : username,
                        "email" : email,
                        "phone_number" : phone_number,
                        "birthdate" : birthdate,
                        "display_name" : display_name,
                        "height" : height,
                        "address" : address,
                        "weight" : weight,
                        "gender" : gender,
                        "profile_picture" : profile_picture
                    }
                    res.status(200).json(result);
                }
                catch(err){
                    return res.status(400).json({message: "Error updating data", error: err.message});
                }
            }
        }
        // const uploadFile = upload.single("profile_picture");
        // uploadFile(req, res, async function (err){
        //     if (err instanceof multer.MulterError){
        //         return res.status(400).send({msg: "File too large"});
        //     }
        //     else if (err){
        //         return res.status(400).send({msg: "File not supported"});
        //     }
        //     const idUser = req.params.id_user;
        //     const {username, email, phone_number, birthdate, display_name, address, weight, heigth} = req.body;

        //     const checkUser = await db.User.findByPk(idUser)
        //     if (!checkUser){
        //         const result = {
        //             "message" : "User not found"
        //         }
        //         res.status(404).json(result);
        //     }
        //     else {
        //         if (checkUser.dataValues.username == username){
        //             const result = {
        //                 "message" : "User already exists"
        //             }
        //             res.status(400).json(result);
        //         }
        //         else {
        //             try{
        //                 const updateUser = await db.User.update({
        //                     username: username,
        //                     email: email,
        //                     phone_number: phone_number,
        //                     birthdate: date_of_birth,
        //                     display_name: display_name,
        //                     profile_picture : `/assets/${checkUser.dataValues.username}.png`
        //                 }, {
        //                     where: {
        //                         id: idUser
        //                     }
        //                 })
        //                 fs.renameSync(
        //                     `../../Uploads/User/${req.file.filename}`,
        //                     `./assets/${checkUser.dataValues.username}.png`
        //                 );
        //                 const result = {
        //                     "message" : "Data updated",
        //                     "username" : username,
        //                     "email" : email,
        //                     "phone_number" : phone_number,
        //                     "birthdate" : date_of_birth,
        //                     "display_name" : display_name,
        //                     "profile_picture" : `/assets/${checkUser.dataValues.username}.png`
        //                 }
        //                 res.status(200).json(result);
        //             }
        //             catch(err){
        //                 return res.status(400).json({message: "Error updating data", error: err.message});
        //             }
        //         }
        //     }
        // })
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
    getAllResep: async function(req, res){
        // const nama = req.body.nama;
        const getResep = await db.Recipes.findAll();

        let resep = []
        for (let i = 0; i < getResep.length; i++){
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
            for (let j = 0 ; j < getSteps.length; j++){
                steps.push(getSteps[j].desc)
            }

            resep.push({
                nama : getResep[i].dataValues.name,
                description : getResep[i].dataValues.description,
                ingredients,
                steps
            })
        }
        
        const result = {
            resep
        } 
        res.status(200).json(result)
    }
}