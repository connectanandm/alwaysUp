const fs = require("fs");
const axios = require("axios");
const sites = JSON.parse(fs.readFileSync("docs/sites.json", "utf8"));

const results = [];

async function pingSite(site) {
  const MAX_RETRIES = 3;
  const TIMEOUT = 10000; // 10 seconds

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await axios.get(site.url, { timeout: TIMEOUT });
      return {
        name: site.name,
        url: site.url,
        status: "up",
        code: res.status,
        checkedAt: new Date().toISOString()
      };
    } catch (err) {
      console.warn(`Attempt ${attempt} failed for ${site.url}: ${err.message}`);
      if (attempt === MAX_RETRIES) {
        return {
          name: site.name,
          url: site.url,
          status: "down",
          code: err.code || "TIMEOUT",
          checkedAt: new Date().toISOString()
        };
      }
    }
  }
}

(async () => {
  for (const site of sites) {
    const result = await pingSite(site);
    results.push(result);
  }

  fs.writeFileSync("docs/status.json", JSON.stringify(results, null, 2));
  console.log("✅ status.json updated.");
})();
