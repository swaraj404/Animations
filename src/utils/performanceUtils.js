// Performance utilities for mobile optimization

export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getOptimizedAnimationConfig = (isMobile, prefersReducedMotion) => {
  if (prefersReducedMotion) {
    return {
      duration: 0.01,
      ease: "none",
      stagger: 0,
    };
  }
  
  if (isMobile) {
    return {
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.04,
    };
  }
  
  return {
    duration: 1.8,
    ease: "expo.out",
    stagger: 0.06,
  };
};

export const getMobileVideoConfig = () => {
  return {
    preload: "none",
    poster: "/images/hero-placeholder.jpg",
    disableControls: true,
    quality: "low",
  };
};

export const getScrollTriggerConfig = (isMobile) => {
  return {
    scrub: isMobile ? 2 : true,
    pin: !isMobile,
    anticipatePin: !isMobile ? 1 : 0,
    refreshPriority: isMobile ? -1 : 0,
  };
};

// Throttle function for scroll events
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Debounce function for resize events
export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Performance monitoring
export const performanceMonitor = {
  marks: {},
  
  mark(name) {
    this.marks[name] = performance.now();
  },
  
  measure(name, startMark) {
    if (this.marks[startMark]) {
      const duration = performance.now() - this.marks[startMark];
      console.log(`${name}: ${duration.toFixed(2)}ms`);
      return duration;
    }
  },
  
  clearMarks() {
    this.marks = {};
  }
};
