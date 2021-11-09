import { useEffect, useState } from "react";
import Layout from "../containers/layout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { buttonTheme } from "../themes/themes";
import FormDialog from "../components/events/form_dialog";

export default function Events({}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [localStorageEvents, setLocalStorageEvents] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("events"))
      localStorage.setItem("events", JSON.stringify([]));

    setLocalStorageEvents(JSON.parse(localStorage.getItem("events")));
  }, [open]);

  return (
    <Layout componentName="Events">
      <Box sx={{ margin: "0.5rem" }}>
        <Typography sx={{ fontWeight: "bold" }}>Opened events:</Typography>

        {localStorageEvents.map((i, index) => (
          <div key={index}>
            Name: {i.eventName}
            <br />
            Event time: {new Date(i.eventTime).toLocaleString()}
            <br />
            <br />
          </div>
        ))}
      </Box>

      <Fab
        onClick={handleClickOpen}
        color="primary"
        aria-label="Create event"
        sx={{ ...buttonTheme, position: "absolute", bottom: 10, right: 9 }}
      >
        <AddIcon />
      </Fab>

      <FormDialog handleClose={handleClose} open={open} />
    </Layout>
  );
}
