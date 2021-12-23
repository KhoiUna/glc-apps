const Students = require("../db/Students");

module.exports = async () => {
  try {
    const res = await Students.findAll({
      attributes: ["id", "full_name"],
      order: [["full_name"]],
    });

    const studentNames = res.map((i) => i.dataValues);
    return studentNames;
  } catch (e) {
    console.error("Error getting student names -util");
    return;
  }
};
