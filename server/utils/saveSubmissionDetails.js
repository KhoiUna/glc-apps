const SubmissionDetails = require("../db/SubmissionDetails");
const sequelize = require("../db/connection");

module.exports = async ({ submissionId, eventName, imagePath }) => {
  try {
    await sequelize.transaction(async (t) => {
      await SubmissionDetails.create(
        {
          submission_id: submissionId,
          event_name: eventName,
          img_url: imagePath,
        },
        { transaction: t }
      );
    });

    return true;
  } catch (err) {
    console.error("Error saving submission details");
    return;
  }
};
