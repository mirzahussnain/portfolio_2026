import React, { useState, useEffect } from "react";
import { ViewState } from "./types";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import SignIn from "./pages/SignIn";
import Portfolio from "./pages/Portfolio";

const App: React.FC = () => {

  return <Portfolio />;
};

export default App;
