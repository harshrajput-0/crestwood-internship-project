import { Router } from "express";
import { registration, getRegistration } from "../controllers/registration.controller.js";

const router = Router();

router.post("/", registration);
router.post("/lookup", getRegistration);

export default router;