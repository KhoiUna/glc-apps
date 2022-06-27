import Link from "next/link";
import { useState, useEffect } from "react";
import { origin } from "../config/config";
import Calendar from "../components/Calendar/Calendar";
import Layout from "../containers/layout";
import homeStyles from "../styles/home.module.css";

export default function Home() {
  const [dateIndex, setDateIndex] = useState(0);
  const handleClickDate = (move) => {
    if (move === "left") {
      setDateIndex(dateIndex - 1);
    }
    if (move === "right") {
      setDateIndex(dateIndex + 1);
    }
    setNumReservedObj(null);
  };

  const [firstFetch, setFirstFetch] = useState(true);
  const [numReservedObj, setNumReservedObj] = useState(null);
  useEffect(() => {
    const res = (async () =>
      await fetch(`${origin}/api/calendar?dateIndex=${dateIndex}`))();
    res
      .then((r) => r.json())
      .then((r) => {
        setNumReservedObj(r);
        setFirstFetch(false);
      })
      .catch((err) => console.error("Error fetching reservations"));
  }, [dateIndex]);

  return (
    <Layout componentName="Home">
      <div className="App">
        <h2>RESERVE YOUR COOKING TIME BELOW</h2>

        <nav className={homeStyles.home_nav}>
          <ul>
            <li className={homeStyles.home_nav_li}>
              <Link href="https://forms.gle/BPQqL51btozTzxuNA" passHref>
                <a target={"_blank"}>
                  <p>{">>"} Let's do a quick survey</p>
                </a>
              </Link>
            </li>
            {/* <li className={homeStyles.home_nav_li}>
              <Link href="/sponsor">
                <p>{">>"} Check out our sponsorships</p>
              </Link>
            </li> */}
          </ul>
        </nav>

        <legend className="legend-home">
          <i>
            <strong>8 / 8</strong>: number of people reserved / number of people
            allowed
          </i>
          <div style={{ marginTop: "1%" }}>
            <i>
              <strong>* Click</strong> on the <strong>time slot</strong> to see
              who has reserved
            </i>
          </div>
        </legend>

        <Calendar
          numReservedObj={numReservedObj}
          dateIndex={dateIndex}
          handleClickDate={handleClickDate}
        />

        <div className="flex-buttons">
          {!firstFetch || numReservedObj ? (
            <>
              <Link href="/reserve">
                <button id="reserve-button">RESERVE</button>
              </Link>
              <Link href="/cancel">
                <button id="cancel-button">CANCEL</button>
              </Link>
              <Link href="/feedback">
                <button id="feedback-button">FEEDBACK</button>
              </Link>
            </>
          ) : (
            <p
              style={{
                padding: "0% 2%",
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Your RESERVE button will appear shortly. Please wait...
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
