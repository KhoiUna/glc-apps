const Events = require("../db/Events");
const sequelize = require("../db/connection");
const createDiscordEvent = require("../helpers/createDiscordEvent");
const { eventSubmissionOrigin } = require("../config");

module.exports = async ({ date }) => {
  try {
    const d = new Date(date);

    let event;
    await sequelize.transaction(async (t) => {
      const res = await Events.create(
        {
          created_at: new Date(
            new Date(d.getFullYear(), d.getMonth(), d.getDate())
          ).toUTCString(),
          status: "opened",
        },
        { transaction: t }
      );

      event = res.dataValues;
      if (process.env.NODE_ENV === "production")
        createDiscordEvent({
          message: `${eventSubmissionOrigin}?id=${event.id}`,
        });
    });

    return event;
  } catch (err) {
    console.error("Error saving event");
    return;
  }
};
