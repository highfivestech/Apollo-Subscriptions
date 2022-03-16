import mongoose from "mongoose";

const DepositSchema = mongoose.Schema({
    description: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    price: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'USD'
    }
});

export const depositData = mongoose.model('depositData', DepositSchema);

