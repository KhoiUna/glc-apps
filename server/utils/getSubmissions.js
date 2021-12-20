const Submissions = require("../db/Submissions");
const Students = require("../db/Students");
const SubmissionDetails = require("../db/SubmissionDetails");
const { Op } = require("sequelize");
const Events = require("../db/Events");

module.exports = async ({ dateIndex }) => {
  try {
    const timeStamp = new Date().getTime();
    const date = new Date(
      timeStamp + 24 * 60 * 60 * 1000 * dateIndex
    ).toUTCString();
    const sqlLikeDate = date.slice(0, 16);

    const res = await Submissions.findAll({
      include: [
        {
          model: Events,
          attributes: ["created_at"],
          where: {
            created_at: {
              [Op.like]: `${sqlLikeDate}%`,
            },
          },
        },
        {
          model: Students,
          attributes: ["full_name"],
        },
        {
          model: SubmissionDetails,
          attributes: ["event_name", "img_url"],
        },
      ],
      where: {
        status: "pending",
      },
    });

    const submissions = res.map((i) => i.dataValues);
    return submissions;
  } catch (err) {
    console.error("Error getting submissions");
    console.error(err);
    return;
  }
};
