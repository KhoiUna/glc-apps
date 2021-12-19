const Events = require("../db/Events");

module.exports = async () => {
  try {
    const res = await Events.findAll({
      where: {
        status: "opened",
      },
      order: [["id", "DESC"]],
    });

    const events = res.map((i) => i.dataValues);
    return events;
  } catch (e) {
    console.error("Error getting events");
    console.error(e);
  }
};
