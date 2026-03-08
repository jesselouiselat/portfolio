import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Footer() {
  const navigation = [
    { name: "skills", href: "#skills" },
    { name: "projects", href: "#projects" },
    { name: "about Me", href: "#aboutMe" },
    { name: "contact", href: "#contact" },
  ];
  const external_links = [
    {
      website: "github",
      link: "https://github.com/jesselouiselat",
    },
    {
      website: "linkedin",
      link: "https://linkedin.com/in/jesselouiselat",
    },
  ];

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };
    const timer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#footer",
        start: "80% bottom",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(gsap.utils.toArray("#footer > .col-span-2, .col-span-3"), {
      y: 200,
      opacity: 0,
      duration: 0.8,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <>
      <div id="footer" className="grid grid-cols-5 p-8 bg-black">
        <div className="col-span-2">
          <h2 className=" font-semibold text-zinc-100">Menu</h2>
          <hr className="w-[90%] mb-2 text-zinc-100" />
          <ul>
            {navigation.map((item, id) => (
              <li key={id}>
                <a
                  href={item.href}
                  className=" capitalize text-zinc-100"
                  onClick={(e) => {
                    e.preventDefault;
                    gsap.to(window, {
                      scrollTo: item.href,
                      duration: 1,
                      ease: "expo.inOut",
                    });
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3 ">
          <div className="grid grid-rows-3 gap-15">
            <div className="row-span-2">
              <h2 className=" font-semibold text-zinc-100">Socials</h2>
              <hr className="w-[90%] mb-2 text-zinc-100" />
              <ul>
                {external_links.map((item, id) => (
                  <li key={id}>
                    {" "}
                    <a
                      href={item.link}
                      className=" capitalize text-zinc-100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.website}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="row-span-1">
              <div className="">
                <p className="mb-5 text-zinc-100">© 2026 JESSE LAT</p>
              </div>
              <p className=" font-semibold text-zinc-100">
                Current Philippine Time:
              </p>
              <p className="text-zinc-100">{time} </p>
            </div>
          </div>
        </div>
        <div className=" bottom-6">
          <button
            className="group flex items-center bg-zinc-900 text-zinc-600 p-5 rounded-3xl hover:bg-zinc-600 hover:text-zinc-900 transition-all duration-500 ease-in-out"
            onClick={() => {
              gsap.to(window, {
                duration: 2,
                scrollTo: { y: 0 },
                ease: "power4.inOut",
              });
            }}
          >
            <span className="md:text-4xl text-2xl font-dmsans">↑</span>

            <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 transition-all duration-500 ease-in-out text-lg font-dmsans font-medium">
              Back to Top
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
