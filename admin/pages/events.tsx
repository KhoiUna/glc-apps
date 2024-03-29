import { useState } from "react";
import Layout from "../containers/layout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OpenedEventsTab from "../components/events/opened_events_tab";
import SubmissionsTab from "../components/events/submissions_tab";
import SignatureTab from "../components/events/signature_tab";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Events({}) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout componentName="Events">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="Events tabs">
          <Tab label="Created Events" {...a11yProps(0)} />
          <Tab label="Submissions" {...a11yProps(1)} />
          <Tab label="Signature" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Box
        sx={{
          margin: "0.5rem 0 4.5rem 0.5rem",
        }}
      >
        {value === 0 && <OpenedEventsTab />}
        {value === 1 && <SubmissionsTab />}
        {value === 2 && <SignatureTab />}
      </Box>
    </Layout>
  );
}
