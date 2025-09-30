import gsap from "gsap";
import { ScrollTrigger,SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { navLinks } from "/home/swaraj/Practice/Animations/LandingPage/constants";
import React from "react";
import Cocktails from "./components/Cocktails";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
   <main>
    <Navbar/>
    <Hero/>
    <Cocktails/>
   </main>

  );
};

export default App;