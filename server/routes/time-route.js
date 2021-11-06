const getReservationTime = require("../utils/getReservationTime");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const timeList = await getReservationTime();
    res.status(200).json(timeList);
  } catch (e) {
    console.error("Error getting time list");
    console.error(e);
  }
});

module.exports = router;
