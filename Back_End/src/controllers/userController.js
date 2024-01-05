require("dotenv").config()
const User = require('../models/users');
const Doctor = require('../models/doctor');
const Recipe = require("../models/recipes");
const Ingredient = require("../models/ingredients");
const Step = require('../models/steps');
const Visitor = require('../models/visitor');
const Consultation = require('../models/consultation');
const Schedule = require('../models/schedule');
const Subscription = require('../models/subscription');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const jwt = require("jsonwebtoken");
const multer = require('multer');
const fs = require('fs');
const ip = require('ip');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
});

function convertDate(tanggal) {
    const [day, month, year] = tanggal.split('/');
    const dateTime = new Date(`${year}-${month}-${day}T11:00:00`);
    return dateTime;
}

function dateToString(tanggal) {
    return (tanggal.toISOString().slice(0, 10).replace('T', ' '))
}

const moment = require('moment')
function convertTime(jam){
    const format = 'HH:mm';
    const time = moment(jam, format);

    return time.format(format);
}

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

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
    test : async function (req, res){
        // console.log("tes");
        return res.status(200).send("MASOK")
    },
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
            try {
                const today = new Date();
                const tanggal = birthdate.split('-');
                let umur = today.getFullYear() - parseInt(tanggal[0]);
                const newUser = new User({
                    display_name,
                    email,
                    username,
                    password,
                    birthdate: birthdate,
                    phone_number,
                    address,
                    age: umur,
                    weight,
                    height,
                    gender,
                    balance: 0
                })
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
                return res.status(200).json(result);
            }
            else {
                const result = {
                    "message" : "Wrong password"
                }
                return res.status(400).json(result);
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
                console.log(userLogin);
                // const user = await User.findOne(userLogin.username);
                const user = await User.findById(userLogin.id)

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
    cekProfileDoctor: async function(req, res){
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
    },
    janjian: async function(req, res){
        const { username } = req.params;
        const { tanggal, jam, nama_dokter } = req.body;

        const checkUser = await User.findOne({
            username: username
        })

        const checkDoctor = await Doctor.findOne({
            display_name: nama_dokter
        })

        if (!checkUser){
            const result = {
                "message" : "User not found"
            }
            res.status(404).json(result);
        }
        else {
            if (!checkDoctor){
                const result = {
                    "message" : "Doctor not found"
                }
                res.status(404).json(result);
            }
            else {
                const cariJadwal = await Schedule.findOne({
                    doctor_id: checkDoctor._id,
                    tanggal: convertDate(tanggal)
                })

                if (!cariJadwal){
                    const result = {
                        "message" : "Doctor schedule not found"
                    }
                    res.status(404).json(result);
                }
                else {
                    if (convertDate(tanggal).toISOString().slice(0, 10).replace('T', ' ') != cariJadwal.tanggal.toISOString().slice(0, 10).replace('T', ' ')){
                        const result = {
                            "message" : "Doctor doesn't have schedule on that date!"
                        }
                        res.status(400).json(result);
                    }
                    else {
                        const scheduleStart = convertTime(cariJadwal.start);
                        const scheduleEnd = convertTime(cariJadwal.end);
                        const time = convertTime(jam);

                        if ((time > scheduleStart || time >= scheduleStart) && (time < scheduleEnd || time <= scheduleEnd)){
                            const newConsul = new Consultation({
                                doctor_id: checkDoctor._id,
                                user_id: checkUser._id,
                                tanggal: convertDate(tanggal),
                                jam: time,
                                status: 0
                            })

                            try {
                                let insertConsul = await newConsul.save();
                                let text = "";
                                const checkConsul = await Consultation.findOne({
                                    _id: newConsul._id
                                });

                                if (checkConsul.status == 0){
                                    text = "Pending"
                                }
                                else if (checkConsul.status == 1) {
                                    text = "Accepted"
                                }
                                else if (checkConsul.status == 2){
                                    text = "Rejected"
                                }
                                
                                const result = {
                                    "message" : "Noted!",
                                    "tanggal" : tanggal,
                                    "jam" : jam,
                                    "status" : text
                                }
                                res.status(201).json(result);
                            }
                            catch(err){
                                console.log(err.message);
                                return res.status(400).json({msg: err.message})
                            }
                        }
                        else {
                            const result = {
                                "message" : "Outside of consultation hours"
                            }
                            res.status(400).json(result);
                        }
                    }
                }
            }
        }
    },
    getSchedule: async function(req, res){
        const allSched = await Schedule.find();

        let jadwal = [];
        for (let i = 0; i < allSched.length; i++){
            const doctorName = await Doctor.find({
                _id: allSched[i].doctor_id
            })

            jadwal.push({
                "Nama dokter" : "Dr. " + doctorName[0].display_name,
                "Tanggal" : dateToString(allSched[i].tanggal),
                "Jam mulai" : convertTime(allSched[i].start),
                "Jam selesai" : convertTime(allSched[i].end)
            })
        }
        
        const result = {
            jadwal
        }
        res.status(200).json(result);
    },
    getAllDoctor: async function(req, res){
        try {
            const result = await Doctor.find();

            res.status(200).json(result);
        }
        catch(err){
            return res.status(400).send(err);
        }
    },
    subscription: async function(req, res){
        const username = req.params.username;
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
            const checkSubs = await Subscription.find({
                user_id: checkUser._id
            }).sort({_id: 'desc'}).limit(1)

            const nomerSubs = await Subscription.findOne()
                              .sort({_id: 'desc'})
                              .limit(1)
            
            let today = "";
            if (checkSubs.length == 0){
                today = new Date();
            }
            else {
                today = new Date(checkSubs[0].period)
            }
            const bulanDepan = new Date(today);
            bulanDepan.setDate(today.getDate() + 30);

            const newSubs = new Subscription({
                user_id: checkUser._id,
                period: bulanDepan.toISOString().slice(0, 10)
            })

            let nomor = "";
            if (nomerSubs._id == null){
                nomor = nomerSubs._id = 0;
            }
            else {
                nomor = nomerSubs._id + 1;
            }

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
                        email: checkUser[0].email
                    },
                    credit_card: {secure: true},
                    callbacks: { 
                        finish: 'http://localhost:5173/dietisian/subs'
                    } 
                }
            }

            await axios.request(option).then( async (response)=>{
                console.log("\nTrans created successfully\n", "\n")

                const updateSubs = await Subscription.updateOne({
                    _id: newSubs._id
                }, {
                    $set: {
                        invoice_id: orderId
                    }
                })

                return res.status(201).json({
                    message: "Requested Payment",
                    midtrans: response.data,
                    data : {
                        id : newSubs._id,
                        orderId: orderId,
                        gross_amount: 85000,
                        email: checkUser[0].email
                    }
                })
            })
        }
    },
    changeStatusSubscription: async function(req, res){
        const id = req.params.id;
        const status = req.body.status;

        if (status == "Success") {
            const updateSubs = await Subscription.updateOne({
                _id: id
            }, {
                $set: {
                    status: 1
                }
            })

            const result = {
                "message" : "Subscription updated",
                "status" : "Success",
                "id" : id
            }
            res.status(200).json(result);
        }
        else if (status == "Pending"){
            const updateSubs = await Subscription.updateOne({
                _id: id
            }, {
                $set: {
                    status: 0
                }
            })

            const result = {
                "message" : "Subscription updated",
                "status" : "Pending",
                "id" : id
            }
            res.status(200).json(result)
        }
        else if (status == "Canceled"){
            const updateSubs = await Subscription.updateOne({
                _id: id
            }, {
                $set: {
                    status: -1
                }
            })

            const result = {
                "message" : "Subscription updated",
                "status" : "Canceled",
                "id" : id
            }
            res.status(200).json(result);
        }
    },
    sendVerificationEmail: async function(req, res){
        const { email } = req.body;
        try {
            const verificationCode = generateVerificationCode();

            let updateUser = await User.updateOne({
                email: email
            }, {
                $set: {
                    email_verification_code: verificationCode
                }
            })

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Email Verification Code',
                text: `Your verification code is: ${verificationCode}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error('Error sending email:', error);
                  return res.status(500).json({ message: 'Internal Server Error' });
                }
        
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Email sent successfully' });
            });
        }
        catch(err){
            console.error('Error sending verification email:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    verifyEmail: async function(req, res){
        const {email, verificationCode} = req.body;

        try {
            const result = await User.findOne({
                email: email,
                email_verification_code: verificationCode
            })

            if (!result){
                return res.status(400).json({ message: 'Invalid verification code' });
            }

            let updateUser = await User.updateOne({
                email: email
            }, {
                $set: {
                    is_email_verified: true
                }
            })
            res.status(200).json({ message: 'Email verified successfully' });
        }
        catch(err){
            console.error('Error verifying email:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    changePassword: async function(req, res){
        const {email, newPassword} = req.body;

        try {
            const result = await User.findOne({
                email: email
            })

            if (!result) {
                return res.status(404).json({ message: 'Email not found' });
            }

            let updateUser = await User.updateOne({
                email: email
            }, {
                $set: {
                    password: newPassword
                }
            })
            res.status(200).json({ message: 'Password reset successfully' });
        }
        catch(err){
            console.error('Error resetting password:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    ajukanKonsultasi: async function(req, res){
        const { doctor_id, user_id, tanggal, jam } = req.body;
        try {
            const result = new Consultation({
                doctor_id,
                user_id,
                tanggal, 
                jam,
                status: 0
            })

            let insertConsul = await result.save();

            return res.status(201).send({message: "created"})
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    getAllEmail: async function(req, res){
        const result = await User.find().select('email');
        return res.status(200).json(result);
    }
}