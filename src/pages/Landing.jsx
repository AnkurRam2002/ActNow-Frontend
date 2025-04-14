import React from "react";
import Header from "../components/Header";
import About from "../components/About";
import LandingHome from "../components/LandingHome";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer"

const Landing = () => {
  return (
    <div>
      <Header />
      <LandingHome />
      <About />
      <Services />
      <Contact />
      <Footer />

    </div>
    
  );
}

export default Landing;
