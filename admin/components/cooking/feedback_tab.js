import { useEffect, useState } from "react";
import { origin } from "../../config/config";
import Typography from "@mui/material/Typography";

export default function FeedbackTab({ value, index }) {
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await (await fetch(`${origin}/api/feedback`)).json();
        return res;
      } catch (err) {
        console.error("Error fetching feedback");
      }
    };

    fetchFeedback()
      .then((r) => setFeedback(r))
      .catch((err) => console.error(err));
  }, []);

  if (feedback.length === 0)
    return (
      <div
        style={{ margin: "0.5rem" }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <Typography>No feedback!</Typography>
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
      {feedback.map((item) => (
        <Typography>
          <b>{item.subject}</b>(<i>{item.submitted_date}</i>): {item.feedback}
        </Typography>
      ))}
    </div>
  );
}
