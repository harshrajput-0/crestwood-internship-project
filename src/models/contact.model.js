import mongoose from "mongoose";
import { lowercase } from "zod";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

export const Contact = mongoose.model("Contact", contactSchema);