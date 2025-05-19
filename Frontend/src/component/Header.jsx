import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useNavigate } from "react-router";
import React from "react";

function Header({ toggleTheme, isDarkMode, theme }) {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{ background: theme.palette.background.default }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="https://res.cloudinary.com/db2zh3co5/image/upload/v1738681705/tvyik21uq3kwebrdmbbb.png"
            alt="Toyota Logo"
            style={{ width: "40px", height: "auto", marginRight: "8px" }}
          />
          <Box
            sx={{
              color: isDarkMode ? "#9B111E" : "red",
              fontWeight: "bold",
              transition: "0.5s",
            }}
          >
            TOYOTA
          </Box>
        </Box>
        <Box>
          <Button
            variant="text"
            sx={{
              color: (theme) => theme.palette.header.button,
              transition: "0.5s",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "scale(1.1)",
                color: isDarkMode ? "#9B111E" : "red",
              },
              "&:hover::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                transition: "left 0.5s ease",
              },
              "&:hover::before": {
                left: 0,
              },
            }}
            href="#superCars"
            onClick={() => {
              navigate("/");
            }}
          >
            Super Cars
          </Button>
          <Button
            variant="text"
            sx={{
              color: (theme) => theme.palette.header.button,
              transition: "0.5s",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "scale(1.1)",
                color: isDarkMode ? "#9B111E" : "red",
              },
              "&:hover::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                transition: "left 0.5s ease",
              },
              "&:hover::before": {
                left: 0,
              },
            }}
            href="#marketValue"
            onClick={() => {
              navigate("/");
            }}
          >
            Market Value
          </Button>
          <Button
            variant="text"
            sx={{
              color: (theme) => theme.palette.header.button,
              transition: "0.5s",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "scale(1.1)",
                color: isDarkMode ? "#9B111E" : "red",
              },
              "&:hover::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                transition: "left 0.5s ease",
              },
              "&:hover::before": {
                left: 0,
              },
            }}
            href="#stockValue"
            onClick={() => {
              navigate("/");
            }}
          >
            Stock Value
          </Button>
          <Button
            variant="text"
            sx={{
              color: (theme) => theme.palette.header.button,
              transition: "0.5s",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "scale(1.1)",
                color: isDarkMode ? "#9B111E" : "red",
              },
              "&:hover::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                transition: "left 0.5s ease",
              },
              "&:hover::before": {
                left: 0,
              },
            }}
            href="#quotes"
            onClick={() => {
              navigate("/");
            }}
          >
            Quotes
          </Button>
          <Button
            variant="text"
            sx={{
              color: (theme) => theme.palette.header.button,
              transition: "0.5s",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "scale(1.1)",
                color: isDarkMode ? "#9B111E" : "red",
              },
              "&:hover::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                transition: "left 0.5s ease",
              },
              "&:hover::before": {
                left: 0,
              },
            }}
            href="#formula1"
            onClick={() => {
              navigate("/");
            }}
          >
            Formula1
          </Button>
          <Button
            variant="text"
            sx={{
              color: (theme) => theme.palette.header.button,
              transition: "0.5s",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "scale(1.1)",
                color: isDarkMode ? "#9B111E" : "red",
              },
              "&:hover::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                transition: "left 0.5s ease",
              },
              "&:hover::before": {
                left: 0,
              },
            }}
            href="#contactUs"
            onClick={() => {
              navigate("/");
            }}
          >
            Contact Us
          </Button>
        </Box>
        {isDarkMode ? (
          <Button checked={isDarkMode} onClick={toggleTheme}>
            <DarkMode sx={{ color: (theme) => theme.palette.header.button }} />
          </Button>
        ) : (
          <Button checked={isDarkMode} onClick={toggleTheme}>
            <LightMode sx={{ color: (theme) => theme.palette.header.button }} />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
