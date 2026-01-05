import React, { useState, useEffect, useRef } from "react";

import Portfolio from "./pages/Portfolio";
import { incrementViewCount } from "./firebase/services";

const App: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double-counting in React Strict Mode (Dev)
    if (!initialized.current) {
      initialized.current = true;

      // Optional: Don't count  own localhost visits
      if (window.location.hostname !== "localhost") {
         incrementViewCount();
      }
    }
  }, []);
  return <Portfolio />;
};

export default App;
