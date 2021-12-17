const Events = require("../db/Events");
const sequelize = require("../db/connection");
const createDiscordEvent = require("../helpers/createDiscordEvent");
const { eventSubmissionOrigin } = require("../config");

module.exports = async ({ date }) => {
  try {
    await sequelize.transaction(async (t) => {
      const res = await Events.create(
        {
          created_at: new Date(new Date(date).toUTCString()),
          status: "opened",
        },
        { transaction: t }
      );

      const eventId = res.dataValues.id;
      if (process.env.NODE_ENV === "production")
        createDiscordEvent({
          message: `${eventSubmissionOrigin}?id=${eventId}`,
        });
    });

    return true;
  } catch (err) {
    console.error("Error saving event");
    return;
  }
};
