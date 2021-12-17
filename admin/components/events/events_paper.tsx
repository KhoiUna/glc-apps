import Paper from "@mui/material/Paper";
import { useState } from "react";
import EventsViewDialog from "./events_view_dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EventsPaper({ eventData }) {
  const [openEventView, setOpenEventView] = useState(false);
  const toggleOpenEventView = () => {
    setOpenEventView(!openEventView);
  };

  const deleteEvent = () => {
    //
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "1rem",
          margin: "1.25rem 0.7rem",
        }}
      >
        <Typography>
          <b>Created on:</b>{" "}
          {new Date(eventData.created_at).toLocaleDateString()}
        </Typography>
        <Typography>
          <b>Status:</b> {eventData.status}
        </Typography>

        <div style={{ textAlign: "right" }}>
          <Button
            onClick={deleteEvent}
            variant="contained"
            type="submit"
            sx={{ margin: "0.5rem 1rem 0 0" }}
          >
            <DeleteIcon />
          </Button>

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
