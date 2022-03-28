#!/usr/bin/env node

require("dotenv").config();
const Submissions = require("../Submissions");
const ImageKit = require("imagekit");
const { Op } = require("sequelize");

const imagekit = new ImageKit({
  publicKey: process.env.IMGKIT_PUBLIC_KEY,
  privateKey: process.env.IMGKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMGKIT_URL_ENDPOINT,
});

const parseFileName = (imgURL) => imgURL.split("glc_upload/")[1];

const findImgId = async (submissionId, fileName) => {
  try {
    const res = await imagekit.listFiles({
      searchQuery: `name="${fileName}"`,
    });
    const { fileId } = res[0];

    return fileId;
  } catch (error) {
    console.error("Error finding image ID for submission ID:", submissionId);
    return process.exit();
  }
};

const populateImgId = async () => {
  try {
    const res = await Submissions.findAll({
      attributes: ["id", "img_url"],
      order: ["id"],
      where: {
        img_id: {
          [Op.eq]: null,
        },
      },
    });

    const fileNames = res.map((i) => ({
      id: i.dataValues.id,
      imageName: parseFileName(i.dataValues.img_url),
    }));
    console.log("fileNames length:", fileNames.length);
    if (fileNames.length === 0) {
      console.log("Done populating!");
      return process.exit();
    }

    console.log("Last fileNames ID:", fileNames[fileNames.length - 1].id);
    console.log();

    const fileIDs = fileNames
      .slice(
        0,
        fileNames.length === 1
          ? fileNames.length
          : Math.round(fileNames.length * 0.4, 0)
      )
      .map(async (i) => ({
        id: i.id,
        imageId: await findImgId(i.id, i.imageName),
      }));

    Promise.all(fileIDs)
      .then((r) => {
        r.forEach(async ({ id, imageId }) => {
          if (imageId) {
            const res = await Submissions.update(
              {
                img_id: imageId,
              },
              {
                where: { id },
              }
            );
            if (res) console.log("Updated", id);
          }
        });
      })
      .catch((e) => console.error(e));
  } catch (err) {
    console.error("Error populating image IDs");
    return process.exit();
  }
};

(async () => {
  setInterval(() => {
    populateImgId();
  }, 10000);
})();
