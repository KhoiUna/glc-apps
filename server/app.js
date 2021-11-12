require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const helmet = require("helmet");
const compression = require("compression");
const { origin } = require("./config");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin,
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

//Socket
io.on("connection", (socket) => {
  console.log("------User connected------");

  socket.on(
    "submit",
    ({ eventName, firstName, lastName, lNumber, imgBlob }) => {
      //TODO: decode imgBlob  to store in db
      console.log(imgBlob);

      io.emit("submit", {
        eventName,
        firstName,
        lastName,
        lNumber,
        imgBlob,
        submitted_date: new Date().toUTCString(),
      });
    }
  );

  //Listen when users disconnect
  socket.on("disconnect", () => {
    console.log("------User disconnected------");
  });
});

//Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

server.listen(PORT, () => {
  console.log("On port " + PORT);
});
