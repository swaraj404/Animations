import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { featureLists, goodLists } from "../../constants";
import React from "react";

const Art = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const prefersReducedMotion = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });
    
    useGSAP(() => {
        if (prefersReducedMotion) {
            gsap.set('.will-fade', { opacity: 1 });
            gsap.set('.masked-img', { maskSize: "400%", scale: 1.3 });
            gsap.set('#masked-content', { opacity: 1 });
            return;
        }

        const start = isMobile ? "top 30%" : "top top";
        const scrubValue = isMobile ? 2.5 : 1.5;
        const shouldPin = !isMobile;

        const maskTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#art",
                start: start,
                end: isMobile ? "bottom 20%" : "bottom center",
                scrub: scrubValue,
                pin: shouldPin,
                anticipatePin: shouldPin ? 1 : 0,
                refreshPriority: isMobile ? -1 : 0,
            },
        });

        // Simplified animation sequence for mobile
        if (isMobile) {
            maskTimeline
                .to('.will-fade', { opacity: 0, stagger: 0.1, ease: "power1.inOut" }, 0)
                .to('.masked-img', { 
                    maskPosition: "center", 
                    scale: 1.2, 
                    maskSize: "300%", 
                    duration: 0.8, 
                    ease: "power1.inOut" 
                }, 0.3)
                .to('#masked-content', { opacity: 1, duration: 0.6, ease: "power1.inOut" }, 0.8);
        } else {
            maskTimeline
                .to('.will-fade', { opacity: 0, stagger: 0.2, ease: "power1.inOut" })
                .to('.masked-img', { 
                    maskPosition: "center", 
                    scale: 1.3, 
                    maskSize: "400%", 
                    duration: 1, 
                    ease: "power1.inOut" 
                })
                .to('#masked-content', { opacity: 1, duration: 1, ease: "power1.inOut" });
        }
    }, [isMobile, prefersReducedMotion]);
  return (
    <div id="art">
        <div className="container mx-auto h-full pt-20">
            <h2 className="will-fade">The Art</h2>
            <div className="content">
                <ul className="space-y-4 will-fade">
                    {goodLists.map((feature,index)=>(
                        <li key={index} className="flex items-start gap-2">
                            <img src="/images/check.png" alt="check"/>
                            <p>{feature}</p>
                        </li>
                    ))}
                </ul>
                <div className="cocktail-img">
                    <img 
                        src="/images/under-img.jpg" 
                        alt="cocktail" 
                        className="abs-center masked-img size-full object-contain will-change-transform"
                        loading="lazy"
                    />
                </div>

                <ul className="space-y-4 will-fade">
                    {featureLists.map((feature,index)=>(
                        <li key={index} className="flex items-center justify-start gap-2">
                            <img src="/images/check.png" alt="check"/>
                            <p className="md:w-fit w-60">{feature}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="masked-container">
                    <h2 className="will-fade">Sip-Worthy Perfection</h2>
                    <div id="masked-content">
                        <h3>Made with Craft, Poured with Passion</h3>
                        <p>This isn't just a drink. It's a carefully crafted moment just for you.</p>
                    </div>
            </div>
        </div>
    </div>
  );
};

export default Art;
