"use client";
import { useTheme } from "@mui/material/styles";
import { Box, Tabs, Tab } from "@mui/material";
//renders the clickable tab buttons like timeline, expenses, etc.
interface TabBarProps {
  tabValue: number;
  handleTabChange: (_event: React.SyntheticEvent, newValue: number) => void;
}

export default function TabBar({ tabValue, handleTabChange }: TabBarProps) {
  const theme = useTheme();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          "& .MuiTab-root.Mui-selected": {
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: "8px 8px 0 0",
          },
        }}
      >
        <Tab label="Timeline" />
        <Tab label="Expenses" />
        <Tab label="Checklist" />
        <Tab label="Documents" />
        <Tab label="Notes" />
      </Tabs>
    </Box>
  );
}

