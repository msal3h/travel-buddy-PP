    import React from 'react';
import { AppBar, Toolbar, Typography, Button,Box, Avatar, IconButton } from '@mui/material';
import {
  Luggage,
  Settings,
  Person
} from '@mui/icons-material';
import {Ojuju} from "next/font/google"

function Navbar() {
  return (
        <AppBar position="sticky" sx={{ bgcolor: "background.paper", color: "text.primary" }} elevation={1}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
            <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
              <Luggage />
            </Avatar>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontFamily:"Ojuju" }}>
              Travel Buddy
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, mr: 2 }}>
            <Button href="/tripform"  > Create trip</Button>
            <Button >Dashboard</Button>
            <Button >My Trips</Button>
            {/* <Button variant="outlined">Explore</Button>
            <Button variant="outlined">Help</Button> */}
          </Box>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>
  );
}
export default Navbar;