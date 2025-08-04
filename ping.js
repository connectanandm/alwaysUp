const fs = require("fs");
const axios = require("axios");

const sites = JSON.parse(fs.readFileSync("docs/sites.json", "utf8"));

(async () => {
  console.log("Pinging all sites...");

  for (const site of sites) {
    try {
      const res = await axios.get(site.url, { timeout: 10000 });
      console.log(`✅ Pinged ${site.url} – Status: ${res.status}`);
    } catch (err) {
      console.error(`❌ Failed to ping ${site.url}:`, err.message);
    }
  }

  console.log("Ping completed.");
})();
