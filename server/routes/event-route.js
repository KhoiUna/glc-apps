const saveEvent = require("../utils/saveEvent");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({});
  } catch (e) {
    console.error("Error getting time list");
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const eventId = await saveEvent({ date: req.body.date });
    if (!eventId)
      return res.status(406).send("* Sorry, there is something wrong");

    res.status(200).json(eventId);
  } catch (e) {
    console.error("Error saving event");
    next(e);
  }
});

module.exports = router;
