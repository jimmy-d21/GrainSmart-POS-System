import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import ENV from "./utils/ENV.js";
import authRoutes from "./routes/auth.route.js";
import StaffModel from "./models/staffModel.js";
import staffRoutes from "./routes/staff.route.js";

const app = express();

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(cors());

// Routes
app.get("/", async (req, res) => {
  try {
    res.send(`Server is ready for Grain Smart POS`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = ENV.server.port;
app.listen(PORT, () => console.log(`✅ Server is running on PORT: ${PORT}`));
