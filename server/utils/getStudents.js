const { QueryTypes } = require("sequelize");
const connection = require("../db/connection");
const Students = require("../db/Students");

module.exports = async () => {
  try {
    const sql =
      "SELECT students.id, full_name, CAST(COUNT(CASE WHEN submissions.status = 'approved' THEN 1 ELSE NULL END) AS INT) AS signature_count FROM students JOIN submissions ON students.id = student_id WHERE (status = 'approved' OR status='pending') GROUP BY students.id, full_name, status ORDER BY full_name;";
    const res = await connection.query(sql, {
      model: Students,
      type: QueryTypes.SELECT,
    });
    const students = res.map((i) => i.dataValues);
    return students;
  } catch (e) {
    console.error("Error getting students");
    return;
  }
};
