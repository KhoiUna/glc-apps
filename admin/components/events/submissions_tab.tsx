import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import SubmissionUtil from "../../utils/SubmissionUtil";
import Image from "next/image";
import imageLoader from "../../helpers/imageLoader";
import Stack from "@mui/material/Stack";
import { buttonTheme } from "../../themes/themes";
import calculateDate from "../../helpers/calculateDate";

export default function SubmissionsTab({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [dateIndex, setDateIndex] = useState(0);
  useEffect(() => {
    setIsLoading(true);

    SubmissionUtil.getSubmissions({ dateIndex })
      .then((r) => {
        setSubmissions(r);
        setIsLoading(false);
      })
      .catch((err) => console.error("Error getting submissions"));
  }, [dateIndex]);

  const backAndForwardDate = (direction: "left" | "right") => {
    if (direction === "left") return setDateIndex((prev) => prev - 1);
    if (direction === "right") return setDateIndex((prev) => prev + 1);
  };

  if (isLoading)
    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          sx={{ margin: "1rem" }}
        >
          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => backAndForwardDate("left")}
          >
            Back
          </Button>

          <Typography>
            <b>Date:</b> {calculateDate({ dateIndex }).toLocaleDateString()}
          </Typography>

          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => backAndForwardDate("right")}
          >
            Forward
          </Button>
        </Stack>

        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </>
    );

  if (submissions.length === 0)
    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          sx={{ margin: "1rem" }}
        >
          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => backAndForwardDate("left")}
          >
            Back
          </Button>

          <Typography>
            <b>Date:</b> {calculateDate({ dateIndex }).toLocaleDateString()}
          </Typography>

          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => backAndForwardDate("right")}
          >
            Forward
          </Button>
        </Stack>

        <h2 style={{ textAlign: "center" }}>No submissions</h2>
      </>
    );

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        sx={{ margin: "1rem" }}
      >
        <Button
          sx={buttonTheme}
          variant="contained"
          onClick={() => backAndForwardDate("left")}
        >
          Back
        </Button>

        <Typography>
          <b>Date:</b> {calculateDate({ dateIndex }).toLocaleDateString()}
        </Typography>

        <Button
          sx={buttonTheme}
          variant="contained"
          onClick={() => backAndForwardDate("right")}
        >
          Forward
        </Button>
      </Stack>

      {submissions.map(
        ({ submitted_at, students, submission_details }, index) => {
          return submission_details.map(({ event_name, img_url }) => {
            const fullName = students[0].full_name;

            return (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  padding: "1rem 1.2rem",
                  margin: "1.25rem 0.7rem",
                }}
              >
                <Typography>
                  <b>Student name:</b> {fullName}
                </Typography>
                <Typography>
                  <b>Event name:</b> {event_name}
                </Typography>

                <Typography>
                  <b>Submitted on:</b>{" "}
                  <i>{new Date(submitted_at).toLocaleString()}</i>
                </Typography>

                <div
                  style={{
                    margin: "2rem auto",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Image
                    priority
                    loader={imageLoader}
                    src={img_url}
                    height={450}
                    width={450}
                    alt={`${fullName}'s submission image`}
                  />
                </div>

                <div
                  style={{
                    margin: "1.5rem auto",
                    textAlign: "right",
                  }}
                >
                  <IconButton aria-label="delete">
                    <CancelIcon />
                  </IconButton>

                  <IconButton aria-label="delete">
                    <CheckIcon />
                  </IconButton>
                </div>
              </Paper>
            );
          });
        }
      )}
    </>
  );
}
