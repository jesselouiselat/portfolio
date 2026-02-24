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
      <div id="footer" className="grid grid-cols-5 p-8">
        <div className="col-span-2">
          <h2 className=" font-semibold">Menu</h2>
          <hr className="w-[90%] mb-2" />
          <ul>
            {navigation.map((item, id) => (
              <li key={id}>
                <a
                  href={item.href}
                  className=" capitalize"
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
              <h2 className=" font-semibold">Socials</h2>
              <hr className="w-[90%] mb-2" />
              <ul>
                {external_links.map((item, id) => (
                  <li key={id}>
                    {" "}
                    <a href={item.link} className=" capitalize">
                      {item.website}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="row-span-1">
              <p className=" font-semibold">Current Philippine Time:</p>
              <p>{time} </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
