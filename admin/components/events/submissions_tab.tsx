import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import SubmissionUtil from "../../utils/SubmissionUtil";
import SubmissionPaper from "./submission_paper";

const PendingSubmissionsCountComp = ({
  isLoading,
  pendingSubmissionsCount,
  currentSubmissionsCount,
}: {
  isLoading: boolean;
  pendingSubmissionsCount?: number;
  currentSubmissionsCount?: number | string;
}) => {
  if (isLoading)
    return (
      <Typography sx={{ margin: "1rem 0.5rem" }}>
        <b>Total submissions left: </b>...
        <br />
        <b>Current submissions left: </b>...
      </Typography>
    );

  return (
    <Typography sx={{ margin: "1rem 0.5rem" }}>
      <b>Total submissions left:</b>{" "}
      <span
        style={
          pendingSubmissionsCount > 0
            ? { color: "red", fontWeight: "bold" }
            : null
        }
      >
        {pendingSubmissionsCount}
      </span>
      <br />
      <b>Current submissions left:</b>{" "}
      <span
        style={
          currentSubmissionsCount > 0
            ? { color: "red", fontWeight: "bold" }
            : null
        }
      >
        {currentSubmissionsCount}
      </span>
    </Typography>
  );
};

const DatePicker = ({
  queryDate,
  handleChangeDate,
  pendingSubmissionsDates,
}: {
  queryDate: string;
  handleChangeDate: ({}) => any;
  pendingSubmissionsDates: string[];
}) => {
  return (
    <div style={{ margin: "0.6rem" }}>
      <FormControl
        sx={{ width: "100%", margin: "0 0 1rem 0" }}
        variant="filled"
      >
        <InputLabel id="demo-simple-select-label">
          Pending Event Dates
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={queryDate}
          label="Query Date"
          onChange={handleChangeDate}
        >
          {pendingSubmissionsDates.map((date, index) => (
            <MenuItem value={new Date(date).toLocaleDateString()} key={index}>
              {new Date(date).toLocaleDateString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default function SubmissionsTab({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [pendingSubmissionsDates, setPendingSubmissionsDates] = useState([]);
  const [pendingSubmissionsCount, setPendingSubmissionsCount] = useState(0);
  const [queryDate, setQueryDate] = useState("");
  useEffect(() => {
    setIsLoading(true);

    const controller = new AbortController();

    SubmissionUtil.getSubmissions({ queryDate })
      .then((r) => setSubmissions(r))
      .catch((err) => console.error("Error getting submissions"));

    SubmissionUtil.fetchPendingSubmissionsCount()
      .then((r) => setPendingSubmissionsCount(r))
      .catch((err) =>
        console.error("Error fetching pending submissions count")
      );

    SubmissionUtil.fetchPendingSubmissionsDates()
      .then((r) => {
        setPendingSubmissionsDates(r);
        setIsLoading(false);
      })
      .catch((err) =>
        console.error("Error fetching pending submissions dates")
      );

    return () => {
      controller.abort();
    };
  }, [queryDate]);

  const approveOrRejectSubmission = async ({
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
  }): Promise<void> => {
    try {
      const { id, student_id } = submissionDetail;

      if (await SubmissionUtil.updateSubmission({ action, student_id, id })) {
        setPendingSubmissionsCount((prev) => prev - 1);
        setPendingSubmissionsDates((r) =>
          r.filter((date) => date !== queryDate)
        );

        setSubmissions((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(`Error ${action} submission`);
    }
  };

  const handleChangeDate = ({ target }) => setQueryDate(target.value);

  if (isLoading)
    return (
      <>
        <PendingSubmissionsCountComp isLoading={isLoading} />

        <div style={{ margin: "0.6rem" }}>
          <FormControl
            sx={{ width: "100%", margin: "0 0 1rem 0" }}
            variant="filled"
          >
            <InputLabel id="demo-simple-select-label">
              Pending Event Dates
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Query Date"
              value={""}
            >
              Loading...
            </Select>
          </FormControl>
        </div>

        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </>
    );

  if (pendingSubmissionsDates.length === 0)
    return (
      <>
        <PendingSubmissionsCountComp
          isLoading={isLoading}
          pendingSubmissionsCount={pendingSubmissionsCount}
          currentSubmissionsCount={0}
        />

        <DatePicker
          queryDate={queryDate}
          handleChangeDate={handleChangeDate}
          pendingSubmissionsDates={pendingSubmissionsDates}
        />

        <h2 style={{ textAlign: "center" }}>No pending submissions</h2>
      </>
    );

  if (queryDate === "")
    return (
      <>
        <PendingSubmissionsCountComp
          isLoading={isLoading}
          pendingSubmissionsCount={pendingSubmissionsCount}
          currentSubmissionsCount={"n/a"}
        />

        <DatePicker
          queryDate={queryDate}
          handleChangeDate={handleChangeDate}
          pendingSubmissionsDates={pendingSubmissionsDates}
        />

        <h2 style={{ textAlign: "center" }}>Please pick a date</h2>
      </>
    );

  if (submissions.length === 0)
    return (
      <>
        <PendingSubmissionsCountComp
          isLoading={isLoading}
          pendingSubmissionsCount={pendingSubmissionsCount}
          currentSubmissionsCount={submissions.length}
        />

        <DatePicker
          queryDate={queryDate}
          handleChangeDate={handleChangeDate}
          pendingSubmissionsDates={pendingSubmissionsDates}
        />

        <h2 style={{ textAlign: "center" }}>Nothing left for this date</h2>
      </>
    );

  return (
    <>
      <PendingSubmissionsCountComp
        isLoading={isLoading}
        pendingSubmissionsCount={pendingSubmissionsCount}
        currentSubmissionsCount={submissions.length}
      />

      <DatePicker
        queryDate={queryDate}
        handleChangeDate={handleChangeDate}
        pendingSubmissionsDates={pendingSubmissionsDates}
      />

      {submissions.map((item, index) => (
        <SubmissionPaper
          key={index}
          submissionDetail={item}
          approveOrRejectSubmission={approveOrRejectSubmission}
          fromComponent={"SubmissionsTab"}
        />
      ))}
    </>
  );
}
