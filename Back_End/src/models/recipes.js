const { default: mongoose, Schema } = require("mongoose")

const recipeSchema = mongoose.Schema({
    name: String,
    description: String,
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    like: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    comments: String,
    image_url: String,
    calories: Number,
    carbo: Number,
    protein: Number,
    fat: Number
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe