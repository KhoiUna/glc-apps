#!/usr/bin/env node

require("dotenv").config();
const { Op } = require("sequelize");
const Reservations = require("../Reservations");

(async () => {
  try {
    const timeStamp = new Date().getTime();
    const oneWeekAgoDate = new Date(timeStamp - 24 * 60 * 60 * 1000 * 7);

    // Delete past reservations before one week ago
    await Reservations.destroy({
      returning: true,
      where: {
        selected_date: {
          [Op.lt]: oneWeekAgoDate,
        },
      },
    });

    return process.exit();
  } catch (err) {
    console.error("Error deleting past data");
    console.error(err);
    return process.exit();
  }
})();
