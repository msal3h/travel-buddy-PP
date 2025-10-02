
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
// import { theme } from "./theme" // or "../theme" if your theme file is outside `app/`
import { Box } from "@mui/material"
import { Container, Grid, Typography } from "@mui/material"
import Navbar from "@/components/Navbar"
import TripName from "@/components/tripname"
import { AddEvent } from "@/components/addevent"
import TabClientWrapper from "@/components/tabclientwrapper"


export default function AppSectionLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <>

        
     {children}
    
    </>
  );
}
