import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import imageLoader from "../../helpers/imageLoader";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import StudentViewDialog from "./student_view_dialog";

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
    submissionDetail,
  }: {
    action: "approve" | "reject";
    submissionDetail: {
      id: number;
      event_name: string;
      submitted_at: string;
      img_url: string;
      student_id: number;
    };
  }) => Promise<any>;
  fromComponent: string;
}

export default function SubmissionPaper({
  submissionDetail,
  approveOrRejectSubmission,
  fromComponent,
}: SubmissionPaperProps) {
  const { event_name, full_name, img_url, submitted_at, student_id } =
    submissionDetail;

  const [openDialog, setOpenDialog] = useState(false);
  const toggleOpenDialog = () => setOpenDialog(!openDialog);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem 1.2rem",
        margin: "1.25rem 0.7rem",
        backgroundColor: "#ffffd7",
      }}
    >
      {fromComponent !== "StudentViewDialog" && (
        <Typography>
          <b>Student name:</b>{" "}
          <span
            onClick={toggleOpenDialog}
            style={{
              color: "#46166B",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {full_name}
          </span>
        </Typography>
      )}
      <Typography>
        <b>Event name:</b> {event_name}
      </Typography>

      <Typography>
        <b>Submitted on:</b>{" "}
        <i>{new Date(submitted_at).toLocaleDateString()}</i>
      </Typography>

      <div
        style={{
          margin: "2rem auto",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Image
          loader={imageLoader}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP05559BgADaQHDtWQFWQAAAABJRU5ErkJggg=="
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
            approveOrRejectSubmission({ action: "reject", submissionDetail })
          }
          sx={{ backgroundColor: "#db0505", color: "#fff", margin: "0 1.5rem" }}
        >
          <CancelIcon />
        </IconButton>

        <IconButton
          aria-label="Approve submission"
          onClick={() =>
            approveOrRejectSubmission({ action: "approve", submissionDetail })
          }
          sx={{ backgroundColor: "#009d00", color: "#fff" }}
        >
          <CheckIcon />
        </IconButton>
      </div>

      {openDialog && (
        <StudentViewDialog
          toggleOpenDialog={toggleOpenDialog}
          openDialog={openDialog}
          studentId={student_id}
          studentName={full_name}
        />
      )}
    </Paper>
  );
}
