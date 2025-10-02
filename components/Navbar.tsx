"use client";
import React from 'react';
import { AppBar, Toolbar, Typography, Button,Box, Avatar, IconButton } from '@mui/material';
import {
  Luggage,
  Settings,
  Person
} from '@mui/icons-material';
import { Ojuju, Inter} from "next/font/google";
import { useState } from 'react';
import SignIn from './sign-in';

const ojuju = Ojuju({
  subsets: ["latin"], 
  weight: [ "700"], 
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});


function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <>
        <AppBar position="sticky" sx={{ bgcolor: "background.paper", color: "text.primary" }} elevation={1}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
            <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
              <Luggage />
            </Avatar>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontFamily: "ojuju" }}>
              Travel Buddy
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, mr: 2 }}>
            <Button href="/tripform" sx={{ fontFamily: "inter",color:"black"}} > Create trip</Button>
            <Button sx={{ fontFamily: "inter",color:"black"}} href="/dashboard">Dashboard</Button>
            <Button sx={{ fontFamily: "inter",color:"black"}} >My Trips</Button>
            {/* <Button variant="outlined">Explore</Button>
            <Button variant="outlined">Help</Button> */}
          </Box>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <IconButton color="inherit" onClick={() => setShowSignIn(true)}>
            <Person />
          </IconButton>
          {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
        </Toolbar> 
      </AppBar>    
      
    
    </>
  );
}
export default Navbar;