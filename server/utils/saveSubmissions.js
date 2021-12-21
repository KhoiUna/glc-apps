const Submissions = require("../db/Submissions");
const sequelize = require("../db/connection");

module.exports = async ({ studentId, eventId, eventName, imagePath }) => {
  try {
    await sequelize.transaction(async (t) => {
      await Submissions.create(
        {
          submitted_at: new Date().toUTCString(),
          event_name: eventName,
          img_url: imagePath,
          event_id: eventId,
          student_id: studentId,
        },
        { transaction: t }
      );
    });

    return true;
  } catch (e) {
    console.error("Error saving submission");
    return;
  }
};
