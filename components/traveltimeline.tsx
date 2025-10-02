import React from 'react';
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Flight, Home, Place } from "@mui/icons-material";
import ActivityCard from './eventcard';
import { events } from '@/src/db/schema';

export default function TravelTimeline({ tripId, startDate, endDate, events }) {

  if (!events || events.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No events yet. Add your first event to start building your travel timeline!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {events.map((event, idx) => (
        <Card key={event.id || idx} sx={{ mb: 2 }}>
          <CardContent>
            {/* Event header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              {event.flightnumber && <Flight />}
              {event.activityname && <Place />}
              {event.accomodationname && <Home />}

              <Typography variant="h6">
                {event.flightnumber ? `Flight: ${event.flightnumber}` :
                  event.activityname ? `Activity: ${event.activityname}` :
                    event.accomodationname ? `Accommodation: ${event.accomodationname}` :
                      "Event"}
              </Typography>
            </Box>

            {/* Use your ActivityCard component */}
            <ActivityCard
              category={event.flightnumber ? "flight" : event.activityname ? "activity" : "accommodation"}
              flightnumber={event.flightnumber}
              flightdeparture={event.flightdeparture}
              flightarrival={event.flightarrival}
              flightduration={event.flightduration}
              flightairline={event.flightairline}
              flightnotes={event.flightnotes}
              activityname={event.activityname}
              activitylocation={event.activitylocation}
              activitytime={event.activitytime}
              activitynotes={event.activitynotes}
              accommodationname={event.accomodationname}
              accommodationcheckin={event.accomodationcheckin}
              accommodationcheckout={event.accomodationcheckout}
              accommodationaddress={event.accomodationlocation}
              accommodationnotes={event.accomodationnotes}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
//     day: `${startDate} - ${endDate}`,
//     events: events
//       ? events.map(event => ({
//         time: "10" || "TBD",
//         title: "Flight to Tokyo",
//         icon: <Flight />,
//         category: "flight",
//         details: {
//           flightNumber: "JL 7302",
//           departure: "SFO 08:30 AM",
//           arrival: "NRT 11:45 AM (next day)",
//           duration: "11h 15m",
//         },
//       }))
//       : [],
//   },
//   {
//     day: "Day 1 - April 10",
//     events: [
//       {
//         time: "1:30 PM",
//         title: "Check-in: Shibuya Stream Excel Hotel",
//         icon: <Home />,
//         category: "accommodation",
//         details: {
//           address: "3-21-3 Shibuya, Tokyo 150-0002",
//           checkIn: "April 11, 3:00 PM",
//           checkOut: "April 14, 11:00 AM",
//           confirmation: "BK7291043",
//         },
//       },
//       {
//         time: "7:00 PM",
//         title: "Dinner at Ichiran Ramen",
//         icon: <Place />,
//         category: "activity",
//         details: {
//           address: "1-22-7 Jinnan, Shibuya City, Tokyo",
//           notes: "Famous for tonkotsu ramen, expect a wait",
//           cost: "$10 per person (est.)",
//         },
//       },
//     ],
//   },
//   {
//     day: "Day 2 - April 11",
//     events: [
//       {
//         time: "9:00 AM",
//         title: "Tokyo Metropolitan Government Building",
//         icon: <Place />,
//         category: "activity",
//         details: {
//           address: "2-8-1 Nishi-Shinjuku, Shinjuku City, Tokyo",
//           notes: "Free observation deck with city views",
//           duration: "1-2 hours",
//         },
//       },
//       {
//         time: "12:00 PM",
//         title: "Lunch at Tsukiji Outer Market",
//         icon: <Place />,
//         category: "activity",
//         details: {
//           address: "4-16-2 Tsukiji, Chuo City, Tokyo",
//           notes: "Fresh seafood and street food",
//           cost: "$15-20 per person (est.)",
//         },
//       },
//       {
//         time: "7:00 PM",
//         title: "Robot Restaurant Show",
//         icon: <CreditCard />,
//         category: "expense",
//         details: {
//           cost: "$55 per person",
//           paymentMethod: "Credit Card",
//           confirmation: "RR239087",
//         },
//       },
//     ],
//   },
// ];