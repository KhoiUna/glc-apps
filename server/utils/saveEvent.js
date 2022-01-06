const Events = require("../db/Events");
const sequelize = require("../db/connection");
const createDiscordEvent = require("../helpers/createDiscordEvent");
const { eventSubmissionOrigin } = require("../config");
const dateDifference = require("../helpers/dateDifference");

module.exports = async ({ date }) => {
  try {
    const d = new Date(date);
    const createdDate = new Date(
      new Date(d.getFullYear(), d.getMonth(), d.getDate())
    ).toUTCString();

    let event;
    await sequelize.transaction(async (t) => {
      const res = await Events.create(
        {
          created_at: createdDate,
          status: dateDifference(createdDate) > 0 ? "pending" : "opened",
        },
        { transaction: t }
      );

      event = res.dataValues;
      if (
        process.env.NODE_ENV === "production" &&
        dateDifference(createdDate) === 0
      )
        createDiscordEvent({
          message: `${eventSubmissionOrigin}?id=${event.id}`,
        });
    });

    return event;
  } catch (err) {
    console.error("Error saving event");
    console.error(err);
    return;
  }
};
