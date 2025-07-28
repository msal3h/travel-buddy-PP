import React from "react";
import { Box } from "@mui/material";
// This component renders the content of the currently active tab (aka the one clicked on)

type TabPanelProps = {
  children?: React.ReactNode;
  value: number;
  index: number;
};

export default function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}
