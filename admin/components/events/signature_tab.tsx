import { useEffect, useState } from "react";
import StudentViewDialog from "./student_view_dialog";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StudentUtil from "../../utils/StudentUtil";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Fab from "@mui/material/Fab";
import { buttonTheme } from "../../themes/themes";
import { origin } from "../../config/config";

const StudentPaper = ({ item }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const toggleOpenDialog = () => setOpenDialog(!openDialog);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "1rem",
          margin: "1.25rem 0.7rem",
        }}
      >
        <Typography>
          <b>Student name:</b> {item.full_name}
        </Typography>
        <Typography>
          <b>Signature count:</b> {item.signature_count} / 8
        </Typography>

        <div style={{ textAlign: "right" }}>
          <Button onClick={toggleOpenDialog} variant="contained">
            View more
          </Button>
        </div>
      </Paper>

      {openDialog && (
        <StudentViewDialog
          toggleOpenDialog={toggleOpenDialog}
          openDialog={openDialog}
          studentId={item.id}
          studentName={item.full_name}
          signatureCount={item.signature_count}
        />
      )}
    </>
  );
};
export default function SignatureTab({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    StudentUtil.fetchAllStudents()
      .then((r) => {
        setStudents(r);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error getting students");
        setIsLoading(false);
      });
  }, []);

  const downloadCsv = async () => {
    try {
      const blob = await (await fetch(`${origin}/api/student/csv`)).blob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "student_signatures.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading csv file");
    }
  };

  if (isLoading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (students.length === 0)
    return (
      <h2 style={{ textAlign: "center" }}>No students have submitted yet</h2>
    );

  return (
    <>
      {students.map((item, index) => (
        <StudentPaper key={index} item={item} />
      ))}

      <Fab
        onClick={downloadCsv}
        color="primary"
        aria-label="Download student signature CSV file"
        sx={{ ...buttonTheme, position: "fixed", bottom: 3, right: 9 }}
      >
        <FileDownloadIcon />
      </Fab>
    </>
  );
}
