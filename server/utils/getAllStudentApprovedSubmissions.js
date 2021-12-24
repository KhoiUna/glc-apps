const { QueryTypes } = require("sequelize");
const connection = require("../db/connection");
const Submissions = require("../db/Submissions");

module.exports = async () => {
  try {
    const sql =
      "WITH submissions_students AS (SELECT submissions.id, event_id, submitted_at, event_name, img_url, status, full_name, students.id as student_id FROM submissions JOIN students ON student_id = students.id) SELECT student_id, full_name, event_name, created_at FROM events JOIN submissions_students ON submissions_students.event_id = events.id WHERE submissions_students.status = :status ORDER BY full_name;";
    const res = await connection.query(sql, {
      replacements: { status: "approved" },
      model: Submissions,
      type: QueryTypes.SELECT,
    });

    const submissions = res.map((item) => item.dataValues);
    return submissions;
  } catch (err) {
    console.error("Error getting all student approved submissions -util");
    return;
  }
};
