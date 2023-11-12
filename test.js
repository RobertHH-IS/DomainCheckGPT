const axios = require("axios");

async function testDomainCheck() {
  const url = "https://domain-check-gpt.vercel.app/check-domains";
  const domainsToCheck = {
    domains: ["example.com", "nonexistentdomain1234.com"],
  };

  try {
    const response = await axios.post(url, domainsToCheck);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}

testDomainCheck();
