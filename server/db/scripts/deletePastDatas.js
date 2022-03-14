#!/usr/bin/env node

require("dotenv").config();
const { Op, QueryTypes } = require("sequelize");
const connection = require("../connection");
const Reservations = require("../Reservations");
const Submissions = require("../Submissions");

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

    // Delete past rejected submissions before one week ago
    const sql =
      "DELETE FROM submissions WHERE status = 'rejected' AND DATE(submitted_at) < DATE(:oneWeekAgoDate)";
    await connection.query(sql, {
      replacements: { oneWeekAgoDate },
      model: Submissions,
      type: QueryTypes.DELETE,
    });

    return process.exit();
  } catch (err) {
    console.error("Error deleting past data");
    return process.exit();
  }
})();
