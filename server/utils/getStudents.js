const Students = require("../db/Students");

module.exports = async () => {
  try {
    const res = await Students.findAll();
    const students = res.map((i) => i.dataValues);
    return students;
  } catch (e) {
    console.error("Error getting students");
    return;
  }
};
