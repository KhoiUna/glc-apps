const Reservations = require("../db/Reservations");
const { Sequelize, Op } = require("sequelize");

module.exports = async (selectedDate, timeSlot, numberOfPeople) => {
  try {
    const res = await Reservations.findAll({
      attributes: [
        "selected_date",
        "time_slot",
        [
          Sequelize.fn("SUM", Sequelize.col("number_of_people")),
          "number_of_people",
        ],
      ],
      where: {
        [Op.and]: [{ selected_date: selectedDate }, { time_slot: timeSlot }],
      },
      group: ["selected_date", "time_slot"],
    });

    if (res.length === 0) return true;

    const numOfPplThatTime = res[0].dataValues.number_of_people * 1;

    return numOfPplThatTime + numberOfPeople <= 8;
  } catch (e) {
    console.error("Error getting data");
    console.error(e);
    return;
  }
};
