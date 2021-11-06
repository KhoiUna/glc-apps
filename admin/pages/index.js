import { useEffect, useState } from "react";
import Layout from "../containers/layout";
import { origin } from "../config/config";
import Link from "next/link";

export default function Index() {
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
      <Layout componentName="Feedback">
        <Link href="/reservations">Reservations</Link>

        <p>No feedback!</p>
      </Layout>
    );

  return (
    <Layout componentName="Feedback">
      <Link href="/reservations">Reservations</Link>

      {feedback.map((item) => (
        <p>
          <b>{item.subject}</b>(<i>{item.submitted_date}</i>): {item.feedback}
        </p>
      ))}
    </Layout>
  );
}
