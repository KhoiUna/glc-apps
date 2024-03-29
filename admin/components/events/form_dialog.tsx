import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { buttonTheme, appBarTheme } from "../../themes/themes";
import { useState } from "react";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import EventUtil from "../../utils/EventUtil";
import CircularProgress from "@mui/material/CircularProgress";
import { setDefaultResultOrder } from "dns/promises";

interface FormDialogProps {
  toggleFormDialog: () => void;
  open: boolean;
  handleCreate: () => void;
}

export default function FormDialog({
  toggleFormDialog,
  open,
  handleCreate,
}: FormDialogProps) {
  const [createdDate, setCreatedDate] = useState(new Date());
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState("");
  const handleClick = async () => {
    setInProgress(true);

    const res = await EventUtil.createEvent(createdDate);
    if (res.ok) {
      handleCreate();
      toggleFormDialog();
      return;
    }

    setInProgress(false);
    setError(await res.text());
    return;
  };

  return (
    <Dialog fullScreen open={open} onClose={toggleFormDialog}>
      <AppBar sx={{ ...appBarTheme, position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleFormDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create event
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ margin: "1rem", textAlign: "center" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Event date:
        </Typography>

        <div style={{ margin: "1rem" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date mobile"
              inputFormat="MM/dd/yyyy"
              value={createdDate}
              onChange={(newValue) => {
                setCreatedDate(newValue);
                setError("");
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ ...buttonTheme }}
          disabled={inProgress}
        >
          {inProgress ? (
            <CircularProgress
              sx={{
                width: "0.5rem",
                height: "0.5rem",
              }}
            />
          ) : (
            "Create"
          )}
        </Button>
        {error && (
          <Typography
            sx={{ color: "#ff0000", margin: "0.5rem 0", fontWeight: "bold" }}
          >
            {error}
          </Typography>
        )}
      </div>
    </Dialog>
  );
}
