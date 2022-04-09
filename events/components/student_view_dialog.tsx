import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { appBarTheme } from "../themes/themes";
import { useEffect, useState } from "react";
import StudentUtil from "../utils/StudentUtil";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import imageLoader from "../helpers/imageLoader";
import { maxSignatureCount } from "../config/config";
import SubmissionPaper from "./submission_paper";

function PendingSubmissionDetails({
  isLoading,
  pendingSubmissionDetails,
}: {
  isLoading: boolean;
  pendingSubmissionDetails: any[];
}) {
  if (isLoading || pendingSubmissionDetails.length === 0) return <></>;

  return (
    <div style={{ margin: "1.5rem 0 0.3rem 0" }}>
      <div style={{ margin: "0 1rem" }}>
        <hr />
      </div>

      <Typography
        variant="h6"
        component="div"
        sx={{ margin: "0.3rem 1rem 0 1rem" }}
      >
        <span
          style={{
            backgroundColor: "yellow",
            padding: "0.2rem",
            fontWeight: "bold",
          }}
        >
          Pending submissions: {pendingSubmissionDetails.length}
        </span>
      </Typography>

      {pendingSubmissionDetails.map((detail, index) => (
        <SubmissionPaper key={index} submissionDetail={detail} />
      ))}

      <div style={{ margin: "0 1rem" }}>
        <hr />
      </div>
    </div>
  );
}

const ApprovedSubmissionPaper = ({ studentName, detail, index }) => {
  const { id, event_name, submitted_at, img_url, student_id } = detail;

  return (
    <Paper elevation={5} sx={{ margin: "1rem", padding: "1rem" }}>
      <Typography>
        <b>{index}.</b>
      </Typography>
      <Typography>
        <b>Event name:</b> {event_name}
      </Typography>
      <Typography>
        <b>Date submitted:</b> {new Date(submitted_at).toLocaleDateString()}
      </Typography>
      <Typography>
        <b>Submission image:</b>
      </Typography>

      <div
        style={{
          margin: "0.5rem auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Image
          loader={imageLoader}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP05559BgADaQHDtWQFWQAAAABJRU5ErkJggg=="
          src={img_url}
          height={450}
          width={450}
          alt={`${studentName}'s submission image: ${event_name}`}
        />
      </div>
    </Paper>
  );
};

interface StudentViewDialogProps {
  toggleOpenDialog: () => any;
  openDialog: boolean;
  studentId: number;
  studentName: string;
}
export default function StudentViewDialog({
  toggleOpenDialog,
  openDialog,
  studentId,
  studentName,
}: StudentViewDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState([]);
  const [pendingSubmissionDetails, setPendingSubmissionDetails] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    StudentUtil.fetchSubmissionDetails({ studentId })
      .then((r) => {
        setSubmissionDetails(
          r.filter(({ status }) => status.trim() === "approved")
        );
        setPendingSubmissionDetails(
          r.filter(({ status }) => status.trim() === "pending")
        );
        setIsLoading(false);
      })
      .catch((err) =>
        console.error("Error getting student's approved submission details")
      );
  }, []);

  return (
    <Dialog fullScreen open={openDialog} onClose={toggleOpenDialog}>
      <AppBar sx={{ ...appBarTheme, position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleOpenDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            View student
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ textAlign: "center", margin: "1rem 0 0 0" }}>
        <Typography variant="h4" component="div">
          {studentName}
        </Typography>

        <Typography variant="h6" component="div">
          Signature count: {isLoading ? "..." : submissionDetails.length} /{" "}
          {maxSignatureCount}
        </Typography>
      </div>

      <PendingSubmissionDetails
        isLoading={isLoading}
        pendingSubmissionDetails={pendingSubmissionDetails}
      />

      {isLoading && <h2 style={{ margin: "1rem auto" }}>Loading...</h2>}
      {!isLoading && submissionDetails.length === 0 && (
        <h2 style={{ margin: "1rem auto" }}>No approved submissions yet!</h2>
      )}
      {!isLoading && submissionDetails.length > 0 && (
        <Typography
          variant="h6"
          component="div"
          sx={{ margin: "0.3rem 1rem 0 1rem" }}
        >
          <span
            style={{
              backgroundColor: "#009d00",
              padding: "0.2rem",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Approved submissions: {submissionDetails.length}
          </span>
        </Typography>
      )}
      {!isLoading &&
        submissionDetails.map((item, index) => (
          <ApprovedSubmissionPaper
            key={index}
            index={index + 1}
            detail={item}
            studentName={studentName}
          />
        ))}
    </Dialog>
  );
}
