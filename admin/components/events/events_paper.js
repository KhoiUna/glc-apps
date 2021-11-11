import Paper from "@mui/material/Paper";
import { useState } from "react";
import EventsViewDialog from "./events_view_dialog";

export default function EventsPaper({ eventData }) {
  const [openEventView, setOpenEventView] = useState(false);
  const toggleOpenEventView = () => {
    setOpenEventView(!openEventView);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "1rem",
          margin: "1.25rem 0.7rem",
          cursor: "pointer",
        }}
        onClick={toggleOpenEventView}
      >
        Name: {eventData.eventName}
        <br />
        Event time: {new Date(eventData.eventTime).toLocaleString()}
      </Paper>

      {openEventView && (
        <EventsViewDialog
          toggleOpenEventView={toggleOpenEventView}
          openEventView={openEventView}
          eventName={eventData.eventName}
        />
      )}
    </>
  );
}
