import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [eventName, setEventName] = useState("");
  useEffect(() => {
    const url = new URL(window.location);
    const eventName = url.searchParams.get("eventName");
    setEventName(eventName);
  }, []);

  return (
    <>
      <Head>
        <title>GLC Events</title>
      </Head>

      <main>Event name: {eventName}</main>
    </>
  );
}
