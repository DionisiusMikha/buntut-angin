const { default: mongoose } = require("mongoose")

const subscriptionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    period: Date,
    status: Number,
    invoice_id: String
})