import mongoose from "mongoose";

const schemaa = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})
export const Contact = mongoose.model("Contact",schemaa);