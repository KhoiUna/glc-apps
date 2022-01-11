import { useEffect, useState } from "react";
import StudentViewDialog from "../components/student_view_dialog";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StudentUtil from "../utils/StudentUtil";
import TextField from "@mui/material/TextField";
import Layout from "../containers/layout";
import { maxSignatureCount } from "../config/config";

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
          <b>Signature count:</b> {item.signature_count} / {maxSignatureCount}
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
  const [searchedStudents, setSearchedStudent] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    StudentUtil.fetchAllStudents()
      .then((r) => {
        setStudents(r);
        setSearchedStudent(r);
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

  const handleChange = ({ target }) => {
    setSearchedStudent(students);

    return setSearchedStudent((prev) =>
      prev.filter(
        (item) =>
          item.full_name.toLowerCase().indexOf(target.value.toLowerCase()) > -1
      )
    );
  };

  if (isLoading)
    return (
      <Layout title="GLC Student View">
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </Layout>
    );

  if (students.length === 0)
    return (
      <Layout title="GLC Student View">
        <h2 style={{ textAlign: "center" }}>
          No submissions have been approved yet
        </h2>
      </Layout>
    );

  return (
    <Layout title="GLC Student View">
      <div style={{ margin: "0.6rem" }}>
        <TextField
          label="Type your name"
          variant="filled"
          onChange={handleChange}
          sx={{ width: "100%" }}
        />
      </div>

      {searchedStudents.map((item, index) => (
        <StudentPaper key={index} item={item} />
      ))}
    </Layout>
  );
}
