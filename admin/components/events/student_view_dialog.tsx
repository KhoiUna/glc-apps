import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { appBarTheme } from "../../themes/themes";
import { useEffect, useState } from "react";
import StudentUtil from "../../utils/StudentUtil";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import imageLoader from "../../helpers/imageLoader";

interface StudentViewDialogProps {
  toggleOpenDialog: () => any;
  openDialog: boolean;
  studentId: number;
  studentName: string;
  signatureCount: number;
}
export default function StudentViewDialog({
  toggleOpenDialog,
  openDialog,
  studentId,
  studentName,
  signatureCount,
}: StudentViewDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    StudentUtil.fetchSubmissionDetails({ studentId })
      .then((r) => {
        setSubmissionDetails(r);
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
          Signature count: {signatureCount} / 8
        </Typography>
      </div>

      {isLoading && <h2 style={{ margin: "1rem auto" }}>Loading...</h2>}
      {!isLoading &&
        submissionDetails.map((item, index) => (
          <Paper
            elevation={5}
            sx={{ margin: "1rem", padding: "1rem" }}
            key={index}
          >
            <Typography>
              <b>Event name:</b> {item.event_name}
            </Typography>
            <Typography>
              <b>Date submitted:</b>{" "}
              {new Date(item.submitted_at).toLocaleDateString()}
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
                priority
                loader={imageLoader}
                src={item.img_url}
                height={450}
                width={450}
                alt={`${studentName}'s submission image: ${item.event_name}`}
              />
            </div>
          </Paper>
        ))}
    </Dialog>
  );
}
