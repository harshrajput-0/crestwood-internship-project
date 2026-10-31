import "dotenv/config";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

// Vercel invokes this handler for every incoming HTTP request.
// Needed as vercel invokes express server as serverless function and not as persistent one like traditional render deployment
export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
    return;
  }

  return app(req, res);
}
