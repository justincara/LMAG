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
        marginTop: '75px'
      }}
    >
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
          lineHeight: 1.6,
          textAlign: "center",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          marginBottom: 2,
        }}
      >
        Join the LMAG Community
      </Typography>
      <Typography
        variant="paragraph"
        sx={{
          fontFamily: "Lora, serif",
          fontWeight: 400,
          fontSize: '18px'
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
          marginTop: '25px',
          gap: 2,
        }}
      >
        <a href="https://t.me/+dnAyb36G9xtlMzgx">
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
        </a>

        <a href="https://x.com/LMAGCOIN">
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
        </a>
      </Box>
    </Box>
  );
}

export default CommunitySection;
