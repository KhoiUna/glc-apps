const Reservations = require("../db/Reservations");
const sequelize = require("../db/connection");

module.exports = async ({
  firstName,
  lastName,
  numberOfPeople,
  selectedDate,
  timeSlot,
}) => {
  try {
    await sequelize.transaction(async (t) => {
      await Reservations.create(
        {
          first_name: firstName,
          last_name: lastName,
          number_of_people: numberOfPeople,
          selected_date: selectedDate,
          time_slot: timeSlot,
        },
        { transaction: t }
      );
    });
  } catch (e) {
    console.error("Error saving reservation");
    console.error(e);
  }
};
