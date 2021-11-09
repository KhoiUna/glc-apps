import io from "socket.io-client";
import { origin } from "../../config/config";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

let socket;
export default function SubmissionsTab({}) {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    socket = io(origin, {
      withCredentials: true,
    });

    socket.on("submit", (submission) => {
      setSubmissions((prev) => [submission, ...prev]);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return submissions.map(
    ({ eventName, firstName, lastName, lNumber, submitted_date }, index) => (
      <Paper
        key={index}
        elevation={3}
        sx={{
          padding: "0.5rem",
          margin: "1.25rem 0.7rem",
        }}
      >
        <Typography>
          <b>Event name:</b> {eventName}
        </Typography>
        <b>{firstName + " " + lastName}</b> - L#{lNumber} -{" "}
        <i>{new Date(submitted_date).toLocaleString()}</i>
      </Paper>
    )
  );
}
