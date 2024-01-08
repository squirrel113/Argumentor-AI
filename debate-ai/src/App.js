import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/pages/Components/Header";
import HomePage from "../src/pages/Home";
import DebatePage from "../src/pages/Debate";
import Contact from "../src/pages/Contact";
import EviFinder from "./pages/Evifinder";
import SignIn from "./pages/Components/SignIn";

function App() {
  return (
    <Router>
      {/* Check if there are no nested routers here */}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/debate" element={<DebatePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/evifinder" element={<EviFinder />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
