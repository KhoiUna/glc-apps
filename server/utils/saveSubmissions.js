const Submissions = require("../db/Submissions");
const sequelize = require("../db/connection");

module.exports = async ({
  studentId,
  eventId,
  eventName,
  imagePath,
  imageId,
}) => {
  try {
    await sequelize.transaction(async (t) => {
      const d = new Date();

      await Submissions.create(
        {
          submitted_at: new Date(
            new Date(d.getFullYear(), d.getMonth(), d.getDate())
          ).toUTCString(),
          event_name: eventName,
          img_url: imagePath,
          img_id: imageId,
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
