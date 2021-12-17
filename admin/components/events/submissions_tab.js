import io from "socket.io-client";
import { origin } from "../../config/config";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

let socket;
export default function SubmissionsTab({}) {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    if (!window.indexedDB)
      console.log(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
      );

    const openRequest = indexedDB.open("submissionsIndexedDb", 3);
    openRequest.onerror = (event) => {
      console.error("IndexedDB not supported");
    };
    openRequest.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create submissionObjStore object store
      const submissionObjStore = db.createObjectStore("submissions", {
        autoIncrement: true,
      });
    };
    openRequest.onsuccess = (event) => {
      const db = event.target.result;
      db.onversionchange = () => {
        db.close();
        alert("Database is outdated, please reload the page.");
      };

      const submissionsObjStore = db
        .transaction("submissions")
        .objectStore("submissions");

      const request = submissionsObjStore.getAll();
      request.onsuccess = (event) => {
        setSubmissions(event.target.result.reverse());
      };

      request.onerror = () => {
        console.log("Error", request.error);
      };
    };
  }, []);

  useEffect(() => {
    socket = io(origin, {
      withCredentials: true,
    });

    socket.on("submit", (submission) => {
      const openRequest = indexedDB.open("submissionsIndexedDb", 3);

      openRequest.onerror = function (event) {
        console.error("IndexedDB not supported");
      };
      openRequest.onsuccess = (event) => {
        const db = event.target.result;
        db.onversionchange = () => {
          db.close();
          alert("Database is outdated, please reload the page.");
        };

        const submissionsObjStore = db
          .transaction("submissions", "readwrite")
          .objectStore("submissions");

        submissionsObjStore.add(submission);

        const request = submissionsObjStore.getAll();
        request.onsuccess = (event) => {
          setSubmissions((prev) => [submission, ...prev]);
        };
        request.onerror = () => {
          console.log("Error", request.error);
        };
      };
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [submissions]);

  return (
    <>
      {submissions.map(
        (
          { eventName, firstName, lastName, lNumber, imgBlob, submitted_date },
          index
        ) => {
          const blobToBase64 = (imgBlob) => {
            const { blob, type } = imgBlob;

            const TYPED_ARRAY = new Uint8Array(blob);
            const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
              return data + String.fromCharCode(byte);
            }, "");

            const base64String = type + "," + btoa(STRING_CHAR);
            return base64String;
          };

          return (
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
              <Typography>
                <b>From:</b> {firstName + " " + lastName}
              </Typography>
              <Typography>
                <b>Submitted on:</b>{" "}
                <i>{new Date(submitted_date).toLocaleString()}</i>
              </Typography>

              <div
                style={{
                  margin: "1.5rem auto",
                }}
              >
                <img
                  width="220rem"
                  src={blobToBase64(imgBlob)}
                  alt={`${firstName + " " + lastName}'s submission image`}
                />
              </div>

              <div
                style={{
                  margin: "1.5rem auto",
                  textAlign: "right",
                }}
              >
                <IconButton aria-label="delete">
                  <CancelIcon />
                </IconButton>

                <IconButton aria-label="delete">
                  <CheckIcon />
                </IconButton>
              </div>
            </Paper>
          );
        }
      )}
    </>
  );
}
