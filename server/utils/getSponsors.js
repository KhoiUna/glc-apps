const Sponsors = require("../db/Sponsors");

module.exports = async (date) => {
  try {
    const res = await Sponsors.findAll({
      attributes: [
        "id",
        "full_name",
        "school_email",
        "social_link",
        "submitted_date",
      ],
      //   where: {
      //     submitted_date: date,
      //   },
    });

    const sponsorsList = res.map((i) => i.dataValues);
    return sponsorsList;
  } catch (e) {
    console.error("Error getting sponsors list");
    console.error(e);
  }
};
