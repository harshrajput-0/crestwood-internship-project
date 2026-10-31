import { Event } from "../models/event.model.js";


// ----------------------------------------------------
// FOR GETTING EVENT |=================================
// ----------------------------------------------------
export const getEvents = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = {};

        if ( category && category !== "All") {
            filter.category = category;
        };

        const events = await Event.find(filter).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to load events" });
    }
};

// ---------------------------------------------------------
// FOR GETTING EVENT BY ID |================================
// ---------------------------------------------------------
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        };

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Event not found" })
    }
}