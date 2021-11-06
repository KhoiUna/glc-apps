const Reservations = require("../db/Reservations");

module.exports = async (selectedDate, timeSlot) => {
  try {
    const res = await Reservations.findAll({
      attributes: ["first_name", "last_name", "number_of_people"],
      where: {
        selected_date: new Date(selectedDate),
        time_slot: timeSlot,
      },
    });

    const reservationsList = res.map((i) => i.dataValues);
    return reservationsList;
  } catch (e) {
    console.error("Error getting reservations list");
    console.error(e);
  }
};
