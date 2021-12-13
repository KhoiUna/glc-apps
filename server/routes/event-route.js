const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({});
  } catch (e) {
    console.error("Error getting time list");
  }
});

module.exports = router;
