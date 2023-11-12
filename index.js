const express = require("express");
const whoiser = require("whoiser");
const app = express();
app.use(express.json());

app.post("/check-domains", async (req, res) => {
  const domains = req.body.domains;
  if (!Array.isArray(domains) || !domains.every((domain) => typeof domain === "string")) {
    return res.status(400).send("Invalid input format");
  }

  try {
    const results = await Promise.all(
      domains.map(async (domain) => {
        try {
          const info = await whoiser.domain(domain);
          return { domain, available: false, info };
        } catch (error) {
          // Assuming that an error indicates domain availability
          return { domain, available: true };
        }
      })
    );

    res.json(results);
  } catch (error) {
    res.status(500).send("An error occurred while processing your request");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
