import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../App.css";
import { Box, Typography, Button } from "@mui/material";
import { useInView } from "react-intersection-observer";

export default function SuperCars({ theme }) {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.8,
  });
  return (
    <div
      ref={ref}
      className={`fade-in-container ${inView ? "fade-in" : ""}`}
      id="superCars"
    >
      <Box
        sx={{
          height: "105vh",
          width: "1700px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: "40px",
          mt: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundImage:
              'url("https://res.cloudinary.com/db2zh3co5/image/upload/v1738683976/sqovfysszqkp0atbrddp.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.8,
            width: "90%",
            height: "800px",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "800px",
              color: "white",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                marginBottom: 2,
                fontSize: "3rem",
                fontWeight: 700,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                color: "black",
              }}
            >
              TOYOTA's Famous Supercars
            </Typography>
            <Typography
              sx={{
                marginBottom: 1,
                fontSize: "1.25rem",
                fontWeight: 400,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                color: "black",
              }}
            >
              Discover TOYOTA legendary supercars, like the Supra, 2000GT, and
              GR86. These cars showcase Toyota’s performance and innovation.
            </Typography>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 400,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                color: "black",
              }}
            >
              Learn about their design, value trends, and how they've impacted
              the car world.
            </Typography>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 400,
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                color: "black",
              }}
            >
              We also cover TOYOTA's supercar market performance and financial
              data.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: (theme) => theme.palette.header.reverse,
                mt: "20px",
                color: (theme) => theme.palette.header.button
              }}
              onClick={() => {
                navigate("/detail");
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
