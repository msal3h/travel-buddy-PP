
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "./theme" // or "../theme" if your theme file is outside `app/`
import { Box } from "@mui/material"
import { Container, Grid, Typography } from "@mui/material"
import Navbar from "@/components/Navbar"
import TripName from "@/components/tripname"
import { AddEvent } from "@/components/addevent"
import TabClientWrapper from "@/components/tabclientwrapper"


export default function RootLayout({
  children, // children here is the content of page.tsx
}: {
  children: React.ReactNode // children is any valid react content
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />


         
          {children}
        </body>
      </html>
      );
}