const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Replace with your actual API key
const API_KEY = 'u2692690-969f436ddd671a867777045e';

const STATUS_FILE = path.join(__dirname, 'status.json');

async function updateStatus() {
  try {
    const res = await fetch('https://api.uptimerobot.com/v2/getMonitors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: API_KEY,
        format: 'json'
      })
    });

    const data = await res.json();

    if (!data.monitors) throw new Error("No monitors found");

    const downForms = data.monitors
      .filter(m => m.status === 9)
      .map(m => m.friendly_name);

    const statusData = {
      formStatus: downForms.length > 0 ? "down" : "up",
      message: downForms.length > 0
        ? `One or more forms are temporarily unavailable.`
        : "",
      downForms
    };

    fs.writeFileSync(STATUS_FILE, JSON.stringify(statusData, null, 2));
    console.log("✅ status.json updated successfully.");
  } catch (error) {
    console.error("❌ Failed to update status.json:", error.message);
  }
}

updateStatus();
