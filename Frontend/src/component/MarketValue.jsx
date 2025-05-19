import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";

const MarketValue = ({ theme }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.8,
  });

  const [animationKey, setAnimationKey] = useState(0); // To reset animation when the component comes into view

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  },[inView])
  useEffect(() => {
     // Reset animation by changing the key
    axios
      .get("http://localhost:5000/api/data/market")
      .then((response) => {
        const data = response.data;

        if (data.length === 0) {
          console.log("No data available");
          return;
        }

        const years = data.map((item) => item.year);
        const toyota_2000gt = data.map((item) => item.toyota_2000gt);
        const toyota_supra_a60 = data.map((item) => item.toyota_supra_a60);
        const toyota_mr2_turbo = data.map((item) => item.toyota_mr2_turbo);
        const toyota_gr_supra = data.map((item) => item.toyota_gr_supra);
        const toyota_trueno_ae86 = data.map((item) => item.toyota_trueno_ae86);

        setChartData({
          series: [
            { name: "TOYOTA 2000GT", data: toyota_2000gt },
            { name: "TOYOTA Supra A60", data: toyota_supra_a60 },
            { name: "TOYOTA MR2 Turbo", data: toyota_mr2_turbo },
            { name: "TOYOTA GR Supra", data: toyota_gr_supra },
            { name: "TOYOTA Trueno AE86", data: toyota_trueno_ae86 },
          ],
          options: {
            chart: {
              height: 350,
              type: "bar",
              background: theme.palette.background.default,
            },
            title: {
              text: "TOYOTA Cars Market Value Increase Over the Last 10 Years",
              align: "center",
              style: {
                color: theme.palette.text.primary,
              },
            },
            xaxis: {
              categories: years,
              title: {
                text: "Anuall Increase in Price",
                style: { color: theme.palette.text.primary },
              },
            },
            yaxis: {
              logarithmic: false,
              title: {
                text: "Market Value (%)",
                style: { color: theme.palette.text.primary },
              },
              labels: {
                style: { color: theme.palette.text.primary },
                formatter: (value) => `${value.toLocaleString()}%`,
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
    <div id="marketValue">
      <Box
        ref={ref}
        className={`fade-in-container ${inView ? "fade-in" : ""}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "160vh",
          padding: 3,
          backgroundColor: theme.palette.background.default,
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
            sx={{
              marginBottom: 2,
              color: theme.palette.text.primary,
            }}
          >
            <TypeAnimation
              cursor={false}
              key={animationKey} // Trigger animation restart by changing the key
              sequence={[
                "Toyota Super Cars Market Value (2015-2025)", // Text to animate
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
                "This chart shows the market value of various TOYOTA super cars over the last 10 years. The data is sourced from the TOYOTA super cars fanbase.",
                2000,
              ]}
              speed={90}
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
                type="bar"
                height={350}
              />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default MarketValue;
