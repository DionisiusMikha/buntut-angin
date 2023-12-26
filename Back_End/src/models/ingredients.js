const { default: mongoose } = require("mongoose");

const ingredientSchema = mongoose.Schema({
    name: String,
    qty: Number,
    uom: String,
    recipe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient