import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AdminProvider } from "./context/AdminContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import GamePage from "./pages/GamePage";
import NewProjectPage from "./pages/NewProjectPage";
import AdminPanel from "./pages/AdminPanel";

function AppContent() {
  const { isDarkMode } = useTheme();

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
        <Route path="/projects" element={<Projects />} />
        <Route path="/blogs" element={<Navigate to="/projects" replace />} />
        <Route path="/cv" element={<Navigate to="/about" replace />} />
        <Route path="/rust_gameoflife" element={<GamePage />} />
        <Route path="/new_project" element={<NewProjectPage />} />
        <Route path="/admin" element={<AdminPanel />} />
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
      <AdminProvider>
        <Router basename={baseName}>
          <AppContent />
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
