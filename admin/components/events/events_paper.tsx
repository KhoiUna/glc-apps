import Paper from "@mui/material/Paper";
import { useState } from "react";
import EventsViewDialog from "./events_view_dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
      >
        <Typography>
          <b>Created on:</b>{" "}
          {new Date(eventData.created_at).toLocaleDateString()}
        </Typography>

        <div style={{ textAlign: "right" }}>
          <Button
            onClick={toggleOpenEventView}
            variant="contained"
            type="submit"
            sx={{ margin: "0.5rem 0 0 0" }}
          >
            View link
          </Button>
        </div>
      </Paper>

      {openEventView && (
        <EventsViewDialog
          toggleOpenEventView={toggleOpenEventView}
          openEventView={openEventView}
          eventName={eventData.id}
        />
      )}
    </>
  );
}
