import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { cocktailLists } from "../../constants";
import { mockTailLists } from "../../constants";

const Cocktails = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const prefersReducedMotion = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });

    useGSAP(() => {
        if (prefersReducedMotion || isMobile) {
            // Disable parallax on mobile and for users who prefer reduced motion
            return;
        }

        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#cocktails",
                start: "top 30%",
                end: "bottom 80%",
                scrub: 1.5,
            },
        });

        parallaxTimeline
            .to("#c-left-leaf", { x: -100, y: 100 })
            .to("#c-right-leaf", { x: 100, y: 100 });
    }, [isMobile, prefersReducedMotion]);
  return (
    <section id="cocktails" className="noisy">
        <img 
            src="images/cocktail-left-leaf.png" 
            alt="l-leaf" 
            id="c-left-leaf"
            loading="lazy"
        />
        <img 
            src="images/cocktail-right-leaf.png" 
            alt="r-leaf" 
            id="c-right-leaf"
            loading="lazy"
        />

        <div className="list">
            <div className="popular">
                <h2>Most Popular Cocktails:</h2>
                <ul>
                   {cocktailLists.map(({ name , country, detail, price})=>(
                    <li key={name}>
                        <div className="md:me-28">
                            <h3>{name}</h3>
                            <p>{country} | {detail}</p>
                        </div>
                        <span>-{price}</span>
                    </li>
                   ))}
                </ul>
            </div>
            <div className="loved">
                <h2>Most Loved Mocktails:</h2>
                <ul>
                   {mockTailLists.map(({ name , country, detail, price})=>(
                    <li key={name}>
                        <div className="me-28">
                            <h3>{name}</h3>
                            <p>{country} | {detail}</p>
                        </div>
                        <span>-{price}</span>
                    </li>
                   ))}
                </ul>
            </div>
        </div>
    </section>
    );};

export default Cocktails;
