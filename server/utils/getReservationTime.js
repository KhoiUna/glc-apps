const { Op, Sequelize } = require("sequelize");
const Reservations = require("../db/Reservations");

module.exports = async () => {
  try {
    const res = await Reservations.findAll({
      attributes: [
        "time_slot",
        "selected_date",
        [
          Sequelize.fn("SUM", Sequelize.col("number_of_people")),
          "number_of_people",
        ],
      ],
      where: {
        selected_date: {
          [Op.and]: {
            [Op.gte]: new Date(2021, 08, 18),
          },
        },
      },
      group: ["selected_date", "time_slot"],
      order: ["time_slot"],
    });

    const timeList = res.map((i) => i.dataValues);
    return timeList;
  } catch (e) {
    console.error("Error getting time list");
    console.error(e);
  }
};
