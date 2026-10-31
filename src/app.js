import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.routes.js"
import contactRoutes from "./routes/contact.routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());


// Serve index.html on root
app.use(express.static(path.join(__dirname, "../public")));


// CONNECTING API ROUTES 
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/contact", contactRoutes);


// Serve 404 page for everything else
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public", "notfound.html"));
});



app.get("/test", (req, res) => {
  res.send("Server is running, try changing this text");
});

export default app;

