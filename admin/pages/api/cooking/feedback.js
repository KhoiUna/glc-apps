const { origin } = require("../../../config/config");

module.exports = async (req, res) => {
  try {
    const feedback = await (await fetch(`${origin}/api/feedback`)).json();
    res.json(feedback);
  } catch (err) {
    console.error("Error fetching feedback");
    return;
  }
};
