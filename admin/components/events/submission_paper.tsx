import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import imageLoader from "../../helpers/imageLoader";
import Typography from "@mui/material/Typography";

interface SubmissionPaperProps {
  submissionDetail: {
    id: number;
    event_name: string;
    full_name: string;
    img_url: string;
    submitted_at: string;
    student_id: number;
  };
  approveOrRejectSubmission: ({
    action,
    id,
    student_id,
  }: {
    action: "approve" | "reject";
    id: number;
    student_id: number;
  }) => Promise<any>;
}

export default function SubmissionPaper({
  submissionDetail,
  approveOrRejectSubmission,
}: SubmissionPaperProps) {
  const { id, event_name, full_name, img_url, submitted_at, student_id } =
    submissionDetail;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem 1.2rem",
        margin: "1.25rem 0.7rem",
      }}
    >
      <Typography>
        <b>Student name:</b> {full_name}
      </Typography>
      <Typography>
        <b>Event name:</b> {event_name}
      </Typography>

      <Typography>
        <b>Submitted on:</b> <i>{new Date(submitted_at).toLocaleString()}</i>
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
          alt={`${full_name}'s submission image`}
        />
      </div>

      <div
        style={{
          margin: "1.5rem auto",
          textAlign: "right",
        }}
      >
        <IconButton
          aria-label="Reject submission"
          onClick={() =>
            approveOrRejectSubmission({ action: "reject", id, student_id })
          }
        >
          <CancelIcon />
        </IconButton>

        <IconButton
          aria-label="Approve submission"
          onClick={() =>
            approveOrRejectSubmission({ action: "approve", id, student_id })
          }
        >
          <CheckIcon />
        </IconButton>
      </div>
    </Paper>
  );
}
