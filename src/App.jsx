import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/Home";
import CustomBowl from "./pages/CustomBowl";
import Menu from "./pages/Menu";
import "@fontsource/poppins";
import "@fontsource/inter";
import "./styles/App.scss";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <ThemeToggle />
          <main style={{ width: "100%", flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/custom-bowl" element={<CustomBowl />} />
              <Route path="/menu" element={<Menu />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
