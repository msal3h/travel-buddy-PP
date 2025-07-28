import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import { Luggage, Settings, Person, Add, Flight, Home, Place, CreditCard } from "@mui/icons-material";
import { ExpenseTracker } from "../components/expense-tracker";
import { TravelChecklist } from "../components/travel-checklist";
import Navbar from "../components/Navbar";
import PropTypes from 'prop-types';
import TravelTimeline from "../components/traveltimeline";
import TripName from "@/components/tripname";
import { AddEvent } from "@/components/addevent";
import TabClientWrapper from "@/components/tabclientwrapper";
import TripForm from "@/components/tripform";
import UserForm from "@/components/userform";

export default function HomePage({
  tripId,
  tripName,
  startDate,
  endDate,
  userName,
  userId,
  email,
}: {
  tripId?: string;
  tripName?: string;
  startDate?: string;
  endDate?: string;
  userName?: string;
  userId?: string;
  email?: string;
}) {
  if (!userName || !userId) {
    return (
      <Box sx={{ p: 4 }}>
        {/* <Typography variant="h5" gutterBottom>
          No user found.
        </Typography> */}
        <Typography variant="body1" gutterBottom>
          Let’s get started by creating your profile!
        </Typography>
        <UserForm />
      </Box>
    );
  }


  if (!tripId || !tripName) {
    return (
      <Box sx={{ p: 4 }}>
        {/* <Typography variant="h5" gutterBottom>
          No trip found.
        </Typography> */}
        <Typography variant="body1" gutterBottom>
          Let’s get started by creating your first trip!
        </Typography>
        <TripForm />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={6} sx={{ mb: 4 }}>
          <Grid item md={9} xs={12}>
            <TripName name={tripName} startDate={startDate} endDate={endDate} />
          </Grid>
          <Grid item md={3} xs={12}>
            <AddEvent />
          </Grid>
        </Grid>

        <TabClientWrapper />
      </Container>

      <Box component="footer" sx={{ borderTop: 1, borderColor: "divider", py: 3, mt: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © 2024 Travel Buddy. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

const getCategoryColor = (category: string): "primary" | "success" | "secondary" | "error" | "default" => {
  switch (category) {
    case "flight":
      return "primary";
    case "accommodation":
      return "success";
    case "activity":
      return "secondary";
    case "expense":
      return "error";
    default:
      return "default";
  }
};
