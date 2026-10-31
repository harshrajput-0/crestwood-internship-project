import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    studentName: {
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
        required: true,
        trim: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
}, { timestamps: true });

export const Registration = mongoose.model("Registration", registrationSchema);