const db = require("../models/index");
const axios = require("axios")
const joi = require("joi").extend(require('@joi/date'));
const multer = require("multer");
const fs = require("fs");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
// const { CoreApi } = require('midtrans-client');

// const coreApi = new CoreApi({
//     isProduction: false,
//     serverKey: "SB-Mid-server-9Ta-9rQFBi44HhEyv_gVjJPc",
//     clientKey: "SB-Mid-client-Ff5N9IqHFWe3JfeZ"
// });
const path = require("path");

const upload = multer({
    dest : "../../Uploads/User",
})

const { Op } = db.Sequelize

//==========================================
function convertDate(tanggal) {
    const [day, month, year] = tanggal.split('/');

    const dateTime = new Date(`${year}-${month}-${day}T11:00:00`);
    return dateTime;
}

const moment = require('moment');

function convertTime(jam){
    const format = 'HH:mm';
    const time = moment(jam, format);

    return jam;
}

function dateToString(tanggal){
    return (tanggal.toISOString().slice(0, 10).replace('T', ' '))
}

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
        const { username, email, phone_number, birthdate, display_name, address, weight, height, gender } = req.body;

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
                        jenis_kelamin: gender
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
                    }
                    res.status(200).json(result);
                }
                catch(err){
                    return res.status(400).json({message: "Error updating data", error: err.message});
                }
            }
        }
    },
    editProfilePicture: async function(req, res){
        const idUser = req.params.id_user;

        const uploadFile = upload.single("profile_picture");
        uploadFile(req, res, async function (err){
            if (err instanceof multer.MulterError){
                return res.status(400).send({msg: "File too large"});
            }
            else if (err){
                return res.status(400).send({msg: "File not supported"});
            }

            const checkUser = await db.User.findByPk(idUser)
            if (!checkUser){
                const result = {
                    "message" : "User not found"
                }
                res.status(404).json(result);
            }
            else {
                try{
                    const updateUser = await db.User.update({
                        profile_picture : `../../assets/${checkUser.dataValues.username}.png`
                    }, {
                        where: {
                            id: idUser
                        }
                    })
                    fs.renameSync(
                        `../../Uploads/User/${req.file.filename}`,
                        `./assets/${checkUser.dataValues.username}.png`
                    );
                    const result = {
                        "message" : "Data updated",
                        "profile_picture" : `../../assets/${checkUser.dataValues.username}.png`
                    }
                    res.status(200).json(result);
                }
                catch(err){
                    return res.status(400).json({message: "Error updating data", error: err.message});
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
    getProfilePicture: async function(req, res){
        const idUser = req.params.id_user;

        const checkUser = await db.User.findByPk(idUser)
        if (!checkUser){
            const result = {
                "message" : "User not found"
            }
            res.status(404).json(result);
        }
        else {
            return res.status(200).sendFile(path.join(__dirname, `${checkUser.dataValues.profile_picture}`));
        }
    },
    getAllResep: async function(req, res){
        const {limit, search, page} = req.query; 
        
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
        
        // pagination
        if (page !== undefined && page !== ""){
            const offset = (page - 1) * limit;
            resep = resep.slice(offset, offset + limit)
        }

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
    getSchedule: async function(req, res){
        const allSched = await db.Doctor_Schedule.findAll();

        let jadwal = []
        for (let i = 0; i < allSched.length; i++){
            const namaDokter = await db.Doctor.findAll({
                where: {
                    id: allSched[i].dataValues.doctor_id
                }
            })

            jadwal.push({
                "Nama dokter" : namaDokter[0].dataValues.display_name,
                "Tanggal" : dateToString(allSched[i].dataValues.tanggal),
                "Jam mulai" : convertTime(allSched[i].dataValues.start),
                "Jam selesai" : convertTime(allSched[i].dataValues.end)
            })
        }

        const result = {
            jadwal
        }
        res.status(200).json(result);
    },
    janjian: async function(req, res){
        const username = req.params.username;
        const { tanggal, jam, nama_dokter } = req.body;

        const cariUser = await db.User.findAll({
            where: {
                username : username
            }
        })

        const cariDokter = await db.Doctor.findAll({
            where: {
                display_name: nama_dokter
            }
        })

        if (cariUser.length == 0){
            const result = {
                "message" : "User tidak ditemukan"
            }
            res.status(404).json(result);
        }
        else {
            if (cariDokter.length == 0){
                const result = {
                    "message" : "Dokter tidak ditemukan"
                }
                res.status(404).json(result);
            }
            else {
                const cariJadwal = await db.Doctor_Schedule.findAll({
                    where: {
                        doctor_id: cariDokter[0].dataValues.id
                    }
                })
    
                if (cariJadwal.length == 0){
                    const result = {
                        "message" : "Jadwal dokter tidak ditemukan"
                    }
                    res.status(404).json(result);
                }
                else {
                    // console.log(convertDate(tanggal).toISOString());
                    // console.log(cariJadwal[0].dataValues.tanggal.toISOString());
                    if (convertDate(tanggal).toISOString().slice(0, 10).replace('T', ' ') != cariJadwal[0].dataValues.tanggal.toISOString().slice(0, 10).replace('T', ' ')){
                        const result = {
                            "message" : "Dokter tidak memiliki jadwal di tanggal tersebut!"
                        }
                        res.status(400).json(result);
                    }
                    else {
                        if ((convertTime(jam) > cariJadwal[0].dataValues.start || convertTime(jam) >= cariJadwal[0].dataValues.start) && (convertTime(jam) < cariJadwal[0].dataValues.end || convertTime(jam) <= cariJadwal[0].dataValues.end)){
                            const newConsul = await db.Consultation.create({
                                doctor_id: cariDokter[0].dataValues.id,
                                user_id: cariUser[0].dataValues.id,
                                tanggal: convertDate(tanggal),
                                jam: convertTime(jam),
                                status: 0,
                            })

                            let text = "";
                            const cekConsul = await db.Consultation.findAll();

                            if (cekConsul[0].dataValues.status == 0){
                                text = "Pending"
                            }
                            else if (cekConsul[0].dataValues.status == 1){
                                text = "Accepted"
                            }
                            else if (cekConsul[0].dataValues.status == 2){
                                text = "Rejected"
                            }
    
                            const result = {
                                "message" : "Noted!",
                                "tanggal" : convertDate(tanggal).toISOString().slice(0, 10).replace('T', ' '),
                                "jam" : convertTime(jam),
                                "status" : text
                            }
                            res.status(201).json(result);
                        }
                        else {
                            const result = {
                                "message" : "Diluar jam konsultasi!"
                            }
                            res.status(400).json(result);
                        }                        
                    }
                }
            }
        }
    },
    subscription: async function(req, res){
        const username = req.params.username;
        const cariUser = await db.User.findAll({
            where: {
                username: username
            }
        })

        if (cariUser.length == 0){
            const result = {
                "message" : "User tidak ditemukan!"
            }
            return res.status(404).json(result);
        }
        else {
            const cariSubs = await db.Subscription.findAll({
                where: {
                    user_id: cariUser[0].dataValues.id,
                    status : 1
                },
                order: [
                    ['id', 'DESC']
                ],
                limit: 1
            })

            // ambil order yg max
            const nomorSubs = await db.Subscription.findOne({
                order: [
                    ['id', 'DESC']
                ],
                limit: 1
            })

            let today = "";
            if (cariSubs.length == 0){
                today = new Date();
            } else {
                today = new Date(cariSubs[0].dataValues.period)
            }
            const bulanDepan = new Date(today);
            bulanDepan.setDate(today.getDate() + 30);

            const newSubs = await db.Subscription.create({
                user_id: cariUser[0].dataValues.id,
                period: bulanDepan.toISOString().slice(0, 10)
            })
            let nomor = nomorSubs.dataValues.id + 1;

            let orderId = new Date();
            orderId = orderId.toISOString().slice(0, 10).replace('-', '').replace('-', '') + nomor;

            const option = {
                method: 'POST',
                url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
                headers: {accept: 'application/json', 'content-type': 'application/json',
                    authorization: 'Basic '+Buffer.from(process.env.SERVER_KEY).toString("base64")
                },
                data: {
                    transaction_details: {
                        order_id: orderId,
                        gross_amount: 85000,
                    },
                    customer_details: {
                        email: cariUser[0].dataValues.email
                    },
                    credit_card: {secure: true},
                    callbacks: { 
                        finish: 'http://localhost:5173/dietisian/subs'
                    } 
                }
            }

            await axios.request(option).then( async (response)=>{
                console.log("\nTrans created successfully\n", "\n")

                const updateSubs = await db.Subscription.update({
                    invoice_id: orderId
                }, {
                    where: {
                        id: newSubs.dataValues.id
                    }
                })

                return res.status(201).json({
                    message: "Requested Payment",
                    midtrans: response.data,
                    data : {
                        id : newSubs.dataValues.id,
                        orderId: orderId,
                        gross_amount: 85000,
                        email: cariUser[0].dataValues.email
                    }
                })
            })
        }
    },
    changeStatusSubscription : async function (req, res){
        const id = req.params.id;
        const status = req.body.status;
        console.log(id)
        if (status == "Success"){
            const updateSubs = await db.Subscription.update({
                status: 1
            }, {
                where: {
                    id: id
                }
            })
            const result = {
                "message" : "Subscription updated",
                "status" : "Success",
                "id" : id
            }
            return res.status(200).json(result);
        } else if (status == "Pending"){
            const updateSubs = await db.Subscription.update({
                status: 0
            }, {
                where: {
                    id: id
                }
            })
            const result = {
                "message" : "Subscription updated",
                "status" : "Pending",
                "id" : id
            }
            return res.status(200).json(result);    
        } else if (status == "Canceled"){
            const updateSubs = await db.Subscription.update({
                status: -1
            }, {
                where: {
                    id: id
                }
            })
            const result = {
                "message" : "Subscription updated",
                "status" : "Canceled",
                "id" : id
            }
            return res.status(200).json(result);    
        }
    }
}