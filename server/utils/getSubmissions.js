const { QueryTypes } = require("sequelize");
const connection = require("../db/connection");
const Submissions = require("../db/Submissions");

module.exports = async ({ sqlLikeDate }) => {
  try {
    const submissions = await connection.query(
      "SELECT submissions.id, submitted_at, event_name, img_url, status, full_name, students.id as student_id FROM submissions JOIN students ON student_id = students.id WHERE submitted_at LIKE :date;",
      {
        replacements: { date: `${sqlLikeDate}%` },
        model: Submissions,
        type: QueryTypes.SELECT,
      }
    );
    return submissions;
  } catch (err) {
    console.error("Error getting submissions -util");
    return;
  }
};
