// components/tab-client-wrapper.tsx
"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TabBar from "./tabbar";
import TabPanel from "./tabpanel";
import { TravelChecklist } from "./travel-checklist";
import { ExpenseTracker } from "./expense-tracker";
import TravelTimeline from "./traveltimeline";

export default function TabClientWrapper() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <>
      <TabBar tabValue={tabValue} handleTabChange={(_e, v) => setTabValue(v)} />

      <TabPanel value={tabValue} index={0}>
        <TravelTimeline />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ExpenseTracker />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TravelChecklist />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 200,
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">Travel documents will appear here</Typography>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 200,
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">Trip notes will appear here</Typography>
        </Box>
      </TabPanel>
    </>
  );
}
