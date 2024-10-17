import React, { useState } from "react";
import Home from "./pages/home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStaff, setIsStaff] = useState(false);  // State to track if the user is staff

  return (
    <div className="App">
      <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isStaff={isStaff} setIsStaff={setIsStaff} />
    </div>
  );
}

export default App;
