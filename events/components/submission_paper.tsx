import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import imageLoader from "../helpers/imageLoader";
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
}

export default function SubmissionPaper({
  submissionDetail,
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
        backgroundColor: "#ffff8e",
      }}
    >
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
