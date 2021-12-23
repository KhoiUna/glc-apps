import { useEffect, useState } from "react";
import StudentViewDialog from "./student_view_dialog";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StudentUtil from "../../utils/StudentUtil";

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

  const [openDialog, setOpenDialog] = useState(false);
  const toggleOpenDialog = () => setOpenDialog(!openDialog);

  if (isLoading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (students.length === 0)
    return (
      <h2 style={{ textAlign: "center" }}>No students have submitted yet</h2>
    );

  return (
    <>
      {students.map((item, index) => (
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
      ))}
    </>
  );
}
