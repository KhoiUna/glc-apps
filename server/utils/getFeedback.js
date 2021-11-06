const Feedback = require("../db/Feedback");

module.exports = async (date) => {
  try {
    const res = await Feedback.findAll({
      attributes: ["id", "subject", "feedback", "submitted_date"],
      //   where: {
      //     submitted_date: date,
      //   },
    });

    const feedbackList = res.map((i) => i.dataValues);
    return feedbackList;
  } catch (e) {
    console.error("Error getting feedback list");
    console.error(e);
  }
};
