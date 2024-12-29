import { createServer } from "@vercel/node"; // Vercel's Node.js server handler
import express from "express";
import cors from "cors"; // If needed for CORS support
import projects from "../../server/routes/project.js"; // Adjust path to project.js

const app = express();

app.use(cors());
app.use(express.json());

// Define routes
app.use("/project", projects); // Mount project routes to /project endpoint

// Export the handler for Vercel serverless functions
export default createServer(app);
