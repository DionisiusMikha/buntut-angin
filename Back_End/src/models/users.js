const { default: mongoose } = require("mongoose")

const userSchema = mongoose.Schema({
    display_name: String,
    email: String,
    username: String,
    password: String,
    birthdate: Date,
    balance: Number,
    phone_number: String,
    profile_picture: {
        type: String,
        default: null
    },
    address: String,
    age: Number,
    weight: Number,
    height: Number,
    gender: String,
    email_verification_code: {
        type: String,
        default: null,
    },
    is_email_verified: {
        type: Boolean,
        default: false,
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;