import { useState } from "react";
import Layout from "../containers/layout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReservationTab from "../components/cooking/reservation_tab";
import FeedbackTab from "../components/cooking/feedback_tab";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Index() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Layout componentName="Cooking">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="Cooking tabs">
            <Tab label="Reservations" {...a11yProps(0)} />
            <Tab label="Feedback" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {value === 0 && <ReservationTab value={value} index={0} />}
        {value === 1 && <FeedbackTab value={value} index={1} />}
      </Box>
    </Layout>
  );
}
