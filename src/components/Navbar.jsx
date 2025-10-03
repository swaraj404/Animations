import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { navLinks } from "../../constants/index.js"
import { use } from "react"
import { ScrollTrigger } from "gsap/all"
import { useRef } from "react"

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",}
    });
    navTween.fromTo("nav", {
    backgroundColor: "rgba(0,0,0,0)",
    backdropFilter: "blur(0px) saturate(100%)",
    WebkitBackdropFilter: "blur(0px) saturate(100%)", // Safari
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  },
  {
    backgroundColor: "rgba(0,0,0,0.30)",              // ~#0000004D
    backdropFilter: "blur(8px) saturate(160%)",
    WebkitBackdropFilter: "blur(8px) saturate(160%)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    duration: 0.6,
    ease: "power2.out",
  });
    })

  return (
     <nav>
      <div> 
        <a href ="home" className="flex items-center gap-2">
            <img src="images/logo.png" alt="logo" />
            <p>Velvet Pour</p>
        </a>
        <ul>
            {navLinks.map((link) => (/* Changed parameter name to link */
                <li key={link.id}>
                    <a href={`#${link.id}`}>{link.title}</a> 
                </li>
            ))}
        </ul>
      </div>
    </nav>
  )
}
export default Navbar