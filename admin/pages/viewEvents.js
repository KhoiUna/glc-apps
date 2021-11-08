import Head from "next/head";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function Home() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    fetch(`https://una.edu/apps/api/calendar/events/public/${index}`)
      .then((r) => r.json())
      .then((d) => {
        d.results = d.results.filter(
          (d) => d.category === "Students" || d.category === "Sports"
        );
        const limit = 30;
        const r = d.results.slice(index * limit, index * limit + limit);
        setData((prev) => [...prev, ...r]);
      });
  }, [index]);

  const handleScroll = ({ target }) => {
    if (target.scrollTop + target.offsetHeight === target.scrollHeight)
      return setIndex((prev) => prev + 1);
  };

  return (
    <>
      <Head>
        <title>GLC Events</title>
      </Head>

      <main
        style={{
          overflowY: "scroll",
          maxHeight: "100vh",
          margin: "0 0 0 1rem",
        }}
        onScroll={handleScroll}
      >
        {data?.map((d, index) => (
          <p key={index}>
            <b>
              {index + 1}) {d.title} ({d.category})
            </b>{" "}
            <i>{d.startDate}</i>:{" "}
            {DOMPurify.sanitize(d.summary, {
              USE_PROFILES: { html: false },
            })}
          </p>
        ))}
      </main>
    </>
  );
}
