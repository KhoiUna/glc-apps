require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const helmet = require("helmet");
const compression = require("compression");
const { origin } = require("./config");

const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: [origin, "https://glc-admin.vercel.app", "http://localhost:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

//Routes
const calendarRoute = require("./routes/calendar-route");
app.use("/api/calendar", calendarRoute);

const reserveRoute = require("./routes/reserve-route");
app.use("/api/reserve", reserveRoute);

const feedbackRoute = require("./routes/feedback-route");
app.use("/api/feedback", feedbackRoute);

const applyRoute = require("./routes/apply-route");
app.use("/api/apply", applyRoute);

const cancelRoute = require("./routes/cancel-route");
app.use("/api/cancel", cancelRoute);

const timeRoute = require("./routes/time-route");
app.use("/api/time", timeRoute);

//Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

app.listen(PORT, () => {
  console.log("On port " + PORT);
});
