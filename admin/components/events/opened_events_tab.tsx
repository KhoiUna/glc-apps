import { useEffect, useState } from "react";
import EventsPaper from "./events_paper";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { buttonTheme } from "../../themes/themes";
import { origin } from "../../config/config";

export default function OpenedEventsTab({}) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch(`${origin}/api/event`)
      .then((r) => r.json())
      .then((r) => setEvents(r))
      .catch((err) => console.error("Error getting events"));
  }, []);

  const createEvent = async () => {
    try {
      const res = await (
        await fetch(`${origin}/api/event`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ date: new Date().toUTCString() }),
        })
      ).json();

      setEvents((prev) => [res, ...prev]);
    } catch (error) {
      console.error("Error creating event");
    }
  };

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

  return (
    <>
      {events.map((i, index) => (
        <EventsPaper key={index} eventData={i} deleteEvent={deleteEvent} />
      ))}

      <Fab
        onClick={createEvent}
        color="primary"
        aria-label="Create event"
        sx={{ ...buttonTheme, position: "fixed", bottom: 0, right: 9 }}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
