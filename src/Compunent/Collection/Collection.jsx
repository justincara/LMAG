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
      id="collection"
    >
      {/* Heading */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Zen Dots, sans-serif",
          fontSize: {
            xs: "32px",
            sm: "32px",
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
          marginTop: { xs: "25px", sm: "50px", md: "75px" },
        }}
      >
        {/* First Image */}
        <Box
          sx={{
            width: {
              xs: "300px", 

              sm: "420px", 
            },
            height: {
              xs: "500px",
              sm: "692px",
            },
            border: "4px solid #EFBF04",
            // objectFit: "contain",
          }}
        >
          <img src={coll1} alt="Collection 1" style={{width: '100%', height: '100%'}} loading="lazy" />
        </Box>
        {/* Second Image */}
        <Box
          sx={{
            width: {
              xs: "300px", 

              sm: "420px", 
            },
            height: {
              xs: "500px",
              sm: "692px",
            },
            border: "4px solid #EFBF04",
            // objectFit: "contain",
          }}
        >
          <img src={coll2} alt="Collection 2" style={{width: '100%', height: '100%'}} loading="lazy" />
        </Box>
      </Box>

    </Box>
  );
}

export default Collection;
