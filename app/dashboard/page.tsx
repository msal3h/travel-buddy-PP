import { Box, Typography, Avatar, Button } from "@mui/material"; 
import {Luggage} from "@mui/icons-material";
import SignIn from "@/components/sign-in";


export default function DashboardPage() {
  return (
      <Box mt={-8} display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
          <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText" }} >
              <Luggage />
          </Avatar>
          <Typography variant="h1" sx={{ color: "primary.main", position: "relative" }}>
              Welcome to Travel Buddy
          </Typography>
          <Typography sx={{maxWidth: 600, fontWeight: 500 }}>
            Plan your perfect trip with our comprehensive travel planning tools. Create itineraries, track expenses, manage checklists, and more.
            </Typography>
          
      </Box>
  );
}
