const Students = require("../db/Students");
const sequelize = require("sequelize");

module.exports = async ({ student_id }) => {
  try {
    const res = await Students.update(
      {
        signature_count: sequelize.literal("signature_count + 1"),
      },
      {
        where: {
          id: student_id,
        },
      }
    );

    return res;
  } catch (err) {
    console.error("Error updating student signature count -util");
    console.error(err);
  }
};
