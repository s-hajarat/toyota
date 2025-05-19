import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Footer from "./Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useInView } from "react-intersection-observer";

export default function ContactUs({ theme, isDarkMode }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.7,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        title: "Empty Fields?",
        text: "Please fill in all fields.",
        icon: "question",
        background: isDarkMode ? "#191919" : "#B3C8CF",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact/us",
        formData
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Message Received Successfuly!",
          showConfirmButton: false,
          timer: 1500,
          background: isDarkMode ? "#191919" : "#B3C8CF",
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong. Please try again later.",
        showConfirmButton: false,
        timer: 1500,
        background: isDarkMode ? "#191919" : "#B3C8CF",
      });
    }
  };

  return (
    <div id="contactUs" ref={ref}
      className={`fade-in-container ${inView ? "fade-in" : ""}`}>
      <Box>
        <Box

          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              borderRadius: "16px",
              padding: 4,
              width: "800px",
              backdropFilter: "blur(30px)",
              background: (theme) => theme.palette.background.reverse,
              boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)",
              mt: 25,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: 3,
                fontWeight: 700,
                textAlign: "center",
                color: (theme) => theme.palette.header.button,
              }}
            >
              Contact Us
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                sx={{ marginBottom: 2 }}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                sx={{ marginBottom: 2 }}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                multiline
                rows={4}
                sx={{ marginBottom: 2 }}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#526D82",
                  color: (theme) => theme.palette.header.button,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.header.default,
                  },
                }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
        <Box sx={{
          mb:15,
          width:"200vh",
        }}>
        <Footer sx={{
          color: (theme) => theme.palette.header.button 
          }} isDarkMode={isDarkMode}/>

        </Box>
      </Box>
    </div>
  );
}
