import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import DOMPurify from "https://raw.githubusercontent.com/cure53/DOMPurify/main/dist/purify.min.js";

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

      <main className={styles.main} onScroll={handleScroll}>
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
