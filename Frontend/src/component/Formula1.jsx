import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Slider } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";

const Formula1 = ({ theme }) => {
  const [imageFilter, setImageFilter] = useState("none");
  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
  });
  const [audioState, setAudioState] = useState({
    playing: false,
    volume: 1,
  });
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.8,
  });
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [inView]);

  const handleVideoControl = (action) => {
    if (action === "play") {
      videoRef.current.play();
      setVideoState({ ...videoState, playing: true });
    } else if (action === "pause") {
      videoRef.current.pause();
      setVideoState({ ...videoState, playing: false });
    } else if (action === "mute") {
      setVideoState({ ...videoState, muted: !videoState.muted });
    }
  };

  const handleAudioControl = (action, value) => {
    if (action === "play") {
      audioRef.current.play();
      setAudioState({ ...audioState, playing: true });
    } else if (action === "pause") {
      audioRef.current.pause();
      setAudioState({ ...audioState, playing: false });
    } else if (action === "volume") {
      audioRef.current.volume = value;
      setAudioState({ ...audioState, volume: value });
    }
  };

  const applyImageFilter = (filterType) => {
    setImageFilter(filterType === imageFilter ? "none" : filterType);
  };

  return (
    <div id="formula1">
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
            alignItems: "center",
            width: "100%",
            padding: 3,
            background: theme.palette.background.paper,
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
              key={animationKey}
              sequence={[
                "Toyota in Formula 1: Racing Heritage",
                2000,
              ]}
              speed={60}
              repeat={0}
            />
          </Typography>

          <Box sx={{ display: "flex", gap: 4, width: "100%", flexWrap: "wrap" }}>
            {/* Video Section */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <video
                ref={videoRef}
                src="f1-video.mp4"
                muted={videoState.muted}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={() => handleVideoControl(videoState.playing ? "pause" : "play")}
                >
                  {videoState.playing ? "Pause" : "Play"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleVideoControl("mute")}
                >
                  {videoState.muted ? "Unmute" : "Mute"}
                </Button>
              </Box>
            </Box>

            {/* Audio Section */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <audio ref={audioRef} src="f1-engine.mp3" />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Slider
                  value={audioState.volume}
                  onChange={(e, value) => handleAudioControl("volume", value)}
                  min={0}
                  max={1}
                  step={0.1}
                  sx={{ width: "100%" }}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleAudioControl(audioState.playing ? "pause" : "play")}
                  >
                    {audioState.playing ? "Pause" : "Play Engine Sound"}
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Image Section */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <img
                src="f1-car.jpg"
                alt="F1 Car"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  filter: imageFilter === "none" ? "none" :
                    imageFilter === "monochrome" ? "grayscale(100%) contrast(150%)" :
                    "grayscale(100%)",
                  transition: "filter 0.3s ease",
                }}
              />
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => applyImageFilter("monochrome")}
                >
                  Monochrome
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => applyImageFilter("grayscale")}
                >
                  Grayscale
                </Button>
              </Box>
            </Box>
          </Box>

          <Typography
            sx={{
              mt: 3,
              color: theme.palette.text.secondary,
              textAlign: "center",
            }}
          >
            <TypeAnimation
              key={animationKey}
              sequence={[
                "Experience Toyota's Formula 1 legacy through interactive media controls and filters.",
                2000,
              ]}
              speed={90}
              repeat={0}
            />
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Formula1;