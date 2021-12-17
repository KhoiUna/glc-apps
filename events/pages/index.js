import Head from "next/head";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import { origin } from "../config/config";
import { IKContext, IKUpload } from "imagekitio-react";
import Layout from "../containers/layout";

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

  const [eventName, setEventName] = useState("");
  useEffect(() => {
    const url = new URL(window.location);
    const eventName = url.searchParams.get("eventName");
    setEventName(eventName);
  }, []);

  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    lNumber: "",
    imgUploadPath: "",
  });
  const handleChange = ({ target }) => {
    setFormValue((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const [imgBlob, setImgBlob] = useState({ blob: {}, type: "" });
  const uploadImage = () => {
    const displayOnCanvas = (imgObj) => {
      const canvas = document.querySelector("canvas");
      const maxWidth = 300;
      const maxHeight = 300;

      const width = imgObj.width;
      const height = imgObj.height;

      // Resize to display on Canvas
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width));
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width *= maxHeight / height));
          height = maxHeight;
        }
      }

      // resize the canvas and draw the image data into it
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(imgObj, 0, 0, width, height);

      const base64String = canvas.toDataURL("image/png", 0.7);
      return base64String; // base64 string
    };

    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.addEventListener(
      "load",
      () => {
        const arrayBuffer = reader.result;
        const blob = new Blob([arrayBuffer]);
        const blobURL = URL.createObjectURL(blob);

        // Create an image object with blob
        const image = new Image();
        image.src = blobURL;
        image.addEventListener(
          "load",
          async () => {
            try {
              const base64String = displayOnCanvas(image);
              const blob = await (await fetch(base64String)).blob();
              setImgBlob({ blob, type: base64String.split(",")[0] });
            } catch (error) {
              console.error("Error uploading img");
            }
          },
          false
        );
      },
      false
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      socket.emit("submit", { eventName, ...formValue, imgBlob });
      setFormValue({
        fullName: "",
        lNumber: "",
        imgUploadPath: "",
      });
      setImgBlob({ blob: {}, type: "" });
      e.target.reset();

      // Clear canvas
      const canvas = document.querySelector("canvas");
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
    } catch (error) {
      console.error(error);
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
      <Typography variant="body1">
        <b>Event name:</b> {eventName}
      </Typography>

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

        <div style={{ margin: "1rem" }}>
          <canvas width={0} height={0}></canvas>
        </div>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
}
