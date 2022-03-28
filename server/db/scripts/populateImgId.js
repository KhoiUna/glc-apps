#!/usr/bin/env node

require("dotenv").config();
const Submissions = require("../Submissions");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMGKIT_PUBLIC_KEY,
  privateKey: process.env.IMGKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMGKIT_URL_ENDPOINT,
});

const parseFileName = (imgURL) => imgURL.split("glc_upload/")[1];

const findImgId = async (fileName) => {
  try {
    const res = await imagekit.listFiles({
      searchQuery: `name="${fileName}"`,
    });
    console.log(res.fileId);

    return res.fileId;
  } catch (error) {
    console.error("Error finding image ID");
    console.log(error);
    return;
  }
};

(async () => {
  try {
    const res = await Submissions.findAll({
      attributes: ["img_url"],
    });
    const fileNames = res.map((i) => parseFileName(i.dataValues.img_url));
    const fileIDs = [];
    fileNames.forEach((name) => {
      setTimeout(() => {
        findImgId(name).then((r) => console.log(r));
      }, 1000);
    });
    // console.log(fileIDs);

    return process.exit();
  } catch (err) {
    console.error("Error populating image IDs");
    console.log(err);
    return process.exit();
  }
})();
