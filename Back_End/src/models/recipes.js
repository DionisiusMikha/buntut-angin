const { default: mongoose } = require("mongoose")
let Float = require('mongoose-float').loadType(mongoose);

const recipeSchema = mongoose.Schema({
    name: String,
    description: String,
    doctor_id: String,
    like: Number,
    rating: Float,
    comments: String,
    image_url: String,
    calories: Number,
    carbo: Float,
    protein: Float,
    fat: Float
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe