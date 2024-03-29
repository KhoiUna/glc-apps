const getEvents = require("../utils/getEvents");
const getSingleEvent = require("../utils/getSingleEvent");
const saveEvent = require("../utils/saveEvent");
const ImageKit = require("imagekit");
const saveStudent = require("../utils/saveStudent");
const saveSubmissions = require("../utils/saveSubmissions");
const getSubmissions = require("../utils/getSubmissions");
const deleteEvent = require("../utils/deleteEvent");
const updateSubmission = require("../utils/updateSubmission");
const checkStudentName = require("../helpers/checkStudentName");
const checkEvent = require("../helpers/checkEvent");
const validateEventDate = require("../helpers/validateEventDate");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const events = await getEvents();
    if (!events) return res.status(406).send("Sorry, there is something wrong");

    res.status(200).json(events);
  } catch (e) {
    console.error("Error getting events");
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { date } = req.body;

    if (!validateEventDate({ date }))
      return res.status(406).send("Don't try to go back in time!");

    if (await checkEvent({ date }))
      return res.status(406).send("An event already created on this date!");

    const eventId = await saveEvent({ date });
    if (!eventId)
      return res.status(406).send("Sorry, there is something wrong");

    res.status(200).json(eventId);
  } catch (e) {
    console.error("Error saving event");
    next(e);
  }
});

router.get("/submissions", async (req, res, next) => {
  try {
    const submissions = await getSubmissions({
      sqlLikeDate: req.query.date,
    });
    if (!submissions) return res.status(400).send("Sorry, something is wrong");

    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error getting submissions");
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const event = await getSingleEvent({ id: req.params.id });
    if (!event) return res.status(406).send("Sorry, there is something wrong");

    res.status(200).json(event);
  } catch (err) {
    console.error("Error getting event");
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!(await deleteEvent({ id: req.params.id })))
      return res.status(406).send("Sorry, there is something wrong");

    res.status(200).json("ok");
  } catch (err) {
    console.error("Error deleting event");
  }
});

router.get("/uploadImage/auth", (req, res, next) => {
  const imagekit = new ImageKit({
    urlEndpoint: process.env.IMGKIT_URL_ENDPOINT,
    publicKey: process.env.IMGKIT_PUBLIC_KEY,
    privateKey: process.env.IMGKIT_PRIVATE_KEY,
  });

  const result = imagekit.getAuthenticationParameters();

  res.send(result);
  next();
});

router.post("/submission", async (req, res, next) => {
  try {
    const { fullName, eventId, submissionDetails } = req.body;

    if (!fullName.trim() || !isNaN(fullName.trim()) || !eventId)
      return res.status(400).send("Sorry, something is wrong");

    const invalid = submissionDetails.every(
      ({ eventName, imagePath, imageId }) =>
        !Object.values({
          eventName: eventName.trim(),
          imagePath: imagePath.trim(),
          imageId: imageId.trim(),
        }).includes("")
    );
    if (!invalid) return res.status(400).send("Sorry, something is wrong");

    let studentId = await checkStudentName({ fullName });
    if (!studentId) {
      studentId = await saveStudent({ fullName });
      if (!studentId) return res.status(400).send("Sorry, something is wrong");
    }

    submissionDetails.forEach(({ eventName, imagePath, imageId }) => {
      saveSubmissions({ studentId, eventId, eventName, imagePath, imageId });
    });

    res.status(200).send("ok");
  } catch (err) {
    console.error("Error saving submission");
    next(err);
  }
});

router.put("/submission/:submissionId", async (req, res, next) => {
  try {
    const { action } = req.body;
    const { submissionId } = req.params;

    if (!(await updateSubmission({ submissionId, action })))
      return res.status(400).send("Sorry, something is wrong");

    res.status(200).send("ok");
  } catch (err) {
    console.error("Error updating submission");
    next(err);
  }
});

module.exports = router;
