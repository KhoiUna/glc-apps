import { IKContext, IKUpload } from "imagekitio-react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { origin } from "../config/config";
import ProgressBar from "./progress_bar";
import { useState } from "react";
import Image from "next/image";
import imageLoader from "../helpers/imageLoader";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import { SubmissionDetailsPaperProps } from "../types/types";

export default function SubmissionDetailsPaper({
  index,
  submissionDetailsLength,
  createSubmissionDetails,
  removeSubmissionDetails,
  handleChangeSubmissionDetails,
}: SubmissionDetailsPaperProps) {
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
    try {
      if (res.fileType === "image") {
        const imagePath = res.filePath;
        setImageURL(imagePath);

        handleChangeSubmissionDetails({
          index,
          type: "imagePath",
          imagePath,
          imageId: res.fileId,
        });
        showProgressBar("success");
      }
    } catch (err) {
      console.error("Error uploading image");
    }
  };

  return (
    <Paper elevation={9} sx={{ margin: "2rem 1rem", padding: "0.5rem" }}>
      {index !== 0 && index + 1 === submissionDetailsLength && (
        <IconButton onClick={() => removeSubmissionDetails({ index })}>
          <CancelIcon sx={{ color: "#dd0707" }} />
        </IconButton>
      )}

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
          required
          name="eventName"
          label="Event name"
          variant="filled"
          onChange={({ target }) =>
            handleChangeSubmissionDetails({
              index,
              type: "eventName",
              eventName: target.value,
            })
          }
        />
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

      {index + 1 === submissionDetailsLength && (
        <div
          style={{
            textAlign: "center",
            margin: "1rem 0",
          }}
        >
          <Button
            onClick={() => createSubmissionDetails()}
            variant="contained"
            aria-label="Add event"
          >
            + Add event
          </Button>
        </div>
      )}
    </Paper>
  );
}
