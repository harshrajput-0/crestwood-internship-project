import { Contact } from "../models/contact.model.js";
import { EMAILREGEX, PHONEREGEX } from "../constants.js";


// -------------------------------------------------------------------
// CONTACT: FOR SAVING A CONTACT MESSAGE |=============================
// -------------------------------------------------------------------
export const createContactMessage = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || name.trim().length < 2) {
        return res.status(400).json({
            message: "Name must be at least 2 characters"
        });
    };

    if (!email || !EMAILREGEX.test(email)) {
        return res.status(400).json({
            message: "Enter a valid email"
        });
    };

    if (phone && !PHONEREGEX.test(phone)) {
        return res.status(400).json({
            message: "Enter a valid 10 digit phone number, or leave it blank"
        });
    };

    if (!message || message.trim().length < 5) {
        return res.status(400).json({
            message: "Message must be at least 5 characters"
        });
    };

    try {
        const contact = await Contact.create({ name, email, phone, message });
        res.status(201).json({ message: "Message sent successfully", contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not send message" });
    }
};
