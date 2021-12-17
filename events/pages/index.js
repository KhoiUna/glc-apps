import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import Layout from "../containers/layout";
import { origin } from "../config/config";
import SubmissionDetailsPaper from "../components/submission_details_paper";

let socket;
export default function Home() {
  useEffect(() => {
    socket = io(origin, {
      withCredentials: true,
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const [eventData, setEventData] = useState({
    createdAt: "",
    status: "",
  });
  const [err, setErr] = useState(false);
  useEffect(() => {
    const url = new URL(window.location);
    const eventId = url.searchParams.get("id");

    fetch(`${origin}/api/event/${eventId}`)
      .then((r) => r.json())
      .then((r) => {
        setEventData({
          createdAt: r.created_at,
          status: r.status,
        });
      })
      .catch((err) => {
        console.error("Error getting single event");
        setErr(true);
      });
  }, []);

  const [formValue, setFormValue] = useState({
    fullName: "",
    submissionDetails: [],
  });
  const handleChange = ({ target }) => {
    setFormValue((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = () => {
    try {
      //
    } catch (err) {
      console.error("Error submitting form");
    }
  };

  const [length, setLength] = useState(1);
  const createSubmissionDetails = (e) => {
    setLength((prev) => prev + 1);
  };

  if (err)
    return (
      <Layout>
        <div style={{ margin: "1rem 0 1rem 2rem" }}>
          <h2 style={{ textAlign: "center", color: "red" }}>
            Invalid or expired link
          </h2>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div style={{ margin: "1rem 0 1rem 2rem" }}>
        <Typography variant="body1">
          <b>Date:</b> {new Date(eventData.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <b>Link status:</b> {eventData.status}
        </Typography>
      </div>

      <form onChange={handleChange} onSubmit={handleSubmit}>
        <Stack
          sx={{ margin: "1.5rem 1rem" }}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Full name:
          </Typography>
          <TextField
            name="fullName"
            label="Full name"
            variant="filled"
            required
            value={formValue.fullName}
          />
        </Stack>

        {new Array(length).fill({}).map((i, index) => (
          <SubmissionDetailsPaper
            key={index}
            createSubmissionDetails={createSubmissionDetails}
          />
        ))}

        <div style={{ textAlign: "center", margin: "1rem 0 1.5rem 0" }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Layout>
  );
}
