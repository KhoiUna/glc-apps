const Reservations = require("../db/Reservations");
const { QueryTypes } = require("sequelize");
const connection = require("../db/connection");

module.exports = async (dateIndex) => {
  try {
    const selectedDate = new Date(
      new Date(Date.now() + 10 ** 8 * dateIndex).toDateString()
    );
    const sql =
      "SELECT reservations.id, full_name, number_of_people, selected_date, time_slot FROM reservations JOIN students ON students.id = student_id WHERE selected_date = :selectedDate ORDER BY time_slot;";
    const reservations = await connection.query(sql, {
      replacements: { selectedDate },
      model: Reservations,
      type: QueryTypes.SELECT,
    });
    return reservations;
  } catch (e) {
    console.error("Error getting data -util");
    return;
  }
};
