#!/usr/bin/env node

require("dotenv").config();
const { Op } = require("sequelize");
const { eventSubmissionOrigin } = require("../../config");
const Events = require("../Events");
const createDiscordEvent = require("../../helpers/createDiscordEvent");

(async () => {
  try {
    const d = new Date();
    const currentDate = new Date(
      new Date(d.getFullYear(), d.getMonth(), d.getDate())
    ).toUTCString();

    const res = await Events.update(
      {
        status: "opened",
      },
      {
        returning: true,
        where: {
          [Op.and]: {
            created_at: currentDate,
            status: "pending",
          },
        },
      }
    );

    if (process.env.NODE_ENV === "production" && res[1].length !== 0) {
      const id = res[1][0].dataValues.id;
      await createDiscordEvent({
        message: `${eventSubmissionOrigin}?id=${id}`,
      });
    }

    return process.exit();
  } catch (err) {
    console.error("Error getting single event");
    return process.exit();
  }
})();
