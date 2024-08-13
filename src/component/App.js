// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Tracks from "./tracks";
import Timeline from "./Timeline";
import Faq from "./Faq";
import Contact from "./Contact";
import Login from "./login";
import About from "./About";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <div id="about">
        <About />
      </div>
      <div id="track">
        <Tracks />
      </div>
      <div id="time">
        <Timeline />
      </div>
      <div id="faq">
        <Faq />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

export default App;
