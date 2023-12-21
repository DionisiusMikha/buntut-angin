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

//=============================================================
function convertDate(tanggal) {
    const [day, month, year] = tanggal.split('/');

    const dateTime = new Date(`${year}-${month}-${day}T11:00:00`);
    return dateTime;
}

const moment = require('moment');

function convertTime(jam){
    const format = 'HH:mm';
    const time = moment(jam, format);

    return time.format(format);
}

function dateToString(tanggal){
    return (tanggal.toISOString().slice(0, 10).replace('T', ' '))
}

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
        const {username, email, display_name, date_of_birth, password, phone_number, address} = req.body;
        
        const hasil = await db.Doctor.findOne({
            where: {
                username: username,
                email: email
            }
        });
        

        if (hasil){
            return res.status(400).json({msg: "already_exist"})
        }

        const newUser = db.Doctor.create({
            display_name : display_name,
            email : email,
            username : username,
            password : password,
            birthdate : date_of_birth,
            address: address,
            phone_number: phone_number,
        })

        const result = {
            "message" : "success",
            "username" : username,
            "email" : email,
            "display_name" : display_name,
            "birthdate" : date_of_birth,
        }

        return res.status(201).json(result);

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
                "message" : "User not found"
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
        // const uploadFile = upload.single("profile_picture");
        // uploadFile(req, res, async function (err){
        //     if (err instanceof multer.MulterError){
        //         return res.status(400).send({msg: "File too large"});
        //     }
        //     else if (err){
        //         return res.status(400).send({msg: "File not supported"});
        //     }
            const idUser = req.params.id_user;
            const { username, email, phone_number, birthdate, display_name, address, gender } = req.body;

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
                            birthdate: birthdate,
                            phone_number: phone_number,
                            address: address,
                            birthdate: birthdate,
                            gender: gender,
                            display_name: display_name,
                            // profile_picture : `/assets/${checkUser.dataValues.username}.png`
                        }, {
                            where: {
                                id: idUser
                            }
                        })
                        // fs.renameSync(
                        //     `./uploads/${req.file.filename}`,
                        //     `./assets/${checkUser.dataValues.username}.png`
                        // );
                        const result = {
                            "message" : "Data updated",
                            "username" : username,
                            "email" : email,
                            "phone_number" : phone_number,
                            "birthdate" : date_of_birth,
                            "display_name" : display_name,
                            // "profile_picture" : `/assets/${checkUser.dataValues.username}.png`
                        }
                        res.status(200).json(result);
                    }
                    catch(err){
                        return res.status(400).json({message: "Error updating data", error: err.message});
                    }
                }
            }
        // })
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
    addRecipe: async function(req, res){
        const doctorId = req.body.doctor_id;
        const name = req.body.name;
        const desc = req.body.description;
        const calories = req.body.calories;
        const carbo = req.body.carbo;
        const protein = req.body.protein;
        const fat = req.body.fat;
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
                calories: calories,
                carbo: carbo,
                protein: protein,
                fat: fat,
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
                "calories" : calories,
                "carbo" : carbo,
                "protein" : protein,
                "fat" : fat,
                "by" : cekDokter.dataValues.display_name,
                "total_ingredients" : ingredients.length,
                "total_steps" : steps.length
            }
            res.status(201).json(result);
        }
    },
    viewUser: async function(req, res){
        const search = req.body.search;
        const cariUser = await db.User.findAll({
            where: {
                display_name: {
                    [Op.like]: '%'+search+'%'
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
    },
    getAllDoctor : async function (req, res){
        const getAllDoctor = await db.Doctor.findAll()

        return res.status(200).send(getAllDoctor)
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
            const user = await db.Doctor.findByPk(userLogin.id);
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
    aturJadwal: async function (req, res){
        const username = req.params.username
        const tanggal = req.body.tanggal;
        const start = req.body.start;
        const end = req.body.end;

        const cariDokter = await db.Doctor.findAll({
            where: {
                username: username
            }
        })

        if (!tanggal || !start || !end || !username){
            const result = {
                "message" : "Invalid input!"
            }
            res.status(400).json(result);
        }
        else {
            if (cariDokter.length == 0){
                const result = {
                    "message" : "Doctor not found"
                }
                res.status(404).json(result);
            }
            else {
                if (start >= end){
                    const result = {
                        "message" : "Start time must be less than end time"
                    }
                    res.status(400).json(result);
                }
                else {
                    const startTime = convertTime(start);
                    const endTime = convertTime(end);
    
                    const existingSchedules = await db.Doctor_Schedule.findAll({
                        where: {
                            doctor_id: cariDokter[0].dataValues.id,
                            tanggal: convertDate(tanggal)
                        }
                    });
    
                    const isConflict = existingSchedules.some(schedule => {
                        const scheduleStart = moment(schedule.start, 'HH:mm');
                        const scheduleEnd = moment(schedule.end, 'HH:mm');
                        return (
                            (startTime >= scheduleStart && startTime < scheduleEnd) ||
                            (endTime > scheduleStart && endTime <= scheduleEnd) ||
                            (startTime <= scheduleStart && endTime >= scheduleEnd)
                        );
                    });
    
                    if (isConflict) {
                        const result = {
                            "message": "Jadwal bertabrakan dengan jadwal yang sudah ada."
                        }
                        res.status(400).json(result);
                    } 
                    else {
                        try{
                            let newSched = await db.Doctor_Schedule.create({
                                doctor_id: cariDokter[0].dataValues.id,
                                tanggal: convertDate(tanggal),
                                start: convertTime(start),
                                end: convertTime(end)
                            })
        
                            const result = {
                                "doctor_id": cariDokter[0].dataValues.id,
                                "tanggal": dateToString(newSched.tanggal),
                                "start": convertTime(start),
                                "end": convertTime(end)
                            }
                            res.status(201).json(result);
                        }
                        catch(err){
                            console.error('Error executing SQL statement:', err);
                            // Handle the error or rethrow it
                            throw err;
                        }
                    }
                }
            }
        }
    },
    viewJadwal: async function (req, res){
        try {
            const { id, currentdate } = req.params;
            const tanggalObjek = new Date(currentdate);
            const date = tanggalObjek.toISOString().split('T')[0];

           try {
                const jadwal = await db.sequelize.query(
                    `SELECT c.*, u.display_name FROM Consultations c
                    JOIN Users u ON c.user_id = u.id
                    WHERE c.doctor_id = :id AND c.tanggal = :date`,
                    {
                    replacements: { id, date },
                    type: db.sequelize.QueryTypes.SELECT
                    }
                );

                return res.status(200).send(jadwal);
           } catch (error) {
                return res.status(400).send(error);
           }
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    changeStatus: async function (req, res){
        const { id, status } = req.body;

        try {
            const result = await db.Consultation.update(
                {
                    status: status
                },
                {
                    where: {
                        id: id
                    }
                }
            )

            return res.status(200).send({message: "updated"});
        } catch (error) {
            return res.status(200).send(error);
        }
    }
}