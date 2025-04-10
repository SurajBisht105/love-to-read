const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const pageRoutes = require("./routes/pageRoutes");
const helmet = require("helmet");
const app = express();

// Use Helmet to set secure headers
app.use(helmet());

// Enable CORS from your deployed frontend
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.options("*", cors());

// Optionally add a custom header (Helmet already sets this)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount your API routes if needed
app.use("/api/pages", pageRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
