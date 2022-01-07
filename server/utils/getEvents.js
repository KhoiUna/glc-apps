const { Op } = require("sequelize");
const Events = require("../db/Events");
const closeEvent = require("../helpers/closeEvent");
const dateDifference = require("../helpers/dateDifference");

module.exports = async () => {
  try {
    const res = await Events.findAll({
      where: {
        [Op.or]: [{ status: "opened" }, { status: "pending" }],
      },
      order: [["sql_created_at", "DESC"]],
    });

    const events = res.map((i) => i.dataValues);
    events.map(async (item) => {
      if (item.status === "pending") return item;

      if (!(dateDifference(item.created_at) > 2)) return item;

      if (!(await closeEvent({ id: item.id })))
        throw new Error("Error closing event");

      item.status = "closed";
      return item;
    });

    return events;
  } catch (e) {
    console.error("Error getting events");
    console.error(e);
    return;
  }
};
