const axios = require("axios");

module.exports = async ({ message }) => {
  try {
    const res = await axios.post(process.env.EVENT_DISCORD_WEBHOOK_URL, {
      content: `@everyone ${message}`,
    });
    console.log(`Status Code: ${res.status}`);

    return true;
  } catch (err) {
    console.error("Error creating discord event");
    return;
  }
};
