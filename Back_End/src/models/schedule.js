const { default: mongoose } = require("mongoose");

const schedSchema = mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    tanggal: Date,
    start: String,
    end: String
})

const Schedule = mongoose.model('Schedule', schedSchema);
module.exports = Schedule