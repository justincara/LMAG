import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

function Welcome() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "85vh", sm: "85vh", md: "90vh" }, 
        width: "100%", 
        overflow: "hidden", 
        display: "flex",
        flexDirection: "column", 
        justifyContent: "flex-end", 
        alignItems: "center", 
      }}
    >
      {/* Background Video */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, 
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover", 
            transform: "translate(-50%, -50%)",
          }}
        >
          <source src='/assets/BitcoinAnimation.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Grouped Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Text Content */}
        <Box sx={{marginBottom: {xs: "-85px", sm: "-85px", md: '-120px', lg: "-130px"}}}>
          <Typography
            sx={{
              fontFamily: "Zen Dots, sans-serif",
              fontSize: {
                xs: "24px",
                sm: "24px",
                md: '28px',
                lg: "36px",
              },
              color: "#fff",
            }}
          >
            The Most Potent Coin Representing
          </Typography>

          <Typography
            sx={{
              fontFamily: "Zen Dots, sans-serif",
              fontSize: {
                xs: "56px",
                sm: "56px",
                md: '84px',
                lg: "102px",
              },
              fontWeight: 700,
              color: "#EFBF04",
            }}
          >
            Luigi Mangione
          </Typography>

        </Box>

        {/* Center Image with Fade Animation */}
        <Box
          component="img"
          src="/assets/WelcomePerson.svg"
          alt="Welcome Person"
          sx={{
            width: {
              xs: "350px",
              sm: "350px",
              md: "600px",
            },
            maxHeight: {md: '300px', lg: '300px'}, 
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 2s ease-in",
            marginTop: "16px", 
          }}
        />
      </Box>
    </Box>
  );
}

export default Welcome;
