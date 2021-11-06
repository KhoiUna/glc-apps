const getReservations = require("../utils/getReservations");
const getReservationsList = require("../utils/getReservationsList");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const dateIndex = req.query.dateIndex;
    const reservations = await getReservations(dateIndex);
    res.status(200).json(reservations);
  } catch (e) {
    console.error("Error getting reservations...");
    console.error(e);
  }
});

router.get("/reservations-list", async (req, res) => {
  try {
    const selectedDate = req.query.selectedDate;
    const timeSlot = req.query.timeSlot;
    const reservationsList = await getReservationsList(selectedDate, timeSlot);
    res.status(200).json(reservationsList);
  } catch (e) {
    console.error("Error getting reservations list");
    console.error(e);
  }
});

module.exports = router;
