import Head from "next/head";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import { origin } from "../config/config";

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

  const [imgBlob, setImgBlob] = useState({});
  const [imgBase64, setImgBase64] = useState("");
  const uploadImage = () => {
    const displayOnCanvas = (imgObj) => {
      const canvas = document.querySelector("canvas");
      const maxWidth = 200;
      const maxHeight = 200;

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

      return canvas.toDataURL("image/png", 0.7); // base64 string
    };

    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const arrayBuffer = reader.result;
      const blob = new Blob([arrayBuffer]);
      const blobURL = URL.createObjectURL(blob);

      // Create an image object with blob
      const image = new Image();
      image.src = blobURL;
      image.addEventListener("load", () => {
        const base64String = displayOnCanvas(image);
        setImgBase64(base64String);
      });
    });

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      socket.emit("submit", { eventName, ...formValue, imgBlob, imgBase64 });
      setFormValue({
        firstName: "",
        lastName: "",
        lNumber: "",
        imgUploadPath: "",
      });
      e.target.reset();

      // Clear canvas
      const canvas = document.querySelector("canvas");
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#46166b" />
        <meta name="description" content="GLC Events app" />
        <link rel="apple-touch-icon" href="/images/192x192.png" />
        <link rel="manifest" href="/manifest.json" />

        <title>GLC Events | Submit</title>
      </Head>

      <main style={{ margin: "1rem auto", textAlign: "center" }}>
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
              First name:
            </Typography>
            <TextField
              name="firstName"
              label="First name"
              variant="filled"
              required
              value={formValue.firstName}
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
              Last name:
            </Typography>
            <TextField
              name="lastName"
              label="Last name"
              variant="filled"
              required
              value={formValue.lastName}
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
              L number:
            </Typography>
            <TextField
              name="lNumber"
              label="L number"
              variant="filled"
              required
              value={formValue.lNumber}
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
            <input
              type="file"
              onChange={uploadImage}
              data-maxwidth="500"
              data-maxheight="500"
              name="imgUploadPath"
              value={formValue.imgUploadPath}
              required
            />
          </Stack>

          <div style={{ margin: "1rem" }}>
            <canvas></canvas>
          </div>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </main>
    </>
  );
}
