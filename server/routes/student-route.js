const getStudentApprovedSubmissions = require("../utils/getStudentApprovedSubmissions");
const getStudentNames = require("../utils/getStudentNames");
const getStudents = require("../utils/getStudents");
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

router.get("/all", async (req, res, next) => {
  try {
    const students = await getStudents();
    if (!students)
      return res.status(406).send("Sorry, there is something wrong");

    res.status(200).json(students);
  } catch (err) {
    console.error("Error getting students");
    next(err);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const submissions = await getStudentApprovedSubmissions({ studentId });
    if (!submissions)
      return res.status(406).send("Sorry, there is something wrong");

    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error getting student's approved submissions");
    next(err);
  }
});

module.exports = router;
