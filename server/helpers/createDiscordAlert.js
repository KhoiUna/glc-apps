const axios = require("axios");

module.exports = async (fromPage, message) => {
  try {
    const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: `@everyone **${fromPage.toUpperCase()}:** ${
        "\n" + "*"
      }${message}*`,
    });
    console.log(`Status Code: ${res.status}`);

    return true;
  } catch (err) {
    console.error("Error creating discord alert");
    return;
  }
};
