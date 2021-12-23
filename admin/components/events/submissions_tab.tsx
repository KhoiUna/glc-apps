import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SubmissionUtil from "../../utils/SubmissionUtil";
import calculateDate from "../../helpers/calculateDate";
import Stack from "@mui/material/Stack";
import { buttonTheme } from "../../themes/themes";
import SubmissionPaper from "./submission_paper";

export default function SubmissionsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [dateIndex, setDateIndex] = useState(0);
  useEffect(() => {
    setIsLoading(true);

    SubmissionUtil.getSubmissions({ dateIndex })
      .then((r) => {
        setSubmissions(r);
        setIsLoading(false);
      })
      .catch((err) => console.error("Error getting submissions"));
  }, [dateIndex]);

  const backAndForwardDate = (direction: "left" | "right") => {
    if (direction === "left") return setDateIndex((prev) => prev - 1);
    if (direction === "right") return setDateIndex((prev) => prev + 1);
  };

  const approveOrRejectSubmission = async ({
    action,
    id,
    student_id,
  }: {
    action: "approve" | "reject";
    id: number;
    student_id: number;
  }): Promise<any> => {
    try {
      if (await SubmissionUtil.updateSubmission({ action, student_id, id }))
        return setSubmissions((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(`Error ${action} submission`);
      return;
    }
  };

  if (isLoading)
    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          sx={{ margin: "1rem" }}
        >
          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => backAndForwardDate("left")}
          >
            Back
          </Button>

          <Typography>
            <b>Event date:</b>{" "}
            {calculateDate({ dateIndex }).toLocaleDateString()}
          </Typography>

          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => backAndForwardDate("right")}
          >
            Forward
          </Button>
        </Stack>

        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </>
    );

  if (submissions.length === 0)
    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          sx={{ margin: "1rem" }}
        >
          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => backAndForwardDate("left")}
          >
            Back
          </Button>

          <Typography>
            <b>Event date:</b>{" "}
            {calculateDate({ dateIndex }).toLocaleDateString()}
          </Typography>

          <Button
            sx={buttonTheme}
            variant="contained"
            onClick={() => backAndForwardDate("right")}
          >
            Forward
          </Button>
        </Stack>

        <h2 style={{ textAlign: "center" }}>No submissions</h2>
      </>
    );

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        sx={{ margin: "1rem" }}
      >
        <Button
          sx={buttonTheme}
          variant="contained"
          onClick={() => backAndForwardDate("left")}
        >
          Back
        </Button>

        <Typography>
          <b>Event date:</b> {calculateDate({ dateIndex }).toLocaleDateString()}
        </Typography>

        <Button
          sx={buttonTheme}
          variant="contained"
          onClick={() => backAndForwardDate("right")}
        >
          Forward
        </Button>
      </Stack>

      {submissions.map((item, index) => (
        <SubmissionPaper
          key={index}
          submissionDetail={item}
          approveOrRejectSubmission={approveOrRejectSubmission}
        />
      ))}
    </>
  );
}
