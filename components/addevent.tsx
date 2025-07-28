"use client";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import React from "react";

 
export function AddEvent() {
  
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4, gap: 2 }}>
        
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button variant="outlined">Share</Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
            >
              Add Event
            </Button>
          </Box>
        </Box>
  );
}