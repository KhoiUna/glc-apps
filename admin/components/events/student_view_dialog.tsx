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
import { maxSignatureCount } from "../../config/config";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import SubmissionUtil from "../../utils/SubmissionUtil";

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

  const deleteSubmission = async ({
    id,
    student_id,
  }: {
    id: number;
    student_id: number;
  }) => {
    try {
      const confirmed = confirm(
        "Are you sure you want to delete this submission?"
      );

      if (!confirmed) return;

      if (
        await SubmissionUtil.updateSubmission({
          action: "reject",
          student_id,
          id,
        })
      )
        return setSubmissionDetails((prev) =>
          prev.filter((item) => item.id !== id)
        );
    } catch (err) {
      console.error(`Error deleting submission`);
      return;
    }
  };

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

      {isLoading && <h2 style={{ margin: "1rem auto" }}>Loading...</h2>}
      {!isLoading &&
        submissionDetails.map((item, index) => (
          <Paper
            elevation={5}
            sx={{ margin: "1rem", padding: "1rem" }}
            key={index}
          >
            <Typography>
              <b>#{item.id}</b>
            </Typography>
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
                loader={imageLoader}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP05559BgADaQHDtWQFWQAAAABJRU5ErkJggg=="
                src={item.img_url}
                height={450}
                width={450}
                alt={`${studentName}'s submission image: ${item.event_name}`}
              />
            </div>

            <div style={{ textAlign: "right" }}>
              <Button
                onClick={() =>
                  deleteSubmission({ id: item.id, student_id: item.student_id })
                }
                variant="contained"
                type="submit"
                sx={{ margin: "0.5rem 1rem 0 0", backgroundColor: "#db0505" }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </Paper>
        ))}

      {!isLoading && submissionDetails.length === 0 && (
        <h2 style={{ margin: "1rem auto" }}>No submissions yet!</h2>
      )}
    </Dialog>
  );
}
