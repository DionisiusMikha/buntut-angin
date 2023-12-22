const User = require('../models/users');

module.exports = {
    getAllUser: async function (req, res){
        const users = await User.find();
        return res.status(200).json(users);
    },
    // registerUser: async function (req, res){
    //     const {display_name, email, username, password, birthdate, phone_number, address, weight, height, gender} = req.body;

    //     const hasil = await User.find()
    // }
}