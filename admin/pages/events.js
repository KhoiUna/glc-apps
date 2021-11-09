import { useState } from "react";
import Layout from "../containers/layout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { buttonTheme } from "../themes/themes";
import FormDialog from "../components/events/form_dialog";
import OpenedEventsTab from "../components/events/opened_events_tab";
import SubmissionsTab from "../components/events/submissions_tab";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Events({}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout componentName="Events">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="Events tabs">
          <Tab label="Opened Events" {...a11yProps(0)} />
          <Tab label="Submissions" {...a11yProps(1)} />
          <Tab label="Signature" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Box
        sx={{
          margin: "0.5rem 0 4.5rem 0.5rem",
        }}
      >
        {value === 0 && <OpenedEventsTab value={value} index={0} open={open} />}
        {value === 1 && <SubmissionsTab value={value} index={1} />}
        {/* {value === 2 && <SignatureTab value={value} index={2} />}  */}
      </Box>

      {value === 0 && (
        <Fab
          onClick={handleClickOpen}
          color="primary"
          aria-label="Create event"
          sx={{ ...buttonTheme, position: "fixed", bottom: 0, right: 9 }}
        >
          <AddIcon />
        </Fab>
      )}

      {open && <FormDialog handleClose={handleClose} open={open} />}
    </Layout>
  );
}
