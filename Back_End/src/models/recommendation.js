const { default: mongoose, Schema } = require("mongoose")

const recSchema = mongoose.Schema({
    recipe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
})

const Recommendation = mongoose.model('Recommendation', recSchema);
module.exports = Recommendation;