import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

const Hero = () => {
  const videoref = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Configure GSAP for mobile performance
  useEffect(() => {
    if (isMobile) {
      gsap.config({ autoRound: false });
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
      });
    }
  }, [isMobile]);
  useGSAP(() => {
    // Mobile performance settings
    if (isMobile) {
      gsap.set("*", { force3D: true });
    }

    const heroSplit = new SplitText(".title", { type: "chars,words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      force3D: true, // Performance optimization
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
      force3D: true, // Performance optimization
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200, force3D: true }, 0)
      .to(".left-leaf", { y: -200, force3D: true }, 0);

    // Video animation with performance optimization
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoref.current.onloadedmetadata = () => {
      tl.to(videoref.current, {
        currentTime: videoref.current.duration,
        force3D: true, // Performance optimization
      });
    };
  }, [isMobile]);

  // Cleanup function for better memory management
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
          loading="lazy"
          decoding="async"
          style={{ transform: "translateZ(0)" }}
        />

        <img
          src="images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
          loading="lazy"
          decoding="async"
          style={{ transform: "translateZ(0)" }}
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
      <div className="video absolute inset-0">
        <video
          ref={videoref}
          src="/videos/output.mp4"
          muted
          playsInline
          preload={isMobile ? "metadata" : "auto"}
          {...(isMobile && {
            poster: "/images/video-poster.jpg" // Add if you have a poster image
          })}
          style={{ 
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden"
          }} 
        />
      </div>
    </>
  );
};
export default Hero;
