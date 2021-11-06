import Popup from "../components/Popup/Popup";
import { useState } from "react";
import { Container, Paper, Grid, TextField, Button } from "@material-ui/core";
import { origin } from "../config/config";
import Layout from "../containers/layout";
import Script from "next/script";

export default function FeedbackForm() {
  const [data, setData] = useState({
    subject: "",
    feedback: "",
  });
  const handleChange = ({ target }) => {
    let { name, value } = target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [popUp, setPopUp] = useState(false);
  const [warn, setWarn] = useState("");

  const handleClick = async () => {
    try {
      const res = await fetch(`${origin}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      if (res.ok === true) {
        setPopUp(true);
        setData({
          subject: "",
          feedback: "",
        });
      } else {
        setWarn(await res.text());
      }
    } catch (e) {
      console.error("Error posting data...");
      console.error(e);
    }
  };

  return (
    <Layout componentName="Feedback">
      <form onChange={handleChange} onSubmit={(e) => e.preventDefault()}>
        <Container>
          <Paper elevation={10}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <h2 style={{ paddingTop: "3%" }}>FEEDBACK</h2>
              <div className="notice">
                <h3>
                  * If you have any complaints, feel free to send a feedback!
                </h3>
              </div>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="subject"
                  name="subject"
                  label="Subject"
                  fullWidth
                  autoComplete="off"
                  variant="filled"
                  value={data.subject}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  minrows={5}
                  maxRows={5}
                  aria-label="Feedback"
                  placeholder="Type your feedback"
                  name="feedback"
                  variant="filled"
                  multiline
                  value={data.feedback}
                />
              </Grid>

              {warn && (
                <Grid item xs={12} sm={6}>
                  <p style={{ fontWeight: "bold", color: "red" }}>
                    <i>{warn}</i>
                  </p>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                {data.subject && data.feedback ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    className="submit-button"
                    type="submit"
                  >
                    SUBMIT
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    className="submit-button"
                    disabled
                  >
                    SUBMIT
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </form>

      {popUp && <Popup fromForm="feedback" />}

      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/@gobistories/gobi-web-integration@^6.11.1"
      />
    </Layout>
  );
}
