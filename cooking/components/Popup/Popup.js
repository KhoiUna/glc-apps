import Link from "next/link";
import selectRandomQuotes from "../../helpers/selectRandomQuotes";
import Script from "next/script";
import { useEffect, useState } from "react";
import selectAudioQuotes from "../../helpers/selectAudioQuotes";

export default function Popup({ fromForm, firstName }) {
  const randomizeSponsor = (max) => Math.floor(Math.random() * max);
  const [showSponsor, setShowSponsor] = useState(false);
  useEffect(() => {
    // setShowSponsor(randomizeSponsor(2) === 1);
    setShowSponsor(false);
  }, []);

  const [quote, setQuote] = useState("");
  const [randomIndex, setRandomIndex] = useState(null);
  useEffect(() => {
    const { quote, randomIndex } = selectRandomQuotes(firstName);

    setQuote(quote);
    setRandomIndex(randomIndex);
  }, []);

  const speak = () => selectAudioQuotes(fromForm, randomIndex);

  return (
    <div className="Popup">
      {fromForm === "reserve" ? (
        <h2 className="greet">{quote}</h2>
      ) : (
        <h2 className="greet">Thanks for your feedback!</h2>
      )}
      {showSponsor ? (
        <>
          <h2 className="gobi-stories-load" style={{ margin: "3rem 1rem" }}>
            Please wait to see our sponsors...
          </h2>
          <div
            className="gobi-stories"
            data-gobi-stories="gbyvv"
            data-gobi-color="#aa67dd"
            data-gobi-bubble-size="200px"
            data-gobi-animated-bubble="true"
            data-gobi-auto-start-with-sound="true"
            style={{ zIndex: 2 }}
          ></div>
        </>
      ) : (
        <img
          src="/thankyou.jpg"
          alt="Thank you"
          width={200}
          style={{ margin: "3rem 1rem" }}
        />
      )}
      <br />

      <Link href="https://forms.gle/BPQqL51btozTzxuNA" passHref>
        <a target={"_blank"}>
          <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            {">>"} Let's do a quick survey
          </p>
        </a>
      </Link>

      {/* <Link href="/apply">
        <div
          id="apply-link"
          style={{
            color: "#640ba8",
            textAlign: "center",
            textDecoration: "underline",
            fontSize: "1.2rem",
            fontWeight: "bold",
            margin: "0.5rem 0",
            cursor: "pointer",
          }}
          hidden={showSponsor}
          onClick={speak}
        >
          <p>{">>"} Apply to be a sponsor!</p>
        </div>
      </Link> */}

      <Link href="/">
        <button id="home-button" hidden={showSponsor} onClick={speak}>
          Go back to home
        </button>
      </Link>
      <Script>
        {`new gobi.Bubbles({
            container: ".gobi-stories",
            bubbleSize: "200px",            
            animatedBubble: "true",
            color: "#aa67dd",
            titleFontSize: "2rem",
            titleFontWeight: "bold",
            stories: [
              {
                id: "gbyvv",
                title: "Click to watch",
              },            
            ],
            playerOptions: {
              autoStartWithSound: "true",
            },
            on: {
              loaded: () => {
                document.querySelector(".gobi-stories-load").innerText = "Sponsors";
                document.querySelector(".gobi-stories-load").style.margin = "2rem 1rem 1rem 1rem";
                document.querySelector("#apply-link").hidden = false;
                document.querySelector("#home-button").hidden = false;
              },
            }
          });`}
      </Script>
    </div>
  );
}
