const Sponsors = require("../db/Sponsors");
const sequelize = require("../db/connection");

module.exports = async (fullName, schoolEmail, socialLink) => {
  try {
    await sequelize.transaction(async (t) => {
      await Sponsors.create(
        {
          full_name: fullName,
          school_email: schoolEmail,
          social_link: socialLink,
          submitted_date: new Date(new Date().toLocaleDateString()),
        },
        { transaction: t }
      );
    });
  } catch (e) {
    console.error("Error saving sponsors");
    console.error(e);
  }
};
