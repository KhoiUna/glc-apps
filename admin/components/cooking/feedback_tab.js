import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

export default function FeedbackTab({ value, index }) {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    fetch("/api/cooking/feedback")
      .then((r) => r.json())
      .then((r) => {
        setFeedback(r);
        setIsLoading(false);
      })
      .catch((err) => console.error("Error fetching feedback"));
  }, []);

  if (isLoading)
    return (
      <div
        style={{ margin: "0.5rem" }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <Typography>Loading...</Typography>
      </div>
    );

  if (feedback.length === 0)
    return (
      <div
        style={{ margin: "0.5rem" }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <Typography>
          <b>No feedback!</b>
        </Typography>
      </div>
    );

  return (
    <div
      style={{ margin: "0.5rem" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {feedback.map((item, index) => (
        <Typography key={index}>
          <b>{item.subject}</b> (<i>{item.submitted_date}</i>): {item.feedback}
        </Typography>
      ))}
    </div>
  );
}
