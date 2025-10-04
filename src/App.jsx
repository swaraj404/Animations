import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { navLinks } from "../constants";
import React, { useEffect } from "react";
import Cocktails from "./components/Cocktails";
import About from "./components/About";
import Art from "./components/Art";
import Menu from "./components/Menu";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  useEffect(() => {
    // Mobile performance optimizations
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
      // Optimize GSAP for mobile
      gsap.config({
        force3D: true,
        nullTargetWarn: false,
      });
      
      // Reduce ScrollTrigger refresh rate on mobile
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
        ignoreMobileResize: true,
      });
    }

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="will-change-scroll">
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu />
      <Contact />
    </main>
  );
};

export default App;