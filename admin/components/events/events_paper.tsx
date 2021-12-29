import Paper from "@mui/material/Paper";
import { useState } from "react";
import EventsViewDialog from "./events_view_dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EventsPaper({ eventData, deleteEvent }) {
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
          backgroundColor: eventData.status === "closed" ? "#f3f3f3" : "",
        }}
      >
        <Typography>
          <b>#{eventData.id}</b>
        </Typography>
        <Typography>
          <b>Created on:</b>{" "}
          {new Date(eventData.created_at).toLocaleDateString()}
        </Typography>
        <Typography>
          <b>Status:</b>{" "}
          <span
            style={{
              color: eventData.status === "closed" ? "#db0505" : "#009d00",
              fontWeight: "bold",
            }}
          >
            {eventData.status}
          </span>
        </Typography>

        <div style={{ textAlign: "right" }}>
          {/* <Button
            onClick={() => deleteEvent({ id: eventData.id })}
            variant="contained"
            type="submit"
            sx={{ margin: "0.5rem 1rem 0 0", backgroundColor: "#db0505" }}
          >
            <DeleteIcon />
          </Button> */}

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
