import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Layout from "../containers/layout";
import { origin } from "../config/config";
import SubmissionDetailsPaper from "../components/submission_details_paper";
import SubmissionUtil from "../utils/SubmissionUtil";
import dateDifference from "../helpers/dateDifference";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "next/link";
import { handleChangeSubmissionDetailsProps } from "../types/types";

export default function Home() {
  const [eventData, setEventData] = useState({
    createdAt: "",
    status: "",
  });
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    const url = new URL(window.location.href);
    const eventId = url.searchParams.get("id");

    fetch(`${origin}/api/event/${eventId}`)
      .then((r) => r.json())
      .then((r) => {
        r.status = r.status.trim();

        if (
          r.status === "closed" ||
          r.status === "pending" ||
          dateDifference(r.created_at, new Date()) > 2
        ) {
          setErr(true);
        } else {
          setEventData({
            createdAt: r.created_at,
            status: r.status,
          });
        }
      })
      .catch((err) => {
        console.error("Error getting single event");
        setErr(true);
        setIsLoading(false);
      });

    SubmissionUtil.fetchStudentNames()
      .then((r) => {
        setOptions(
          r.map((item) => ({
            label: item.full_name,
            studentId: item.id,
          }))
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error getting student names");
        setErr(true);
        setIsLoading(false);
      });
  }, []);

  const [fullName, setFullName] = useState("");
  const [submissionDetails, setSubmissionDetails] = useState([
    {
      eventName: "",
      imagePath: "",
      imageId: "",
    },
  ]);

  const createSubmissionDetails = () =>
    setSubmissionDetails((prev) => [
      ...prev,
      {
        eventName: "",
        imagePath: "",
        imageId: "",
      },
    ]);
  const removeSubmissionDetails = ({ index }) =>
    setSubmissionDetails((prev) => prev.filter((item, i) => i !== index));

  const handleChangeSubmissionDetails = ({
    index,
    type,
    eventName,
    imagePath,
    imageId,
  }: handleChangeSubmissionDetailsProps) => {
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
        newSubmissionDetails[index].imageId = imageId;
        return newSubmissionDetails;
      });
  };

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);

      const url = new URL(window.location.href);
      const eventId = url.searchParams.get("id");
      const submitObject = {
        fullName,
        eventId,
        submissionDetails,
      };

      if (await SubmissionUtil.submitForm({ submitObject })) {
        setSuccess(true);
        setFullName("");
        return setSubmissionDetails([
          {
            eventName: "",
            imagePath: "",
            imageId: "",
          },
        ]);
      }

      return setError(true);
    } catch (err) {
      console.error("Error submitting form");
      return setError(true);
    }
  };

  const [value, setValue] = useState(options[0]);

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
          <b>Event date:</b>{" "}
          {new Date(eventData.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <b>Link status:</b> {eventData.status}
        </Typography>
      </div>

      <ul
        style={{
          border: "3px solid #000",
          borderRadius: "12px",
          margin: "0 0.5rem",
          backgroundColor: "#f7f7f7",
        }}
      >
        <li>
          <Typography
            variant="body1"
            sx={{ margin: "1rem 1.5rem", color: "red" }}
          >
            If this is your first time submitting, your name will not show in
            the dropdown menu.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ margin: "1rem 1.5rem", color: "red" }}
          >
            Please wait for Maria to approve your submissions
          </Typography>
        </li>
      </ul>

      {!success && (
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

            <Autocomplete
              freeSolo
              id="fullName"
              onChange={(event, newValue) => setValue(newValue)}
              inputValue={fullName}
              onInputChange={(event, newInputValue) =>
                setFullName(newInputValue)
              }
              options={options}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="fullName"
                  label="Full name"
                  variant="filled"
                  required
                />
              )}
            />
          </Stack>

          {submissionDetails.map((i, index) => (
            <SubmissionDetailsPaper
              key={index}
              index={index}
              submissionDetailsLength={submissionDetails.length}
              createSubmissionDetails={createSubmissionDetails}
              removeSubmissionDetails={removeSubmissionDetails}
              handleChangeSubmissionDetails={handleChangeSubmissionDetails}
            />
          ))}

          <div style={{ textAlign: "center", margin: "1rem 0 1.5rem 0" }}>
            <Button variant="contained" type="submit" disabled={success}>
              Submit
            </Button>
          </div>
        </form>
      )}

      {success && (
        <div style={{ margin: "5rem 1rem" }}>
          <h3 style={{ textAlign: "center", color: "#1da51d" }}>
            Successsfully submitted! <br />
            <span style={{ color: "red" }}>
              Please wait to be reviewed by Maria!
            </span>
            <br />
            Click{" "}
            <Link href="/students">
              <span
                style={{
                  color: "#0000ff",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                here
              </span>
            </Link>{" "}
            to check your signatures
          </h3>
        </div>
      )}
      {error && (
        <h3 style={{ textAlign: "center", color: "red" }}>
          Invalid! Check again maybe you miss something!
        </h3>
      )}
    </Layout>
  );
}
