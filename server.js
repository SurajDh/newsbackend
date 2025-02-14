require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.NEWS_API_KEY;

// Check if API key is available
if (!API_KEY) {
  console.error("❌ ERROR: API key is missing! Check your .env file.");
  process.exit(1); // Exit if no API key
}

app.get("/news", async (req, res) => {
  const { country, category, page, pageSize } = req.query;
  
  if (!API_KEY) {
    return res.status(500).json({ error: "API key is missing. Please check your .env file." });
  }

  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country,
        category,
        page,
        pageSize,
        apiKey: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("News API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
