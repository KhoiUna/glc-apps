const Reservations = require("../db/Reservations");
const { Op } = require("sequelize");

module.exports = async (dateIndex) => {
  try {
    const currentDate = new Date(
      new Date(Date.now() + 10 ** 8 * dateIndex).toDateString()
    );

    const reservations = await Reservations.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "time_slot",
        "selected_date",
        "number_of_people",
      ],
      where: {
        selected_date: {
          [Op.eq]: currentDate,
        },
      },
      order: ["time_slot"],
    });

    return reservations;
  } catch (e) {
    console.error("Error getting data");
    console.error(e);
  }
};
