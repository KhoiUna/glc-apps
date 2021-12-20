const { QueryTypes } = require("sequelize");
const connection = require("../db/connection");

module.exports = async ({ dateIndex }) => {
  try {
    const timeStamp = new Date().getTime();
    const date = new Date(
      timeStamp + 24 * 60 * 60 * 1000 * dateIndex
    ).toUTCString();
    const sqlLikeDate = date.slice(0, 16);

    const submissions = await connection.query(
      `WITH events_submissions_students AS (WITH submissions_students AS (SELECT event_id, full_name, submitted_at, submissions.status, submissions.id FROM submissions JOIN students ON submissions.student_id = students.id) SELECT created_at, full_name, submitted_at, submissions_students.status, submissions_students.id FROM submissions_students JOIN events ON event_id = events.id) SELECT created_at, full_name, submitted_at, status, event_name, img_url FROM events_submissions_students JOIN submission_details ON events_submissions_students.id = submission_id WHERE created_at LIKE '${sqlLikeDate}%';`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return submissions;
  } catch (err) {
    console.error("Error getting submissions");
    return;
  }
};
