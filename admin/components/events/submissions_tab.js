import { origin } from "../../config/config";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import SubmissionUtil from "../../utils/SubmissionUtil";
import Image from "next/image";
import imageLoader from "../../helpers/imageLoader";

export default function SubmissionsTab({}) {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    SubmissionUtil.getSubmissions()
      .then((r) => setSubmissions(r))
      .catch((err) => console.error("Error getting submissions"));
  }, []);

  return submissions.map(
    ({ submitted_at, students, submission_details }, index) => {
      return submission_details.map(({ event_name, img_url }) => {
        const fullName = students[0].full_name;

        return (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: "0.5rem",
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
                margin: "1.5rem auto",
              }}
            >
              <Image
                priority
                loader={imageLoader}
                src={img_url}
                height={300}
                width={300}
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
  );
}
