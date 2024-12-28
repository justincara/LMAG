import React from "react";
import { Box, Typography } from "@mui/material";
import coll1 from "../assets/cool1.webp";
import coll2 from "../assets/cool2.webp";

function Collection() {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        py: 6,
        marginTop: "50px",
        padding: "25px",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Zen Dots, sans-serif",
          fontSize: {
            xs: "40px",
            sm: "45px",
            md: "64px",
          },
          fontWeight: 400,
          lineHeight: {
            xs: "50px",
            sm: "55px",
            md: "76.8px",
          },
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        LMAG Coin Art Collection
      </Typography>

      {/* Image Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* First Image */}
        <Box
          component="img"
          src={coll1}
          alt="Collection 1"
          sx={{
            width: {
              xs: "300px", 

              sm: "420px", 
            },
            height: {
              xs: "500px",
              sm: "610px",
            },
            border: "4px solid #EFBF04",
            // objectFit: "contain",
          }}
        />
        {/* Second Image */}
        <Box
          component="img"
          src={coll2}
          alt="Collection 2"
          sx={{
            width: {
              xs: "300px", 
              sm: "420px", 
            },
            height: {
              xs: "500px",
              sm: "610px", 
            },
            border: "4px solid #EFBF04",
            // objectFit: "contain",
          }}
        />
      </Box>

    </Box>
  );
}

export default Collection;
