const Events = require("../db/Events");

module.exports = async ({ id }) => {
  try {
    const res = await Events.update(
      {
        status: "closed",
      },
      {
        where: { id },
      }
    );
    return res;
  } catch (e) {
    console.error("Error closing single event");
    return;
  }
};
