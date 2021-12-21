const { Op } = require("sequelize");
const Students = require("../db/Students");
const Submissions = require("../db/Submissions");

module.exports = async ({ dateIndex }) => {
  try {
    const timeStamp = new Date().getTime();
    const date = new Date(
      timeStamp + 24 * 60 * 60 * 1000 * dateIndex
    ).toUTCString();
    const sqlLikeDate = date.slice(0, 16);

    const res = await Submissions.findAll({
      where: {
        status: "pending",
        submitted_at: {
          [Op.like]: `${sqlLikeDate}%`,
        },
      },
      include: {
        model: Students,
        attributes: ["full_name"],
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
