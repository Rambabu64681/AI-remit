const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const quoteRoutes = require("./routes/quoteRoutes");
const transferRoutes = require("./routes/transferRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    service: "AI Remit Assistant API",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/quote", quoteRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/ai", aiRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`AI Remit Assistant backend running on port ${PORT}`);
});
