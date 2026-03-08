import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import gsap from "gsap";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
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
                className="font-dmsans text-zinc-400 md:font-medium hover:text-xl hover:text-zinc-600 transition-all"
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
