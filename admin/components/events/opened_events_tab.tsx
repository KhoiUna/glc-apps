import { useEffect, useState } from "react";
import EventsPaper from "./events_paper";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { buttonTheme } from "../../themes/themes";
import { origin } from "../../config/config";

export default function OpenedEventsTab({}) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    console.log("hi");
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
    } catch (error) {
      console.error("Error creating event");
    }
  };

  return (
    <>
      {events.map((i, index) => (
        <EventsPaper key={index} eventData={i} />
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
