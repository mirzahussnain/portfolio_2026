import React, { useState, useEffect, useRef } from "react";

import Portfolio from "./pages/Portfolio";
import { incrementViewCount } from "./firebase/services";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

const App: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double-counting in React Strict Mode (Dev)
    if (!initialized.current) {
      initialized.current = true;

     const unsubscribe = onAuthStateChanged(auth, (user) => {
        const isLocalhost = window.location.hostname === "localhost";
        const isAdmin = !!user; // If a user exists, it is Admin.

        // Only count if: NOT localhost AND NOT admin
        if (!isLocalhost && !isAdmin) {
          incrementViewCount();
        }
        
        // We only need to check this once on load, so we unsubscribe immediately
        unsubscribe();
      });
    
    }
  }, []);
  return <Portfolio />;
};

export default App;
