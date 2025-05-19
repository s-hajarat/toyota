import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import SuperCars from "../component/SuperCars";
import MarketValue from "../component/MarketValue";
import StockValue from "../component/StockMarket";
import Quotes from "../component/Quotes";
import Contact from "../component/Contact";
import Formula1 from "../component/Formula1";
import { useInView } from "react-intersection-observer";
import "../App.css";


function Home({ theme, isDarkMode }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const sectionsRef = useRef([]);
  const [loading, setLoading] = useState(true); 

  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      const delta = event.deltaY;

      event.preventDefault();

      const currentIndex = sectionsRef.current.findIndex(
        (section) =>
          section.getBoundingClientRect().top <= window.innerHeight / 2 &&
          section.getBoundingClientRect().bottom >= window.innerHeight / 2
      );

      if (delta > 0 && currentIndex < sectionsRef.current.length - 1) {
        sectionsRef.current[currentIndex + 1].scrollIntoView({
          behavior: "smooth",
        });
      } else if (delta < 0 && currentIndex > 0) {
        sectionsRef.current[currentIndex - 1].scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ height: "100vh", overflowY: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}>
      {loading && (
        <Box
        ref={ref}
        className={`fade-in-logo ${inView ? "fade-in" : ""}`}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <img
            src="https://res.cloudinary.com/db2zh3co5/image/upload/v1738827714/ofo9zjxt2qqyuvthzndp.png"
            alt="Loading"
            style={{
              width: "450px", 
              height: "auto",
            }}
          />
          <Box
          ref={ref}
          className={`fade-in-text ${inView ? "fade-in" : ""}`}
            sx={{
              marginTop: 4, 
              fontSize: "100px", 
              fontWeight: "bold",
              color: isDarkMode ? "#9B111E" : "red",
            }}
          >
            TOYOTA
          </Box>
        </Box>
      )}

      {!loading && (
        <>
          <Box
            ref={addToSectionsRef}
            sx={{
              height: "100vh",
              scrollSnapAlign: "start",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            <SuperCars theme={theme} isDarkMode={isDarkMode}/>
          </Box>

          <Box
            ref={addToSectionsRef}
            sx={{
              height: "100vh",
              scrollSnapAlign: "start",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            <MarketValue theme={theme} isDarkMode={isDarkMode}/>
          </Box>

          <Box
            ref={addToSectionsRef}
            sx={{
              height: "100vh",
              scrollSnapAlign: "start",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            <StockValue theme={theme} isDarkMode={isDarkMode}/>
          </Box>

          <Box
            ref={addToSectionsRef}
            sx={{
              height: "100vh",
              scrollSnapAlign: "start",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            <Quotes theme={theme} isDarkMode={isDarkMode} />
          </Box>

          <Box
            ref={addToSectionsRef}
            sx={{
              height: "100vh",
              scrollSnapAlign: "start",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            <Formula1 theme={theme} isDarkMode={isDarkMode} />
          </Box>

          <Box
            ref={addToSectionsRef}
            sx={{
              height: "100vh",
              scrollSnapAlign: "start",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            <Contact theme={theme} isDarkMode={isDarkMode} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Home;
