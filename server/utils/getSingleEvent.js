const Events = require("../db/Events");

module.exports = async ({ id }) => {
  try {
    const res = await Events.findOne({
      where: { id },
    });

    const event = res.dataValues;
    return event;
  } catch (e) {
    console.error("Error getting single event");
    return;
  }
};
