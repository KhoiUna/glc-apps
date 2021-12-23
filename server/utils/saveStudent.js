const Students = require("../db/Students");
const sequelize = require("../db/connection");

module.exports = async ({ fullName }) => {
  try {
    let studentId;
    await sequelize.transaction(async (t) => {
      const res = await Students.create(
        {
          full_name: fullName,
        },
        { transaction: t }
      );

      studentId = res.dataValues.id;
    });

    return studentId;
  } catch (err) {
    console.error("Error saving student");
    return;
  }
};
