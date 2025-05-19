import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";

const StockValue = ({ theme }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  const { ref, inView } = useInView({
    triggerOnce: false, // Allow the chart to be loaded every time it's in view
    threshold: 0.8,
  });

  const [animationKey, setAnimationKey] = useState(0); // To reset animation when the component comes into view

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1); // Reset animation by changing the key
  },[inView])
  useEffect(() => {
    // Load chart data only when it's in view
    axios
      .get("http://localhost:5000/api/data/stock")
      .then((response) => {
        const data = response.data;

        if (data.length === 0) {
          console.log("No data available");
          return;
        }

        const years = data.map((item) => item.year);

        const stockValues = data.map((item) => {
          const valueString = item.stock_value;
          const value = parseFloat(valueString.replace(" billion", "").trim());
          return value * 1e9;
        });

        setChartData({
          series: [
            {
              name: "TOYOTA Stock Value",
              data: stockValues,
            },
          ],
          options: {
            chart: {
              height: 350,
              type: "line",
              background: theme.palette.background.default,
              animations: {
                enabled: true,
                speed: 800,
                animateGradually: {
                  enabled: true,
                  delay: 6000,
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350,
                },
              },
            },
            title: {
              text: "Toyota Stock Market Value (2010-2024)",
              align: "center",
              style: {
                color: theme.palette.text.primary,
              },
            },
            xaxis: {
              categories: years,
              title: {
                text: "Year",
                style: { color: theme.palette.text.primary },
              },
              labels: {
                style: { colors: theme.palette.text.primary },
              },
            },
            yaxis: {
              title: {
                text: "Market Value (USD)",
                style: { color: theme.palette.text.primary },
              },
              labels: {
                style: { colors: theme.palette.text.primary },
                formatter: (value) => `$${(value / 1e9).toFixed(2)}B`,
              },
            },
            stroke: { width: 2, curve: "smooth" },
            markers: { size: 5 },
            legend: {
              position: "top",
              horizontalAlign: "center",
              labels: {
                colors: theme.palette.text.primary,
              },
            },
            grid: {
              borderColor: theme.palette.divider,
            },
            tooltip: {
              theme: theme.palette.mode === "dark" ? "dark" : "light",
            },
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [inView,theme]);

  return (
    <div id="stockValue">
      <Box
        ref={ref}
        className={`fade-in-container ${inView ? "fade-in" : ""}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "150vh",
          padding: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "60vh",
            background: "transparent",
            borderRadius: "16px",
            boxShadow: "8px 16px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ marginBottom: 2, color: theme.palette.text.primary }}
          >
            <TypeAnimation
              cursor={false}
              key={animationKey} // Trigger animation restart by changing the key
              sequence={[
                "TOYOTA Stock Market Value (2010-2024)", // Text to animate
                2000, // Duration of first sequence
              ]}
              speed={60} // Speed of typing effect
              repeat={0} // Number of times to repeat
              wrapper="span"
              style={{ display: "inline-block" }}
            />
          </Typography>
          <Typography
            align="center"
            sx={{
              marginBottom: 3,
              fontSize: "1rem",
              color: theme.palette.text.secondary,
            }}
          >
            <TypeAnimation
              cursor={false}
              key={animationKey} // Trigger animation restart by changing the key
              sequence={[
                "This chart shows the stock market value of Toyota (in billions of USD) from 2010 to 2024.",
                2000,
              ]}
              speed={80}
              repeat={0}
              wrapper="span"
              style={{ display: "inline-block" }}
            />
          </Typography>

          {inView && (
            <Box
              sx={{
                width: "100%",
                maxWidth: 1200,
                margin: "0 auto",
                padding: 2,
              }}
            >
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
              />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default StockValue;
