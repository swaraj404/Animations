import gsap from "gsap";
import { ScrollTrigger,SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { navLinks } from "/home/swaraj/Practice/Animations/LandingPage/constants";
import React from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
   <main>
    <Navbar/>
    <Hero/>
    <div className="h-dvh bg-black"/>
   </main>

  );
};

export default App;