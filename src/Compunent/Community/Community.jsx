import React from "react";
import { Button, Typography, Box } from "@mui/material";
import NewImg from "../assets/NewImg.webp";

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
        marginTop: "75px",
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
          fontSize: "18px",
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
          marginTop: "25px",
          gap: 2,
        }}
      >
        <a href="https://t.me/lmagcoin">
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
      <div style={{ marginTop: "7%" }}>
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
          Disclaimer
        </Typography>
        <p className="jus">
          Investing in cryptocurrencies carries significant risks. The market is
          highly volatile, and the value of digital assets can fluctuate
          dramatically, leading to potential losses. Cryptocurrencies are not
          regulated in many jurisdictions, which may expose investors to fraud
          or cyberattacks. Additionally, past performance is not indicative of
          future results. Always conduct thorough research and consult with a
          financial advisor before investing. Only invest money you can afford
          to lose.
        </p>

        <Box sx={{ padding: {xs: '0 15px', md: '0 50px'},  maxWidth: '1024px', width: {xs: '90%', sm: '100%', md: '100%'}, margin: '75px auto', height: {xs: '400px', md: '100%'}}}>
        <img src={NewImg} alt="Lmag" loading="lazy" style={{width: '100%', height: '100%', border: "4px solid #EFBF04", objectFit: 'cover'}} />
      </Box>
      </div>
    </Box>
  );
}

export default CommunitySection;
