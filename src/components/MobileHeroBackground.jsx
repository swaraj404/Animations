import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const MobileHeroBackground = () => {
  useGSAP(() => {
    // Smooth scrolling animation for mobile
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Animate the background layers
          gsap.set('.mobile-bg-layer-1', {
            y: progress * 30,
            opacity: 0.4 + (progress * 0.4),
          });
          
          gsap.set('.mobile-bg-layer-2', {
            y: progress * 20,
            scale: 0.98 + (progress * 0.02),
            opacity: 0.6 + (progress * 0.3),
          });
          
          gsap.set('.mobile-bg-layer-3', {
            y: progress * 10,
            rotation: progress * 2,
            opacity: 0.3 + (progress * 0.5),
          });
        }
      }
    });
  }, []);

  return (
    <div className="mobile-hero-background">
      {/* Layer 1 - Base background */}
      <div className="mobile-bg-layer-1">
        <div className="gradient-bg"></div>
      </div>
      
      {/* Layer 2 - Image overlay */}
      <div className="mobile-bg-layer-2">
        <img 
          src="/images/under-img.jpg" 
          alt="Cocktail background" 
          className="mobile-hero-image"
        />
      </div>
      
      {/* Layer 3 - Animated elements */}
      <div className="mobile-bg-layer-3">
        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div>
      </div>
    </div>
  );
};

export default MobileHeroBackground;
