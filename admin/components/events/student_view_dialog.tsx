import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { appBarTheme } from "../../themes/themes";
import { useEffect, useState } from "react";
import StudentUtil from "../../utils/StudentUtil";

interface StudentViewDialog {
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
}: StudentViewDialog) {
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

      <div style={{ textAlign: "center", margin: "1rem" }}>
        <Typography variant="h4" component="div">
          {studentName}
        </Typography>

        <Typography variant="h6" component="div">
          Signature count: {signatureCount} / 8
        </Typography>
      </div>
    </Dialog>
  );
}
