"use client";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import EventDialog from "./eventdialog";


export function AddEvent() {


  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4, gap: 2 }}>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button variant="outlined">Share</Button>
          <EventDialog />
          
        </Box>
      </Box>
      
    </>
  );
}