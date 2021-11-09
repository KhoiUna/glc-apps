import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

export default function OpenedEventsTab({ open }) {
  const [localStorageEvents, setLocalStorageEvents] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("events"))
      localStorage.setItem("events", JSON.stringify([]));

    setLocalStorageEvents(JSON.parse(localStorage.getItem("events")));
  }, [open]);

  return localStorageEvents.map((i, index) => (
    <Paper
      key={index}
      elevation={3}
      sx={{
        padding: "0.5rem",
        margin: "1.25rem 0.7rem",
      }}
    >
      Name: {i.eventName}
      <br />
      Event time: {new Date(i.eventTime).toLocaleString()}
      <br />
      <br />
    </Paper>
  ));
}
