import io from "socket.io-client";
import { origin } from "../../config/config";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

let socket;
export default function SubmissionsTab({}) {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    socket = io(origin, {
      withCredentials: true,
    });

    socket.on("submit", (submission) => {
      setSubmissions((prev) => [submission, ...prev]);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const blobToBase64 = (imgBlob) => {
    const { blob, type } = imgBlob;

    const TYPED_ARRAY = new Uint8Array(blob);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, "");
    const base64String = type + "," + btoa(STRING_CHAR);

    return base64String;
  };

  return submissions.map(
    (
      { eventName, firstName, lastName, lNumber, imgBlob, submitted_date },
      index
    ) => (
      <Paper
        key={index}
        elevation={3}
        sx={{
          padding: "0.5rem",
          margin: "1.25rem 0.7rem",
        }}
      >
        <Typography>
          <b>Event name:</b> {eventName}
        </Typography>
        <b>{firstName + " " + lastName}</b> - L#{lNumber} -{" "}
        <i>{new Date(submitted_date).toLocaleString()}</i>
        <div
          style={{
            margin: "1.5rem auto",
            textAlign: "center",
          }}
        >
          <img
            src={blobToBase64(imgBlob)}
            alt={`${firstName + " " + lastName}'s submission image'`}
          />
        </div>
      </Paper>
    )
  );
}
