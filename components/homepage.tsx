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
import TripForm from "@/app/(app)/tripform/page";
import UserForm from "@/components/userform";
import SignIn from "../components/sign-in";

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
  // <SignIn/>
  // if (!userName || !userId) {
  //   return (

  //     <Box sx={{ p: 4 }}>
  //       {/* <Typography variant="h5" gutterBottom>
  //         No user found.
  //       </Typography> */}
  //       {/* <Typography variant="body1" gutterBottom>
  //         Let’s get started by creating your profile!
  //       </Typography>
  //       <UserForm /> */}
  //     </Box>
  //   );
  // }


   if (!tripId || !tripName) {
    return (
      <Box sx={{ p: 4 }}>


       
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
 

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
