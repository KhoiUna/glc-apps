const Feedback = require("../db/Feedback");
const sequelize = require("../db/connection");
const createDiscordAlert = require("../helpers/createDiscordAlert");

module.exports = async (subject, feedback) => {
  try {
    await sequelize.transaction(async (t) => {
      await Feedback.create(
        {
          subject: subject,
          feedback: feedback,
          submitted_date: new Date(new Date().toLocaleDateString()),
        },
        { transaction: t }
      );
    });

    createDiscordAlert("feedback", `**${subject}:** ${feedback}`);
  } catch (err) {
    console.error("Error saving feedback");
    console.error(err);
  }
};
