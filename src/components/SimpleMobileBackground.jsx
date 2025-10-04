import React, { useEffect, useRef } from 'react';

const SimpleMobileBackground = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    // Ultra-lightweight scroll effect for mobile
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.3;
        const opacity = Math.max(0.4, 1 - scrolled * 0.001);
        
        // Only transform if necessary to avoid unnecessary repaints
        if (scrolled < 500) {
          bgRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
          bgRef.current.style.opacity = opacity;
        }
      }
    };

    // Throttled scroll listener for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <div ref={bgRef} className="simple-mobile-bg">
      {/* Static background image with CSS animations only */}
      <div className="bg-layer bg-layer-1">
        <img 
          src="/images/under-img.jpg" 
          alt="Cocktail background" 
          className="mobile-static-image"
          loading="eager"
        />
      </div>
      
      {/* Animated overlay for visual interest */}
      <div className="bg-layer bg-layer-2">
        <div className="animated-overlay"></div>
      </div>
      
      {/* Floating particles for elegance */}
      <div className="bg-layer bg-layer-3">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </div>
  );
};

export default SimpleMobileBackground;
