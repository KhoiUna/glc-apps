const { parse } = require("json2csv");
const getAllStudentApprovedSubmissions = require("../utils/getAllStudentApprovedSubmissions");
const getStudentApprovedSubmissions = require("../utils/getStudentApprovedSubmissions");
const getStudentNames = require("../utils/getStudentNames");
const getStudents = require("../utils/getStudents");
const getStudentSubmissions = require("../utils/getStudentSubmissions");
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

router.get("/csv", async (req, res, next) => {
  try {
    let submissions = await getAllStudentApprovedSubmissions();
    submissions = submissions.map((item) => ({
      student_database_id: item.student_id,
      full_name: item.full_name.trim(),
      event_name: item.event_name.trim(),
      date_participated: new Date(item.created_at).toLocaleDateString(),
    }));
    const csvData = parse(submissions);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=student_signatures.csv"
    );
    res.status(200).end(csvData);
  } catch (err) {
    console.error("Error getting student signatures csv");
    next(err);
  }
});

router.get("/all/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const submissions = await getStudentSubmissions({ studentId });
    if (!submissions)
      return res.status(406).send("Sorry, there is something wrong");

    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error getting student's submissions");
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
