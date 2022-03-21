const { QueryTypes } = require("sequelize");
const connection = require("../db/connection");
const Submissions = require("../db/Submissions");

module.exports = async ({ studentId }) => {
  try {
    const sql =
      "SELECT students.id AS student_id, submissions.id, submitted_at, event_name, img_url FROM submissions JOIN students ON student_id = students.id WHERE (status = 'approved' OR status = 'pending') AND student_id = :studentId;";
    const submissions = await connection.query(sql, {
      replacements: { studentId },
      model: Submissions,
      type: QueryTypes.SELECT,
    });
    return submissions;
  } catch (err) {
    console.error("Error getting student approved submissions -util");
    return;
  }
};
