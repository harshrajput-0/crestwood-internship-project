import { Router } from "express";
import { getEvents, getEventById } from "../controllers/event.controller.js";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);

export default router