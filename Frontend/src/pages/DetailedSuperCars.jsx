import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import Paper from "@mui/material/Paper";
import { useInView } from "react-intersection-observer";
import { createTheme, ThemeProvider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; 
import Footer from "../component/Footer";

function DetailedSuperCars({ theme, isDarkMode }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [cars, setCars] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false); 
  


  const detailTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      dataGrid: {
        background: isDarkMode ? "#1A1A1D" : "#999999",
      },
    },
  });

  const getGradientBackground = () => {
    return isDarkMode
      ? "linear-gradient(to right, #000000,rgb(49, 49, 49));"
      : "linear-gradient(to right,rgb(69, 96, 117), #d7d2cc);";
  };

  const reverseGradientBackground = () => {
    return isDarkMode
      ? "linear-gradient(to right, #434343, #000000);"
      : "linear-gradient(to right, #d7d2cc, rgb(69, 96, 117));";
  };

  useEffect(() => {
    if (inView) {
      setStartAnimation(true); // Trigger animation to start when in view
    }
  }, [inView]);

  useEffect(() => {
    fetch("http://localhost:5000/api/data/super-cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);


  const columns = [
    { field: "name", headerName: "Car Name", width: 180 , resizable: false },
    { field: "topSpeed", headerName: "Top Speed (km/h)", width: 180, resizable: false },
    {
      field: "acceleration",
      headerName: "Acceleration (0-100 km/h)",
      width: 260,
      resizable: false
    },
    { field: "horsepower", headerName: "Horsepower", width: 250, resizable: false },
    { field: "transmission", headerName: "Transmission", width: 180, resizable: false },
  ];

  const rows = cars.map((car, index) => ({
    id: index,
    name: car.name,
    topSpeed:
      JSON.parse(car.specs).find((spec) => spec.label === "Top Speed")?.value ||
      "N/A",
    acceleration:
      JSON.parse(car.specs).find((spec) => spec.label === "Acceleration")
        ?.value || "N/A",
    horsepower:
      JSON.parse(car.specs).find((spec) => spec.label === "Power")?.value ||
      "N/A",
    transmission:
      JSON.parse(car.specs).find((spec) => spec.label === "Transmission")
        ?.value || "N/A",
  }));

  const renderCarName = (carName) => {
    const words = carName.split(" ");
    const firstWord = words[0];
    const lastWord = words[words.length - 1];
    const restOfName = words.slice(1, words.length - 1).join(" ");

    return (
      <>
        <span style={{ fontWeight: "bold" }}>{firstWord}</span>{" "}
        {restOfName && <span>{restOfName}</span>}{" "}
        {lastWord && <span style={{ color: isDarkMode ? "#9B111E" : "red" }}>{lastWord}</span>}
      </>
    );
  };

  return (
    <ThemeProvider theme={detailTheme}>
      <Box
        ref={ref}
        className={`fade-in-container ${inView ? "fade-in" : ""}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          padding: "20px",
          background: getGradientBackground(),
        }}
      >
        <Box
          sx={{
            pt: 10,
            display: "flex",
            position: "fixed",
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1000,
          }}
        >
          <Typography
            variant="h2"
            color="inherit"
            component="div"
            className="mainTitle"
            sx={{
              pt: 2,
              position: "fixed",
              textAlign: "center",
              width: "100%",
            }}
          >
            Get to know more about the <span style={{ color: "red" }}> super</span> cars
          </Typography>
        </Box>
        <Box
          ref={ref}
          className={`fade-in-container ${inView ? "fade-in" : ""}`}
        >
          {cars.reverse().map((car, index) => (
            <Box
              key={index}
              sx={{
                position: "sticky",
                top: 0,
                height: "110vh",
                pt: 8,
                pb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: 1200,
                  margin: "auto",
                  borderRadius: 8,
                  boxShadow: 2,
                  backdropFilter: "blur(30px)",
                  background: reverseGradientBackground(),
                }}
              >
                <Paper
                  sx={{
                    elevation: 8,
                    borderRadius: 8,
                    height: "calc(77vh - 100px)",
                    border: 1,
                    borderColor: "gray",
                    background: "transparent",
                  }}
                >
                  {/* Top image (CardMedia) */}
                  <CardMedia
                    sx={{
                      height: "45%",
                      marginRight: "100px",
                      marginLeft: "100px",
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "100%",
                      borderLeft: 0.1,
                      borderRight: 0.1,
                      borderBottom: 10,
                      borderColor: "sliver",
                      transition: "0.5s",
                      '&:hover': {
                        scale: 1.1,
                        transition: "0.5s"
                      },
                    }}>
                    <iframe
                      allowFullScreen
                      mozallowfullscreen="true"
                      webkitallowfullscreen="true"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      src={car.imageUrl}
                      style={{
                        width: "90%", 
                        height: "100%", 
                        border: "none", 
                        borderRadius: "16px", 
                      }}
                    />
                  </CardMedia>


                  {/* Bottom content (CardContent) */}
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 2,
                    }}
                  >
                    {/* Car Name - Will scale towards the left on hover */}
                    <Typography
                      variant="h3"
                      sx={{
                        letterSpacing: 10,
                        m: 1,
                        opacity: 0.7,
                        fontWeight: "bold", 
                        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", 
                        "&:hover": {
                          opacity: 1, 
                        },
                      }}
                    >
                      {renderCarName(car.name)} 
                    </Typography>

                    {/* Car Description - Will scale towards the left on hover */}
                    <Typography
                      variant="body1"
                      sx={{
                        width: "90%",
                        fontSize: 16,
                        opacity: 0.7, 
                        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", 
                        "&:hover": {
                          opacity: 1, 
                        },
                      }}
                    >
                      {car.description}
                    </Typography>

                    {/* Car Specs - Will scale towards the left when hovered */}
                    <Typography
                      sx={{
                        pd: 5,
                        opacity: 0.7, 
                        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", 
                        "&:hover": {
                          opacity: 1, 
                        },
                      }}
                    >
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                        {JSON.parse(car.specs).map((spec, specIndex) => (
                          <li
                            key={specIndex}
                            style={{
                              margin: "10px 0",
                              fontSize: 16,
                              opacity: 0.7, 
                              transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", 
                              "&:hover": {
                                opacity: 1, 
                              },
                            }}
                          >
                            <strong style={{ color: isDarkMode ? "#9B111E" : "red" }}>{spec.label}:</strong> {spec.value}
                          </li>
                        ))}
                      </ul>
                    </Typography>
                  </CardContent>
                </Paper>
              </Card>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            pb:6,
          }}
        >
          <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "130vh",
                      height: "60vh",
                      background: reverseGradientBackground(),
                      borderRadius: "16px",
                      boxShadow: "8px 16px 30px rgba(0, 0, 0, 0.3)",
                    }}
                  >
            <Typography
              sx={{
                textAlign: "center",
                width: "100%",
                fontSize: "2rem",
                marginBottom: "50px",
              }}
            >
              <TypeAnimation
                cursor={false}
                sequence={[
                  "TOYOTA Super Cars (2010-2024)",
                  2000,
                ]}
                speed={60}
                repeat={0}
                wrapper="span"
                style={{ display: "inline-block" }}
                onChange={() => { }}
                start={startAnimation ? "typing" : "stop"}
              />
            </Typography>
            <Paper
              sx={{
                elevation: 8,
                borderRadius: 8,
                border: 1,
                borderColor: "gray",
              }}
            >
              <DataGrid
                sx={{
                  background: detailTheme.palette.dataGrid.background,
                  height: "100%",
                  width: "100%",
                  borderRadius: 8,
                  boxShadow: 2,
                  "& .MuiDataGrid-columnHeader:hover": {
                    backgroundColor: "gray",
                  }
                }}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Paper>
          </Box>
        </Box>
        <Box sx={{
          mt:9,
          width:"198vh",
        }}>
          <Footer isDarkMode={isDarkMode}/>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DetailedSuperCars;
