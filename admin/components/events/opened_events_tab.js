import { useEffect, useState } from "react";
import EventsPaper from "./events_paper";

export default function OpenedEventsTab({ open }) {
  const [localStorageEvents, setLocalStorageEvents] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("events"))
      localStorage.setItem("events", JSON.stringify([]));

    setLocalStorageEvents(JSON.parse(localStorage.getItem("events")));
  }, [open]);

  return localStorageEvents.map((i, index) => (
    <EventsPaper key={index} eventData={i} />
  ));
}
