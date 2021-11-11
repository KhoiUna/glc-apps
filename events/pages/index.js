import Head from "next/head";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import { origin } from "../config/config";
import Image from "next/image";

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
  });
  const handleChange = ({ target }) => {
    setFormValue((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const [imgSrc, setImgSrc] = useState("");
  const [imgBlob, setImgBlob] = useState({});

  const uploadImage = () => {
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        const base64String = reader.result;
        fetch(base64String)
          .then((res) => res.blob())
          .then((blob) => {
            setImgBlob({ blob, type: base64String.split(",")[0] });
          });

        setImgSrc(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      socket.emit("submit", { eventName, ...formValue, imgBlob });

      setFormValue({
        firstName: "",
        lastName: "",
        lNumber: "",
      });
      setImgSrc("");
      e.target.reset();
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
            <input type="file" onChange={uploadImage} required />
          </Stack>
          {imgSrc && (
            <div style={{ margin: "1rem" }}>
              <Image
                src={imgSrc}
                height="200"
                alt="Image preview..."
                width={150}
                height={150}
              />
            </div>
          )}

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </main>
    </>
  );
}
