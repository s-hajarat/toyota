import React from "react";
import { Box, Typography } from "@mui/material";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from "react-router";

function Footer({ isDarkMode }) {
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            header: {
                default: isDarkMode
                    ? 'rgba(255, 255, 255, 0)'
                    : 'rgba(255, 255, 255, 0)',
                button: isDarkMode
                    ? '#D9EAFD'
                    : '#1B2430'
            },
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.header.default,
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: 0.1,
                    borderColor: "sliver",
                }}
            >
                {/* Left Section: Logo and Name */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        flexDirection: "column",
                        alignItems: "center",
                        flexGrow: 0,
                        flexBasis: "auto",
                    }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <img
                        src="https://res.cloudinary.com/db2zh3co5/image/upload/v1738681705/tvyik21uq3kwebrdmbbb.png"
                        alt="Toyota Logo"
                        style={{
                            width: "80px",
                            height: "auto",
                            marginRight: "8px",
                        }} />
                    <Typography sx={{
                        color: isDarkMode ? "#9B111E" : "red",
                        fontWeight: "bold",
                        pr: 1,
                    }}>
                        TOYOTA
                    </Typography>
                </Box>

                {/* Middle Section: Navigation Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexGrow: 1,
                        flexBasis: "auto",
                        backgroundColor: (theme) => theme.palette.header.default,
                        pl: 25,
                    }}
                >
                    <Typography sx={{
                        color: (theme) => theme.palette.header.button,
                        padding: "10px",
                        pr: 13,
                    }}>
                        Toyota Motor Corporation retains all rights to its trademarks, logos, vehicles, and related data
                    </Typography>

                </Box>

                {/* Right Section: Credit */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "top",
                        flexGrow: 0,
                        flexBasis: "auto",
                    }}>
                    <Box sx={{

                    }}>
                        <Typography sx={{
                            color: (theme) => theme.palette.header.button,
                            padding: "10px",
                        }}>
                            Credit: Sanad & Issa
                        </Typography>
                        <Typography sx={{
                            color: (theme) => theme.palette.header.button,
                            pl: 5,
                        }}>
                            © 2025 PSUT
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>

    );
}

export default Footer;
