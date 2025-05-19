import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Header from './component/Header';
import { styled } from '@mui/material/styles';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailedSuperCars from './pages/DetailedSuperCars';

const MainContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.background.default,
}));

function App() {
  // Check localStorage for saved theme preference
  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : true; // Default to dark mode if not found

  const [isDarkMode, setIsDarkMode] = useState(initialTheme);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme)); // Save the theme to localStorage
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode
          ? 'linear-gradient(to right, #000000,rgb(49, 49, 49));' 
          : 'linear-gradient(to right,rgb(69, 96, 117), #d7d2cc);',
        reverse: isDarkMode
          ? 'linear-gradient(to right, #434343, #000000);'
          : 'linear-gradient(to right, #d7d2cc, rgb(69, 96, 117));'
      },
      header: {
        default: isDarkMode
          ? 'rgba(255, 255, 255, 0)'
          : 'rgba(255, 255, 255, 0)',
        button: isDarkMode
          ? '#D9EAFD'
          : '#1B2430',
          reverse: isDarkMode
          ? '#1B2430'
          : '#D9EAFD'
      },
      textBackground: {
        default: isDarkMode
          ? "linear-gradient(to right, #232526, #414345);"
          : "linear-gradient(to right, #304352, #d7d2cc);"
      },
      text: {
        primary: isDarkMode ? '#fff' : '#000',
        secondary: isDarkMode ? '#ccc' : '#333'
      },
      Grid: {
        background: isDarkMode ? "dark" : "light",
      }
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#fff' : '#000',
          },
        },
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} theme={theme}/>
        <MainContainer>
          <Routes>
            <Route path="/" element={<Home theme={theme} isDarkMode={isDarkMode}/>} />
            <Route path="/detail" element={<DetailedSuperCars theme={theme} isDarkMode={isDarkMode}/>}/>
          </Routes>
        </MainContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
