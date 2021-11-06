const router = require("express").Router();
const createDiscordAlert = require("../helpers/createDiscordAlert");

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, selectedDate, timeSlot } = req.body;
    const message = `**${firstName} ${lastName}** wants to cancel reservation on **${new Date(
      selectedDate
    ).toLocaleDateString()}** at **${timeSlot}**`;

    if (!(await createDiscordAlert("cancel", message)))
      res.sendStatus(406).send("* Sorry, error requesting cancellation");

    res.sendStatus(200);
  } catch (err) {
    console.error("Error sending cancellation alerts");
    console.error(err);
  }
});

module.exports = router;
