const { default: mongoose } = require("mongoose")

const stepSchema = mongoose.Schema({
    desc: String,
    recipe_id: String
})

const Step = mongoose.model('Step', stepSchema);
module.exports = Step