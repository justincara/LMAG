import React from "react";
import { Button, Typography, Box } from "@mui/material";

function CommunitySection() {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "25px",
        py: 6,
        marginBottom: "100px",
      }}
    >
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
          lineHeight: "76.8px",
          textAlign: "center",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          marginBottom: 2,
        }}
      >
        Join the LMAG Community
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "Lora, sans-serif",
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        Be a part of the LMAG family. Share your voice and support the movement!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column", 
            sm: "row",
          },
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#EFBF04",
            color: "#000",
            fontFamily: "Lora, sans-serif",
            fontWeight: 400,
            borderRadius: "40px",
            paddingX: 2,
            height: "55px",
            width: "200px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#d4a904",
            },
          }}
        >
          Join Telegram
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#EFBF04",
            color: "#000",
            fontFamily: "Lora, sans-serif",
            fontWeight: 400,
            width: "200px",
            height: "55px",
            borderRadius: "40px",
            paddingX: 2,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#d4a904",
            },
          }}
        >
          Join X (Twitter)
        </Button>
      </Box>
    </Box>
  );
}

export default CommunitySection;
