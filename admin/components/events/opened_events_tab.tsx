import { useEffect, useState } from "react";
import EventsPaper from "./events_paper";

export default function OpenedEventsTab({}) {
  const [localStorageEvents, setLocalStorageEvents] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("events"))
      localStorage.setItem("events", JSON.stringify([]));

    setLocalStorageEvents(JSON.parse(localStorage.getItem("events")));
  }, []);

  return localStorageEvents.map((i, index) => (
    <EventsPaper key={index} eventData={i} />
  ));
}
