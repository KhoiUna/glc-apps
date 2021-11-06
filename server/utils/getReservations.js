const Reservations = require("../db/Reservations");
const { Sequelize, Op } = require("sequelize");
const formatReservationObj = require("../helpers/formatReservationObj");

module.exports = async (dateIndex) => {
  try {
    const initialDate = new Date(
      new Date(Date.now() + 10 ** 8 * 6 * dateIndex).toDateString()
    );
    const seventhDate = new Date(
      new Date(initialDate.getTime() + 10 ** 8 * 6).toDateString()
    );
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
            [Op.gte]: initialDate,
            [Op.lte]: seventhDate,
          },
        },
      },
      group: ["selected_date", "time_slot"],
      order: ["time_slot", "selected_date"],
    });

    const reservations = formatReservationObj(initialDate, res);

    return reservations;
  } catch (e) {
    console.error("Error getting data");
    console.error(e);
  }
};
