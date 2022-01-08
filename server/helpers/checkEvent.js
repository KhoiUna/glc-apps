const { Op } = require("sequelize");
const Events = require("../db/Events");

module.exports = async ({ date }) => {
  try {
    const d = new Date(date);
    const createdDate = new Date(
      new Date(d.getFullYear(), d.getMonth(), d.getDate())
    ).toUTCString();

    const res = await Events.findOne({
      where: {
        created_at: createdDate,
        [Op.or]: [{ status: "opened" }, { status: "pending" }],
      },
    });
    return res?.dataValues.id;
  } catch (err) {
    console.error("Error checking event -helper");
    return;
  }
};
