import mongoose, { mongo } from "mongoose";

const payschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: String,
    phone: Number,
    amount: Number,
    transaction: {
        type: String,
        required: true,
    },
});

export const Payment = mongoose.model("Payment",payschema);