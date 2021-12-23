const { QueryTypes } = require("sequelize");
const connection = require("../db/connection");
const Submissions = require("../db/Submissions");

module.exports = async ({ sqlLikeDate }) => {
  try {
    const sql =
      "WITH submissions_students AS (SELECT submissions.id, event_id, submitted_at, event_name, img_url, status, full_name, students.id as student_id FROM submissions JOIN students ON student_id = students.id) SELECT student_id, submissions_students.id, created_at, submitted_at, event_name, img_url, submissions_students.status, full_name FROM events JOIN submissions_students ON submissions_students.event_id = events.id WHERE submissions_students.status = :status AND events.created_at LIKE :date;";
    const submissions = await connection.query(sql, {
      replacements: { status: "pending", date: `${sqlLikeDate}%` },
      model: Submissions,
      type: QueryTypes.SELECT,
    });
    return submissions;
  } catch (err) {
    console.error("Error getting submissions -util");
    console.error(err);
    return;
  }
};
