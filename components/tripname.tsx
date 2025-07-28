import { Box, Typography, Avatar } from "@mui/material";
import { Person } from "@mui/icons-material";
import { getTripById } from "@/lib/getTrip"; // or wherever your function lives

export default function TripName({
  name,
  startDate,
  endDate,
}: {
  name?: string;
  startDate?: string;
  endDate?: string;
}) {
  const start = startDate ? new Date(startDate).toLocaleDateString() : "N/A";
  const end = endDate ? new Date(endDate).toLocaleDateString() : "N/A";

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1 }}>
        {name}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        <Typography variant="body2" color="text.secondary">
          {start} – {end}
        </Typography>
        <Typography variant="body2" color="text.secondary">•</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Avatar sx={{ width: 20, height: 20, bgcolor: "primary.light", color: "primary.contrastText" }}>
            <Person sx={{ fontSize: 12 }} />
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            Created by You
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
