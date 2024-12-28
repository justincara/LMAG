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
        px: 4,
        textAlign: "center",
        padding: '50px',
        margin: '75px 0'
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Zen Dots, sans-serif",
          fontSize: {
            xs: "28px",
            sm: "36px",
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
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: "25.6px",
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
        spacing={2}
        sx={{
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Box
            component="img"
            src={Escorted}
            alt="Escorted Image"
            sx={{
              width: "100%",
              height: "400px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            component="img"
            src={SmilingPortrait}
            alt="Smiling Portrait"
            sx={{
              width: "100%",
              height: "400px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            component="img"
            src={PostArrest}
            alt="Post Arrest"
            sx={{
              width: "100%",
              height: "400px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
