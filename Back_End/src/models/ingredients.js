const { default: mongoose } = require("mongoose");

const ingredientSchema = mongoose.Schema({
    name: String,
    qty: Number,
    uom: Number,
    recipe_id: String,
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient