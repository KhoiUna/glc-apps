const getStudentNames = require("../utils/getStudentNames");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const studentNames = await getStudentNames();
    if (!studentNames)
      return res.status(406).send("Sorry, there is something wrong");

    res.status(200).json(studentNames);
  } catch (err) {
    console.error("Error getting student names");
    next(err);
  }
});

module.exports = router;
