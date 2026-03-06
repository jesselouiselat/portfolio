import { useState } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import gsap from "gsap";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const [isNavOpen, setNavIsOpen] = useState(false);

  const navigation = [
    { name: "skills", href: "#skills" },
    { name: "projects", href: "#projects" },
    { name: "about Me", href: "#aboutMe" },
    { name: "contact", href: "#contact" },
  ];

  return (
    <>
      <div className="  p-5">
        <ul className="flex flex-row md:gap-10 gap-4 justify-center capitalize">
          {navigation.map((item, index) => (
            <li key={index}>
              <p
                onClick={(e) => {
                  e.preventDefault();
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: item.href,
                    ease: "power2.inOut",
                  });
                }}
                className="navlinks md:font-medium"
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
