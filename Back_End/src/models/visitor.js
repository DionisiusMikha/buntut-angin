const { default: mongoose } = require("mongoose")

const visitorSchema = mongoose.Schema({
    date: Date,
    count: Number,
    ip_address: String
})

const Visitor = mongoose.model('Visitor', visitorSchema);
module.exports = Visitor