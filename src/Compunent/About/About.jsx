import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import PostArrest from "../assets/LMAG_post-arrest_portrait.webp";
import SmilingPortrait from "../assets/LMAG_smiling_portrait.webp";
import Escorted from "../assets/LMAG_Escorted.webp";

function About() {
  return (
    <Box
      sx={{
        backgroundColor: "#000", 
        color: "#fff",
        py: 6,
        // px: 4,
        textAlign: "center",
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: '75px 0'
      }}
      id="about"
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Zen Dots, sans-serif",
          fontSize: {
            xs: "32px",
            sm: "32px",
            md: "48px",
          },
          fontWeight: 400,
          marginBottom: 4,
        }}
      >
        About LMAG
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontFamily: "Lora, serif",
          fontSize: {xs: "14px", sm: "14px", md: "20px"},
          fontWeight: 400,
          lineHeight: 1.6,
          textAlign: "center",
          maxWidth: "90%",
          margin: "0 auto 4rem",
        }}
      >
        <strong style={{ color: "#EFBF04" }}>Luigi Mangione,</strong> a 26-year-old Maryland native, was charged with
        murdering UnitedHealthcare CEO Brian Thompson in Manhattan. A former
        valedictorian and engineer, he struggled with health issues and was{" "}
        <strong style={{ color: "#EFBF04" }}>arrested on December 9, 2024,</strong>{" "}
        carrying a manifesto criticizing the healthcare system. His case has sparked
        public debate but also warnings against glorifying violence.
      </Typography>

      <Grid
        container
        spacing={2} // Adds uniform spacing between items
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto", // Centers the grid within its container
          paddingLeft: { xs: '50px', sm: '50px', md: '50px' },
          paddingRight: { xs: '75px', sm: '50px', md: '75px' },
          maxWidth: "1400px", // Optional: limits the overall width of the grid for larger screens
        }}
      >
        {/* First Image - Occupies 50% of the screen */}
        <Grid
          item
          xs={12}
          md={4}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: '0'
          }}
        >
          <Box
            component="img"
            src={Escorted}
            alt="Escorted Image"
            sx={{
              width: "100%",
              maxWidth: "750px", // Upper size limit
              minWidth: "250px", // Lower size limit
              height: "400px",
              objectFit: "cover",
            }}
          />
        </Grid>

        {/* Second Image - Occupies 25% of the screen */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: '0'
          }}
        >
          <Box
            component="img"
            src={SmilingPortrait}
            alt="Smiling Portrait"
            sx={{
              width: "100%",
              maxWidth: "350px", // Upper size limit
              minWidth: {xs: '250px', sm: '250px', md: '150px'}, // Lower size limit
              height: "400px",
              objectFit: "cover",
            }}
          />
        </Grid>

        {/* Third Image - Occupies 25% of the screen */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: '0'
          }}
        >
          <Box
            component="img"
            src={PostArrest}
            alt="Post Arrest"
            sx={{
              width: "100%",
              maxWidth: "350px", // Upper size limit
              minWidth: {xs: '250px', sm: '250px', md: '150px'}, // Lower size limit
              height: "400px",
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>


    </Box>
  );
}

export default About;
