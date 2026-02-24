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
      <div className=" hidden md:block m-2">
        <ul className="flex flex-row gap-10 justify-center capitalize">
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
                className="navlinks font-medium"
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="block md:hidden m-5 justify-end">
        <button
          onClick={() => setNavIsOpen((prev) => !prev)}
          className="text-black"
        >
          Menu
        </button>
        {isNavOpen && (
          <ul className="flex flex-col gap-5 capitalize ">
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
                  className="navlinks font-medium"
                >
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
