const Submissions = require("../db/Submissions");
const Students = require("../db/Students");
const SubmissionDetails = require("../db/SubmissionDetails");

module.exports = async () => {
  try {
    const res = await Submissions.findAll({
      include: [
        {
          model: Students,
          attributes: ["full_name"],
        },
        {
          model: SubmissionDetails,
          attributes: ["event_name", "img_url"],
        },
      ],
    });

    const submissions = res.map((i) => i.dataValues);
    return submissions;
  } catch (err) {
    console.error("Error getting submissions");
    console.error(err);
    return;
  }
};
