import React from 'react';
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
  useTheme,
} from "@mui/material"
import { Luggage, Settings, Person, Add, Flight, Home, Place, CreditCard } from "@mui/icons-material"
import { getCategoryColor } from "../components/utils/categoryColors"
function TravelTimeline( {
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
  const timelineEvents = [
    {
      day: `${startDate} - ${endDate}`,
      events: [
        {
          time: "8:30 AM",
          title: "Flight to Tokyo",
          icon: <Flight />,
          category: "flight",
          details: {
            flightNumber: "JL 7302",
            departure: "SFO 08:30 AM",
            arrival: "NRT 11:45 AM (next day)",
            duration: "11h 15m",
          },
        },
        {
          time: "1:30 PM",
          title: "Check-in: Shibuya Stream Excel Hotel",
          icon: <Home />,
          category: "accommodation",
          details: {
            address: "3-21-3 Shibuya, Tokyo 150-0002",
            checkIn: "April 11, 3:00 PM",
            checkOut: "April 14, 11:00 AM",
            confirmation: "BK7291043",
          },
        },
        {
          time: "7:00 PM",
          title: "Dinner at Ichiran Ramen",
          icon: <Place />,
          category: "activity",
          details: {
            address: "1-22-7 Jinnan, Shibuya City, Tokyo",
            notes: "Famous for tonkotsu ramen, expect a wait",
            cost: "$10 per person (est.)",
          },
        },
      ],
    },
    {
      day: "Day 2 - April 11",
      events: [
        {
          time: "9:00 AM",
          title: "Tokyo Metropolitan Government Building",
          icon: <Place />,
          category: "activity",
          details: {
            address: "2-8-1 Nishi-Shinjuku, Shinjuku City, Tokyo",
            notes: "Free observation deck with city views",
            duration: "1-2 hours",
          },
        },
        {
          time: "12:00 PM",
          title: "Lunch at Tsukiji Outer Market",
          icon: <Place />,
          category: "activity",
          details: {
            address: "4-16-2 Tsukiji, Chuo City, Tokyo",
            notes: "Fresh seafood and street food",
            cost: "$15-20 per person (est.)",
          },
        },
        {
          time: "7:00 PM",
          title: "Robot Restaurant Show",
          icon: <CreditCard />,
          category: "expense",
          details: {
            cost: "$55 per person",
            paymentMethod: "Credit Card",
            confirmation: "RR239087",
          },
        },
      ],
    },
  ]
    return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {timelineEvents.map((day, dayIndex) => (
        <Box key={dayIndex}>
          <Chip
            label={day.day}
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontWeight: 600,
              mb: 2,
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pl: 2, borderLeft: 2, borderColor: "divider" }}>
            {day.events.map((event, eventIndex) => (
              <Box key={eventIndex} sx={{ position: "relative" }}>
                <Avatar
                  sx={{
                    position: "absolute",
                    left: -37,
                    top: 8,
                    width: 32,
                    height: 32,
                    bgcolor: "background.paper",
                    border: 2,
                    borderColor: "divider",
                    color: "text.primary",
                  }}
                >
                  {event.icon}
                </Avatar>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography variant="h6" component="h3">
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <Chip
                        label={event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        size="small"
                        color={getCategoryColor(event.category)}
                        variant="outlined"
                      />
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Avatar sx={{ width: 16, height: 16, bgcolor: "primary.light" }}>
                          <Person sx={{ fontSize: 10 }} />
                        </Avatar>
                        <Typography variant="caption" color="text.secondary">
                          {/* Added by {event.author || "You"} */}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      {Object.entries(event.details).map(([key, value]) => (
                        <Box key={key} sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                            {key}:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
export default TravelTimeline;