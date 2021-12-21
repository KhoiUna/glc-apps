const { QueryTypes } = require("sequelize");
const connection = require("../db/connection");
const Submissions = require("../db/Submissions");

module.exports = async ({ dateIndex }) => {
  try {
    const timeStamp = new Date().getTime();
    const date = new Date(
      timeStamp + 24 * 60 * 60 * 1000 * dateIndex
    ).toUTCString();
    const sqlLikeDate = date.slice(0, 16);

    const submissions = await connection.query(
      "SELECT submissions.id, submitted_at, event_name, img_url, status, full_name FROM submissions JOIN students ON student_id = students.id WHERE submitted_at LIKE :date;",
      {
        replacements: { date: `${sqlLikeDate}%` },
        model: Submissions,
        type: QueryTypes.SELECT,
      }
    );

    return submissions;
  } catch (err) {
    console.error("Error getting submissions");
    console.error(err);
    return;
  }
};
