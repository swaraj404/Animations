import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { use, useRef, useState, useEffect } from "react";
import { toQuery, useMediaQuery } from "react-responsive";
import SimpleMobileBackground from "./SimpleMobileBackground";

const Hero = () => {
  const videoref = useRef();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const prefersReducedMotion = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });

  useGSAP(() => {
    // Simplified animations for mobile and reduced motion
    if (prefersReducedMotion) {
      gsap.set(".title", { opacity: 1 });
      gsap.set(".subtitle", { opacity: 1 });
      return;
    }

    const heroSplit = new SplitText(".title", { type: "chars,words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    // Reduce animation complexity on mobile
    const animationDuration = isMobile ? 1.2 : 1.8;
    const staggerAmount = isMobile ? 0.04 : 0.06;

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: animationDuration,
      ease: isMobile ? "power2.out" : "expo.out",
      stagger: staggerAmount,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: animationDuration,
      ease: isMobile ? "power2.out" : "expo.out",
      stagger: staggerAmount,
      delay: isMobile ? 0.6 : 1,
    });

    // Simplified parallax for mobile
    if (!isMobile) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(".right-leaf", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0);
    }

    // Desktop video animation only
    if (videoLoaded && !isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "video",
          start: "center 60%",
          end: "bottom top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (videoref.current) {
        tl.to(videoref.current, {
          currentTime: videoref.current.duration,
        });
      }
    }
  }, [videoLoaded, isMobile, prefersReducedMotion]);

  useEffect(() => {
    const video = videoref.current;
    if (video) {
      const handleLoadedMetadata = () => {
        setVideoLoaded(true);
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Preload video only on desktop
      if (!isMobile) {
        video.load();
      }

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [isMobile]);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
          loading="eager"
        />

        <img
          src="images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
          loading="eager"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crips. Clasic</p>
              <p className="subtitle">
                Sip the Spirit <br />
                of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes --designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
        
      </section>
      
      {/* Desktop Video */}
      {!isMobile && (
        <div className="video absolute inset-0">
          <video
            ref={videoref}
            src="/videos/output.mp4"
            muted
            playsInline
            preload="auto"
            className="will-change-transform"
          />
        </div>
      )}
      
      {/* Mobile Alternative Background */}
      {isMobile && <SimpleMobileBackground />}
    </>
  );
};
export default Hero;
