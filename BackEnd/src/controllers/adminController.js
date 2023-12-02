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

module.exports = {
    getAllResep: async function(req, res){
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
                nama: getResep[i].dataValues.name,
                description: getResep[i].dataValues.description,
                ingredients,
                steps
            })
        }
    },
    getAllUsers: async function(req, res){
        const {limit, filter, search} = req.query;        
        let result = [];

        if (filter == "dietisian" ){
            const getDietisian = await db.User.findAll()
            for (let i = 0 ; i < getDietisian.length; i++){
                result.push({
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
                    name: getDoctor[i].dataValues.display_name,
                    email: getDoctor[i].dataValues.email,
                    username: getDoctor[i].dataValues.username,
                    phone_number: getDoctor[i].dataValues.phone_number,
                    birthdate: getDoctor[i].dataValues.birthdate,
                    address: getDoctor[i].dataValues.address,
                    profile_picture: getDoctor[i].dataValues.profile_picture,
                    role: "Doctor"
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

        res.status(200).send(result)
    }
}