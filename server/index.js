const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const pageRoutes = require("./routes/pageRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/pages", pageRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});