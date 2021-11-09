import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import { buttonTheme, appBarTheme } from "../../themes/themes";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function FormDialog({ handleClose, open }) {
  const [value, setValue] = useState({
    eventName: "",
    eventTime: new Date(),
  });
  const handleChange = ({ target }) =>
    setValue((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));

  const [qrSrc, setQrSrc] = useState("");
  const handleClick = async () => {
    try {
      const eventsArray = JSON.parse(localStorage.getItem("events"));
      const data = {
        ...value,
        eventTime: new Date(value.eventTime).toUTCString(),
      };
      eventsArray.push(data);
      localStorage.setItem("events", JSON.stringify(eventsArray));

      setQrSrc(data.eventName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ ...appBarTheme, position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create event
          </Typography>
        </Toolbar>
      </AppBar>

      <form style={{ margin: "0.5rem" }} onChange={handleChange}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          sx={{ margin: "1.5rem 0" }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Event name:
          </Typography>
          <TextField
            label="Event name"
            name="eventName"
            variant="filled"
            value={value.eventName}
          />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          sx={{ margin: "1.5rem 0" }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Event time:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              name="eventTime"
              renderInput={(props) => <TextField {...props} />}
              label="Event time"
              value={value.eventTime}
              onChange={(newValue) =>
                setValue((prev) => ({ ...prev, eventTime: newValue }))
              }
            />
          </LocalizationProvider>
        </Stack>

        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ ...buttonTheme, float: "right" }}
        >
          Create
        </Button>
      </form>

      {qrSrc && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <img
            width={150}
            src={`https://api.qrserver.com/v1/create-qr-code/?data=https://glc-events.vercel.app?eventName=${qrSrc}`}
          />
        </div>
      )}
    </Dialog>
  );
}
