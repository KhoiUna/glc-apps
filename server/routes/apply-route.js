const router = require("express").Router();
const saveSponsors = require("../utils/saveSponsors.js");
const getSponsors = require("../utils/getSponsors.js");

router.post("/", async (req, res) => {
  try {
    if (!req.body.fullName.trim() && !req.body.schoolEmail.trim()) {
      res.status(406).send("* Invalid data");
    } else {
      saveSponsors(
        req.body.fullName,
        req.body.schoolEmail,
        req.body.socialLink
      );
      res.sendStatus(200);
    }
  } catch (e) {
    console.error("Error posting sponsors");
    console.error(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const date = req.query.date;
    const sponsorsList = await getSponsors(date);
    res.status(200).json(sponsorsList);
  } catch (e) {
    console.error("Error getting sponsors");
    console.error(e);
  }
});

module.exports = router;
