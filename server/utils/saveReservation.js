const Reservations = require("../db/Reservations");
const sequelize = require("../db/connection");

module.exports = async ({
  studentId,
  numberOfPeople,
  selectedDate,
  timeSlot,
}) => {
  try {
    await sequelize.transaction(async (t) => {
      await Reservations.create(
        {
          student_id: studentId,
          number_of_people: numberOfPeople,
          selected_date: selectedDate,
          time_slot: timeSlot,
        },
        { transaction: t }
      );
    });

    return true;
  } catch (e) {
    console.error("Error saving reservation -util");
    return;
  }
};
