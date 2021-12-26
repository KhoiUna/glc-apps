const connection = require("../db/connection");
const Reservations = require("../db/Reservations");
const { QueryTypes } = require("sequelize");

module.exports = async (selectedDate, timeSlot) => {
  try {
    const sql =
      "SELECT full_name, number_of_people, selected_date, time_slot FROM reservations JOIN students ON students.id = student_id WHERE selected_date = :selectedDate AND time_slot = :timeSlot;";
    const reservations = await connection.query(sql, {
      replacements: { selectedDate, timeSlot },
      model: Reservations,
      type: QueryTypes.SELECT,
    });
    return reservations;
  } catch (e) {
    console.error("Error getting reservations list");
    console.error(e);
    return;
  }
};
