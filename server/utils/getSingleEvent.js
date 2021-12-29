const Events = require("../db/Events");
const closeEvent = require("../helpers/closeEvent");
const dateDifference = require("../helpers/dateDifference");

module.exports = async ({ id }) => {
  try {
    const res = await Events.findOne({
      where: { id },
    });

    const event = res.dataValues;
    if (!(dateDifference(event.created_at) > 2)) return event;
    if (await closeEvent({ id })) return event;

    return;
  } catch (e) {
    console.error("Error getting single event");
    return;
  }
};
