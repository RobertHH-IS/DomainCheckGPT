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
      domains, // Send the array directly
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `sso-key ${GODADDY_API_KEY}:${GODADDY_API_SECRET}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response:", error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response:", error.request);
      res.status(504).send("Gateway Timeout");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
