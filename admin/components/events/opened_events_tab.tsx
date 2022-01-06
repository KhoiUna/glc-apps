import { useEffect, useState } from "react";
import EventsPaper from "./events_paper";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { buttonTheme } from "../../themes/themes";
import { origin } from "../../config/config";
import FormDialog from "./form_dialog";

export default function OpenedEventsTab({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [created, setCreated] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    fetch(`${origin}/api/event`)
      .then((r) => r.json())
      .then((r) => {
        setEvents(r);
        setIsLoading(false);
      })
      .catch((err) => console.error("Error getting events"));
  }, [created]);

  const deleteEvent = async ({ id }) => {
    try {
      const res = await (
        await fetch(`${origin}/api/event/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
      ).json();

      if (res === "ok") setEvents((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Error deleting event");
      console.error(err);
    }
  };

  const [open, setOpen] = useState(false);
  const toggleFormDialog = () => setOpen(!open);

  if (isLoading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (events.length === 0)
    return (
      <>
        <h2 style={{ textAlign: "center" }}>No events have been created!</h2>

        <FormDialog
          toggleFormDialog={toggleFormDialog}
          open={open}
          handleCreate={() => setCreated(!created)}
        />

        <Fab
          onClick={toggleFormDialog}
          color="primary"
          aria-label="Create event"
          sx={{ ...buttonTheme, position: "fixed", bottom: 5, right: 9 }}
          disabled={
            new Date(events[0]?.created_at).toLocaleDateString() ===
            new Date().toLocaleDateString()
          }
        >
          <AddIcon />
        </Fab>
      </>
    );

  return (
    <>
      {events.map((i, index) => (
        <EventsPaper key={index} eventData={i} deleteEvent={deleteEvent} />
      ))}

      <FormDialog
        toggleFormDialog={toggleFormDialog}
        open={open}
        handleCreate={() => setCreated(!created)}
      />

      <Fab
        onClick={toggleFormDialog}
        color="primary"
        aria-label="Create event"
        sx={{ ...buttonTheme, position: "fixed", bottom: 5, right: 9 }}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
