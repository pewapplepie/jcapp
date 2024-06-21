import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header jeffreychenhaColor="text-blue" />
        <div className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
