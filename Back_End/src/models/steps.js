const { default: mongoose } = require("mongoose")

const stepSchema = mongoose.Schema({
    desc: String,
    recipe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
})

const Step = mongoose.model('Step', stepSchema);
module.exports = Step