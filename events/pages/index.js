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
    createdDate: "",
    status: "",
  });
  useEffect(() => {
    const url = new URL(window.location);
    const eventId = url.searchParams.get("id");
    //TODO: fetch get status
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

  return (
    <Layout>
      <div style={{ margin: "1rem 0 1rem 2rem" }}>
        <Typography variant="body1">
          <b>Date:</b> {eventData.createdDate}
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

        {new Array(2).fill({}).map((i) => (
          <SubmissionDetailsPaper />
        ))}

        <div style={{ textAlign: "center" }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Layout>
  );
}
