import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import Layout from "../containers/layout";
import { origin } from "../config/config";
import SubmissionDetailsPaper from "../components/submission_details_paper";
import SubmissionUtil from "../utils/SubmissionUtil";

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
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error getting single event");
        setErr(true);
        setIsLoading(false);
      });
  }, []);

  const [fullName, setFullName] = useState("");
  const [submissionDetails, setSubmissionDetails] = useState([
    {
      eventName: "",
      imagePath: "",
    },
  ]);

  const createSubmissionDetails = (e) => {
    setSubmissionDetails((prev) => [
      ...prev,
      {
        eventName: "",
        imagePath: "",
      },
    ]);
  };

  const handleChangeSubmissionDetails = ({
    index,
    type,
    eventName = "",
    imagePath = "",
  }) => {
    if (type === "eventName")
      setSubmissionDetails((prev) => {
        const newSubmissionDetails = prev;
        newSubmissionDetails[index].eventName = eventName;
        return newSubmissionDetails;
      });

    if (type === "imagePath")
      setSubmissionDetails((prev) => {
        const newSubmissionDetails = prev;
        newSubmissionDetails[index].imagePath = imagePath;
        return newSubmissionDetails;
      });
  };

  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sanitizedSubmissionDetails = submissionDetails.filter(
        (i) => i.eventName && i.imagePath
      );
      const submitObject = {
        fullName,
        sanitizedSubmissionDetails,
      };

      if (await SubmissionUtil.submitForm(submitObject)) {
        setSuccess(true);
        setFullName("");
        setSubmissionDetails([
          {
            eventName: "",
            imagePath: "",
          },
        ]);
      }
    } catch (err) {
      console.error("Error submitting form");
    }
  };

  if (isLoading)
    return (
      <Layout>
        <div style={{ margin: "1rem 0 1rem 2rem" }}>
          <h2 style={{ textAlign: "center" }}>Loading form...</h2>
        </div>
      </Layout>
    );

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

      <form onSubmit={handleSubmit}>
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
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
          />
        </Stack>

        {submissionDetails.map((i, index) => (
          <SubmissionDetailsPaper
            key={index}
            index={index}
            submissionDetail={i}
            createSubmissionDetails={createSubmissionDetails}
            handleChangeSubmissionDetails={handleChangeSubmissionDetails}
          />
        ))}

        <div style={{ textAlign: "center", margin: "1rem 0 1.5rem 0" }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>

      {success && (
        <h3 style={{ textAlign: "center", color: "#1da51d" }}>
          Successsfully submitted!
        </h3>
      )}
    </Layout>
  );
}
