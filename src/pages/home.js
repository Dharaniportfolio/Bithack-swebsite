import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Tracks from "../components/tracks";
import Timeline from "../components/Timeline";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import About from "../components/About";
import Login from "../pages/login";
import Domain from "../pages/domain";
import ProblemStatements from "./problemstatement";
import ProblemDetail from "./problemdetail";
import RegistrationPage from "./registration page";

function Home({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/domain" element={<Domain />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<Content />} />
        <Route path="/problems/:domain" element={<ProblemStatements />} />
        <Route path="/problem-statements/:domain/:problemCode" element={<ProblemDetail />} />
        <Route path="/register/:domain/:problemCode" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
}

function Content() {
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

export default Home;
