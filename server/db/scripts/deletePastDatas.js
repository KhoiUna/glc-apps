#!/usr/bin/env node

require("dotenv").config();
const { Op, QueryTypes } = require("sequelize");
const connection = require("../connection");
const Reservations = require("../Reservations");
const Submissions = require("../Submissions");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMGKIT_PUBLIC_KEY,
  privateKey: process.env.IMGKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMGKIT_URL_ENDPOINT,
});

const deleteNonImg = () => {
  imagekit.listFiles(
    {
      fileType: "non-image",
    },
    (error, result) => {
      if (error) console.log(error);
      const imgIDs = result.map((i) => i.fileId);

      imagekit.bulkDeleteFiles(imgIDs, (error, result) => {
        console.log("Bulk delete non-img:");
        if (error) return console.log(error);
        console.log("Success!");
        console.log();
      });
    }
  );
};

(async () => {
  try {
    const timeStamp = new Date().getTime();
    const oneWeekAgoDate = new Date(timeStamp - 24 * 60 * 60 * 1000 * 7);

    // Delete past reservations before one week ago
    await Reservations.destroy({
      where: {
        selected_date: {
          [Op.lt]: oneWeekAgoDate,
        },
      },
    });

    // Delete past non-images submissions & rejected submissions before one week ago
    deleteNonImg();

    const sql =
      "SELECT img_id FROM submissions WHERE status = 'rejected' AND DATE(submitted_at) < DATE(:oneWeekAgoDate);";
    const res = await connection.query(sql, {
      replacements: { oneWeekAgoDate },
      model: Submissions,
      type: QueryTypes.SELECT,
    });

    const imgIDs = res.map((i) => i.dataValues.img_id);
    if (imgIDs.length === 0) {
      return console.log("Nothing to delete\n");
    }

    imgIDs.forEach((id) => {
      imagekit.deleteFile(id, (err, res) => {
        console.error("Deleting img:");
        if (err) console.error(err);
        console.log("Success!");
        console.log();
      });

      Submissions.destroy({ where: { img_id: id } });
    });
  } catch (err) {
    console.error("Error deleting past data");
    return process.exit();
  }
})();
