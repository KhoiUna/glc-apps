import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import { origin } from "../config/config";
import { IKContext, IKUpload } from "imagekitio-react";
import Layout from "../containers/layout";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";

let socket;
export default function Home() {
  useEffect(() => {
    socket = io(origin, {
      withCredentials: true,
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const [eventData, setEventData] = useState({
    createdDate: "",
    status: "",
  });
  useEffect(() => {
    const url = new URL(window.location);
    const eventId = url.searchParams.get("id");
    //TODO: fetch get status
  }, []);

  const [formValue, setFormValue] = useState({
    fullName: "",
    submissionDetails: [],
  });
  const handleChange = ({ target }) => {
    setFormValue((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = () => {
    try {
      //
    } catch (err) {
      console.error("Error submitting form");
    }
  };

  const onError = (err) => {
    console.error("Error uploading image");
  };

  const onSuccess = async (res) => {
    if (res.fileType === "image") {
      const avatarPath = res.filePath;
      //TODO: fetch post to server
    }
  };

  return (
    <Layout>
      <div style={{ margin: "1rem 0 1rem 2rem" }}>
        <Typography variant="body1">
          <b>Date:</b> {eventData.createdDate}
        </Typography>
        <Typography variant="body1">
          <b>Link status:</b> {eventData.status}
        </Typography>
      </div>

      <form onChange={handleChange} onSubmit={handleSubmit}>
        <Stack
          sx={{ margin: "1.5rem 1rem" }}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Full name:
          </Typography>
          <TextField
            name="fullName"
            label="Full name"
            variant="filled"
            required
            value={formValue.fullName}
          />
        </Stack>

        <Paper elevation={3} sx={{ margin: "1.5rem 1rem", padding: "0.5rem" }}>
          <Stack
            sx={{ margin: "1.5rem 1rem" }}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Event name:
            </Typography>
            <TextField
              name="eventName"
              label="Event name"
              variant="filled"
              required
            />
          </Stack>

          <Stack
            sx={{ margin: "1.5rem 1rem" }}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Upload image:
            </Typography>
            <IKContext
              publicKey={process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY}
              urlEndpoint={process.env.NEXT_PUBLIC_IMGKIT_IMGKIT_URL_ENDPOINT}
              authenticationEndpoint={`${origin}/api/event/uploadImage/auth`}
            >
              <IKUpload
                fileName="user_avatar.png"
                onError={onError}
                onSuccess={onSuccess}
                folder={"/glc_upload"}
                required
                // onChange={() => showProgressBar(true)}
              />
            </IKContext>
          </Stack>

          <div
            style={{
              textAlign: "center",
              margin: "1rem 0",
            }}
          >
            <Button
              // onClick={createEvent}
              variant="contained"
              aria-label="Create event"
            >
              + Add event
            </Button>
          </div>
        </Paper>

        <div style={{ textAlign: "center" }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Layout>
  );
}
