const { default: mongoose } = require("mongoose")

const doctorSchema = mongoose.Schema({
    display_name: String,
    email: String,
    username: String,
    password: String,
    phone_number: String,
    birthdate: Date,
    address: String,
    profile_picture: {
        type: String,
        default: null
    }
})

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor