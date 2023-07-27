import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
});

export const News = mongoose.model("News",newsSchema);