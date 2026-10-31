import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: ["Technical", "Cultural", "Workshop", "Symposium", "Sports"],
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true })


export const Event = mongoose.model("Event", eventSchema);                