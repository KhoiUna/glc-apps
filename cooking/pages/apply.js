import Layout from "../containers/layout";
import { useState } from "react";
import { Container, Paper, Grid, TextField, Button } from "@material-ui/core";
import { origin } from "../config/config";

export default function Apply({}) {
  const [data, setData] = useState({
    fullName: "",
    schoolEmail: "",
    socialLink: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleChange = ({ target }) => {
    setSuccess("");
    setError("");

    let { name, value } = target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${origin}/api/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      if (res.ok === true) {
        setData({
          fullName: "",
          schoolEmail: "",
          socialLink: "",
        });
        setSuccess("Successfully submitted!");
      } else {
        setError(await res.text());
      }
    } catch (error) {
      if (error) console.error("Error submitting sponsorship form");
      setError("Error submitting sponsorship form");
    }
  };

  return (
    <Layout componentName="Apply">
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <Container>
          <Paper elevation={10}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <h2 style={{ paddingTop: "3%" }}>APPLY</h2>
              <div className="notice">
                <h3
                  style={{
                    color: "#46166b",
                    margin: "0",
                    textAlign: "left",
                    fontStyle: "italic",
                    lineHeight: "1.8rem",
                  }}
                >
                  * There is a small cost to keep this app running. Apply to be
                  sponsors to keep Rice Hall organized!
                  <br />* Share your social page to everyone in Rice!
                  <br />* Donate $6 !
                </h3>
              </div>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  fullWidth
                  autoComplete="off"
                  value={data.fullName}
                  variant="filled"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="email"
                  id="schoolEmail"
                  name="schoolEmail"
                  label="School Email"
                  fullWidth
                  autoComplete="off"
                  placeholder="...@una.edu"
                  value={data.schoolEmail}
                  variant="filled"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="socialLink"
                  name="socialLink"
                  label="Social Link (optional)"
                  fullWidth
                  autoComplete="off"
                  placeholder="Eg: Instagram"
                  value={data.socialLink}
                  variant="filled"
                />
              </Grid>

              {success && (
                <Grid item xs={12} sm={6}>
                  <p style={{ fontWeight: "bold", color: "#00e412" }}>
                    <i>{success}</i>
                  </p>
                </Grid>
              )}
              {error && (
                <Grid item xs={12} sm={6}>
                  <p style={{ fontWeight: "bold", color: "red" }}>
                    <i>{error}</i>
                  </p>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className="submit-button"
                  type="submit"
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </form>
    </Layout>
  );
}
