import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
} from "@mui/material";
import TripName from "@/components/tripname";
import { AddEvent } from "@/components/addevent";
import TabClientWrapper from "@/components/tabclientwrapper";
import { auth } from "@/auth"; 
import { trips } from "@/src/db/schema";
import { db } from "@/src/db";
import { eq } from "drizzle-orm"; 
import Traveltimeline from "@/components/traveltimeline";
import { getEventsForTrip } from "@/lib/data";



export default async function HomePage({
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
 
  const session = await auth();
  let trip;
  if (tripId) {
    [trip] = await db.select().from(trips).where(eq(trips.id, tripId));
  }

   if (!tripId || !tripName) {
    return (
      <Box sx={{ p: 4 }}>
        
      </Box>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={6} sx={{ mb: 4 }}>
          <Grid item md={9} xs={12}>
            <TripName name={trip?.name} 
            startDate={trip?.startDate ?? undefined} 
            endDate={trip?.endDate ?? undefined}/>
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
            <Traveltimeline tripId={tripId}  />
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
