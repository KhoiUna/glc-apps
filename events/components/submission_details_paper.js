import { IKContext, IKUpload } from "imagekitio-react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { origin } from "../config/config";

export default function SubmissionDetailsPaper({ createSubmissionDetails }) {
  const onError = (err) => {
    console.error("Error uploading image");
  };

  const onSuccess = async (res) => {
    if (res.fileType === "image") {
      const imagePath = res.filePath;
      //TODO: fetch post to server
    }
  };

  return (
    <Paper elevation={9} sx={{ margin: "2rem 1rem", padding: "0.5rem" }}>
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
          onClick={(e) => {
            e.target.remove();
            createSubmissionDetails();
          }}
          variant="contained"
          aria-label="Add event"
        >
          + Add event
        </Button>
      </div>
    </Paper>
  );
}
