const Students = require("../db/Students");

module.exports = async ({ fullName }) => {
  try {
    const res = await Students.findOne({
      where: {
        full_name: fullName,
      },
    });
    return res.dataValues.id;
  } catch (err) {
    console.error("Error checking student name -helper");
    return;
  }
};
