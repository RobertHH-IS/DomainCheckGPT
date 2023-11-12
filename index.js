require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const GODADDY_API_URL = "https://api.ote-godaddy.com/v1/domains/available"; // Use the production URL when ready
const GODADDY_API_KEY = process.env.GODADDY_API_KEY;
const GODADDY_API_SECRET = process.env.GODADDY_API_SECRET;

app.post("/check-domains", async (req, res) => {
  const domains = req.body.domains;
  if (!Array.isArray(domains) || !domains.every((domain) => typeof domain === "string")) {
    return res.status(400).send("Invalid input format");
  }

  try {
    const response = await axios.post(
      GODADDY_API_URL,
      { domains },
      {
        headers: {
          Authorization: `sso-key ${GODADDY_API_KEY}:${GODADDY_API_SECRET}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    // Error handling (omitted for brevity)
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
