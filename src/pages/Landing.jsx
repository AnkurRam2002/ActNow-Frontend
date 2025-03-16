import React from "react";
import Header from "../components/Header";
import About from "../components/About";
import Home from "../components/Home";
import Services from "../components/Services";
import Contact from "../components/Contact";

const Landing = () => {
  return (
    <div>
      <Header />
      <Home />
      <About />
      <Services />
      <Contact />

    </div>
    
  );
}

export default Landing;
