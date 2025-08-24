
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
        <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* <Grid container spacing={6} sx={{ mb: 4 }}>
          <Grid item md={9} xs={12}>
           
          </Grid>
          <Grid item md={3} xs={12}>
           
          </Grid>
        </Grid> */}

     <head>
              <link
          href="https://fonts.googleapis.com/css2?family=Ojuju:wght@400;700&display=swap"
          rel="stylesheet"
        />
     </head>

        
      <body>{children}</body>
      </Container>
     
   

 </html>
  )
}