import { useEffect, useState } from "react";

export default function OpenedEventsTab({ open }) {
  const [localStorageEvents, setLocalStorageEvents] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("events"))
      localStorage.setItem("events", JSON.stringify([]));

    setLocalStorageEvents(JSON.parse(localStorage.getItem("events")));
  }, [open]);

  return localStorageEvents.map((i, index) => (
    <div key={index}>
      Name: {i.eventName}
      <br />
      Event time: {new Date(i.eventTime).toLocaleString()}
      <br />
      <br />
    </div>
  ));
}
