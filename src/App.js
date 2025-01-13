import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext"; // Import ThemeProvider and useTheme
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Experience from "./pages/Experience";
import GamePage from "./pages/GamePage";

function AppContent() {
  const { isDarkMode } = useTheme(); // Access isDarkMode from context

  return (
    <div
      className={`App flex flex-col h-auto ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/cv" element={<Experience />} />
        <Route path="/rust_gameoflife" element={<GamePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  const baseName = process.env.NODE_ENV === "production" ? "/jcapp" : "";

  return (
    <ThemeProvider>
      <Router basename={baseName}>
        <AppContent /> {/* Separate component to use useTheme */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
