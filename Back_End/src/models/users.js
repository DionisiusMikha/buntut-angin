const { default: mongoose } = require("mongoose")

const userSchema = mongoose.Schema({
    display_name: String,
    email: String,
    username: String,
    password: String,
    birthdate: Date,
    balance: Number,
    phone_number: String,
    profile_picture: String,
    address: String,
    age: Number,
    weight: Number,
    height: Number,
    genders: String,
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