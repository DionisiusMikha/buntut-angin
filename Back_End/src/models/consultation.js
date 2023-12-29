const { default: mongoose } = require("mongoose")

const consulSchema = mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tanggal: Date,
    jam: String,
    status: Number
})

const Consultation = mongoose.model('Consultation', consulSchema);
module.exports = Consultation