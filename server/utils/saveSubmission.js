const Submissions = require("../db/Submissions");
const sequelize = require("../db/connection");

module.exports = async ({ studentId, eventId }) => {
  try {
    let submissionId;
    await sequelize.transaction(async (t) => {
      const res = await Submissions.create(
        {
          submitted_at: new Date().toUTCString(),
          student_id: studentId,
          event_id: eventId,
        },
        { transaction: t }
      );

      submissionId = res.dataValues.id;
    });

    return submissionId;
  } catch (e) {
    console.error("Error saving submission");
    return;
  }
};
