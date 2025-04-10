const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const pageRoutes = require("./routes/pageRoutes");

const app = express();

// Enable CORS
app.use(cors());

// Set security headers, including x-content-type-options
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Optionally, use Helmet to set several secure headers at once.
// const helmet = require("helmet");
// app.use(helmet());

// Parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Media Hub Backend is running" });
});

// Connect to MongoDB
connectDB();

// Use API base URL from .env for routes:
const apiBase = process.env.API_BASE_URL || "/api";
app.use(`${apiBase}/pages`, require("./routes/pageRoutes"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
