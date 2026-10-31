import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
}, { timestamps: true });

export const Student = mongoose.model("Student", studentSchema);