import bcrypt from "bcryptjs";

import { Registration } from "../models/registration.model.js";
import { Student } from "../models/student.model.js";
import { Event } from "../models/event.model.js";

import { EMAILREGEX, PHONEREGEX, MIN_PASSWORD_LENGTH, SALT_ROUNDS } from "../constants.js";



// -------------------------------------------------------------------
// REGISTRATION: FOR REGISTERIGN EVENTS |=============================
// -------------------------------------------------------------------
export const registration = async (req, res) => {
    const { studentName, email, phone, password, eventId } = req.body; 

    // Validatiating fields 
    if (!studentName || studentName.trim().length < 5) {
        return res.status(400).json({
            message: "Student name must be at least of 5 characters"
        });
    };

    if (!email || !EMAILREGEX.test(email)) {
        return res.status(400).json({
            message: "Enter a valid email"
        });
    };

    if (!phone || !PHONEREGEX.test(phone)) {
        return res.status(400).json({
            message: "Enter a 10 digit phone number"
        })
    }

    if (!password || password.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({
            message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
        });
    }


    let event;

    if (!eventId) {
        return res.status(400).json({
            message: "Please select an event"
        });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({ message: "Event not found" });
        }

        const normalizedEmail = email.toLowerCase();

        // One password per email: reuse the existing Student account if the
        // email has registered before, otherwise create a new one.
        let student = await Student.findOne({ email: normalizedEmail }).select("+password");

        if (student) {
            const isMatch = await bcrypt.compare(password, student.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "This email is already registered with a different password"
                });
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            student = await Student.create({ email: normalizedEmail, password: hashedPassword });
        }

        // Create registration, linked to the student account
        const registration = await Registration.create({
            studentName,
            email: normalizedEmail,
            phone,
            student: student._id,
            event: eventId,
        });

        res.status(201).json({ message: "Registered Successfully", registration});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not save registration"});
    }
};

// --------------------------------------------------------
// TO FETCH REGISTRATIONS USING EMAIL + PASSWORD |==========
// --------------------------------------------------------
export const getRegistration = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    };

    if (!password) {
        return res.status(400).json({
            message: "Password is required"
        });
    };

    try {
        // password has select:false on the schema, so pull it back in explicitly
        const student = await Student.findOne({ email: email.toLowerCase() }).select("+password");

        if (!student) {
            return res.status(404).json({ message: "No account found for this email" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // One password check against the Student account covers every
        // registration linked to it.
        const registrations = await Registration.find({ student: student._id }).populate("event");

        res.json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to load registraion" });
    }
}