import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Swal from "sweetalert2";
import { TypeAnimation } from "react-type-animation";
import { useSpring, animated } from "@react-spring/web";

export default function RandomQuote({ theme, isDarkMode }) {
  const [open, setOpen] = React.useState(false);
  const [quote, setQuote] = useState({ name: "", quote: "" });
  const [animationKey, setAnimationKey] = useState(0); // To reset animation on quote change
  const [viewAnimationKey, setViewAnimationKey] = useState(0); // To reset animation on quote change

  const { ref, inView } = useInView({
    triggerOnce: false, // Allow the animation to trigger each time it comes into view
    threshold: 0.8,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Fetch a random quote
  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quotes/view");
      const quotes = response.data;
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setAnimationKey((prevKey) => prevKey + 1); // Update key to reset animation
    } catch (error) {
      console.error("Error fetching quote:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to load quote. Please try again later.",
        background: isDarkMode ? "#191919" : "#B3C8CF",
      });
    }
  };

  const addQuote = async (name, quote, position, image) => {
    try {
      const response = await axios.post("http://localhost:5000/api/quotes/add", {
        name: name,
        quote: quote,
        position: position,
        image: image,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Quote Received Successfuly!",
          showConfirmButton: false,
          timer: 1500,
          background: isDarkMode ? "#191919" : "#B3C8CF",
        })};
    }
    catch (error){
      console.log("Error : ",error)
      Swal.fire({
        icon: "error",
        title: "Something went wrong. Please try again later.",
        showConfirmButton: false,
        timer: 1500,
        background: isDarkMode ? "#191919" : "#B3C8CF",
      });
    }
    
  };

  useEffect(() => {
    fetchRandomQuote(); // Initial quote fetch
  }, []);

  useEffect(() => {
    if (inView) {
      setAnimationKey((prevKey) => prevKey + 1); // Update key to reset animation
      setViewAnimationKey((prevKey) => prevKey + 1); // Reset animation each time the component comes into view
    }
  }, [inView]);

  return (
    <div id="quotes">
      <Box
        ref={ref}
        className={`fade-in-container ${inView ? "fade-in" : ""}`}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // To stack the "Famous Quotes" text and the quote box
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            color: (theme) => theme.palette.header.button,
          }}
        >
          <TypeAnimation
            cursor={false}
            key={`${viewAnimationKey}-famous-quotes`}
            sequence={["Famous Quotes", 2000]} // Animation sequence
            speed={30}
            repeat={0}
            wrapper="span"
          />
        </Typography>

        <Box
          sx={{
            background: (theme) => theme.palette.background.reverse,
            borderRadius: "24px",
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <animated.div
            style={{
              backgroundImage: `url('${quote.image_url}')`,
              backgroundSize: "cover",
              backgroundPosition: "left",
              padding: 4,
              width: "1000px",
              height: "600px",
              color: (theme) => theme.palette.header.button,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
                textAlign: "right",
                padding: "10px",
                borderRadius: "8px",
                width: "250px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontStyle: "italic",
                  marginBottom: 2,
                }}
              >
                <TypeAnimation
                  cursor={false}
                  key={`${animationKey}-quote`}
                  sequence={[`"${quote.quote}"`, 2000]}
                  speed={80}
                  repeat={0}
                  wrapper="span"
                />
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                <TypeAnimation
                  cursor={false}
                  key={`${animationKey}-name`}
                  sequence={[`- ${quote.name}`, 2000]}
                  speed={50}
                  repeat={0}
                  wrapper="span"
                />
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                <TypeAnimation
                  cursor={false}
                  key={`${animationKey}-type`}
                  sequence={[`${quote.type}`, 2000]}
                  speed={60}
                  repeat={0}
                  wrapper="span"
                />
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#526D82",
                color: (theme) => theme.palette.header.button,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.header.default,
                },
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
              onClick={fetchRandomQuote}
            >
              Get Another Quote
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#526D82",
                color: (theme) => theme.palette.header.button,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.header.default,
                },
                position: "absolute",
                bottom: "20px",
                right: "250px",
              }}
              onClick={handleClickOpen}
            >
              suggest a quote
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: "form",
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const quote = formJson.quote;
                  const name = formJson.name;
                  const position = formJson.position;
                  const image = formJson.image;
                  addQuote(name, quote, position, image);
                  handleClose();
                },
              }}
            >
              <DialogTitle>Suggest a Quote</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Suggest a quote for us that would inspire the world!
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="quote"
                  name="quote"
                  label="The Quote"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="position"
                  name="position"
                  label="Position"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="image"
                  name="image"
                  label="Image URL without a background!"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
              </DialogActions>
            </Dialog>
          </animated.div>
        </Box>
      </Box>
    </div>
  );
}
