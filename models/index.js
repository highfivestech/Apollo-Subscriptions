import mongoose from "mongoose";

const PriceSchema = mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'USD'
    }
})

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
        type: PriceSchema,
        required: true
    }
});

export const depositData = mongoose.model('depositData', DepositSchema);

