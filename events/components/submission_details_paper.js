import { IKContext, IKUpload } from "imagekitio-react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { origin } from "../config/config";
import ProgressBar from "./progress_bar";
import { useState } from "react";
import SubmissionUtil from "../utils/SubmissionUtil";
import Image from "next/image";
import imageLoader from "../helpers/imageLoader";

export default function SubmissionDetailsPaper({ createSubmissionDetails }) {
  const [showProgress, setShowProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const showProgressBar = (status) => {
    if (status !== "success" && status !== "error")
      return setShowProgress(status);

    if (status === "success") {
      setProgressValue(100);
      return setTimeout(() => {
        showProgressBar(false);
        setProgressValue(0);
      }, 1000);
    }
    if (status === "error") {
      setProgressValue(50);
    }
    return setTimeout(() => {
      showProgressBar(false);
      setProgressValue(0);
    }, 1000);
  };

  const onError = (err) => {
    console.error("Error uploading image");
  };

  const [imageURL, setImageURL] = useState("");
  const onSuccess = async (res) => {
    if (res.fileType === "image") {
      const imagePath = res.filePath;
      console.log(imagePath);
      if (await SubmissionUtil.uploadImage({ imagePath })) {
        setImageURL(imagePath);
        showProgressBar("success");
      }
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
        <TextField name="eventName" label="Event name" variant="filled" />
      </Stack>

      {showProgress && <ProgressBar progressValue={progressValue} />}
      <Stack
        sx={{ margin: "1.5rem 1rem" }}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        {!showProgress && (
          <>
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
                onChange={() => showProgressBar(true)}
              />
            </IKContext>
          </>
        )}
      </Stack>

      {imageURL && (
        <div style={{ textAlign: "center", margin: 0 }}>
          <Image
            loader={imageLoader}
            src={imageURL}
            priority
            height={300}
            width={300}
            alt="uploaded image"
          />
        </div>
      )}

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
