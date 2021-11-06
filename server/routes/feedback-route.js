const router = require("express").Router();
const saveFeedback = require("../utils/saveFeedback");
const getFeedback = require("../utils/getFeedback");

router.post("/", async (req, res) => {
  try {
    if (!req.body.subject.trim() && !req.body.feedback.trim()) {
      res.status(406).send("* Invalid data");
    } else {
      saveFeedback(req.body.subject, req.body.feedback);
      res.sendStatus(200);
    }
  } catch (e) {
    console.error("Error posting feedback");
    console.error(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const date = req.query.date;
    const feedbackList = await getFeedback(date);
    res.status(200).json(feedbackList);
  } catch (e) {
    console.error("Error getting feedback");
    console.error(e);
  }
});

module.exports = router;
