import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import axiosInstance from "../api/AxionInstance";
import { useEffect, useState, useRef } from "react";
import jesse_lat from "../assets/img/jesse_lat_grad_pic.jpg";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutMe() {
  const [aboutMe, setAboutMe] = useState([]);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosInstance.get(
          "/portfolio/hero/aboutMeDetails",
        );
        setAboutMe(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (aboutMe.length === 0) return;
    document.fonts.ready.then(() => {
      let ctx = gsap.context(() => {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.8, clipPath: "inset(100% 0% 100% 0%)" },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play reverse restart reverse",
            },
          },
        );

        const split = new SplitText(".about-text", { type: "lines" });
        gsap.from(split.lines, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
            toggleActions: "play reverse restart reverse",
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });
  }, [aboutMe]);

  return (
    <section
      ref={sectionRef}
      id="aboutMe"
      className="min-h-screen bg-zinc-950 flex flex-col md:flex-row items-center justify-center px-6 py-24 md:px-20 gap-12 overflow-hidden"
    >
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div className="relative w-64 h-64 md:w-112.5 md:h-137.5 overflow-hidden rounded-2xl shadow-2xl border border-zinc-800">
          <img
            ref={imageRef}
            src={jesse_lat}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            alt="Jesse Lat"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <div className="  ">
          <span className="text-zinc-500 text-lg tracking-[0.3em] font-medium">
            jesse_lat
          </span>
          <div className="h-0.5 w-full mt-2 bg-linear-to-r from-zinc-500 to-transparent"></div>
        </div>
        {aboutMe.map((details, id) => (
          <div key={id}>
            <div className="">
              <p
                className="about-text text-zinc-400 text-lg md:text-2xl leading-relaxed font-light"
                key={id}
              >
                {details.additional_details.aboutMe}
              </p>
            </div>

            <div className="pt-8 flex gap-5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  gsap.to(window, {
                    scrollTo: "#contact",
                    duration: 1,
                    ease: "power4.out",
                  });
                }}
                className="group text-zinc-400 flex items-center gap-4 text-lg hover:text-white transition-colors"
              >
                <span className="w-12 h-px bg-zinc-700 group-hover:w-16 group-hover:bg-white transition-all"></span>
                Get in touch
              </button>
              <a
                href={details.additional_details.resume}
                download="Jesse_Louise_Lat_CV.pdf"
                rel="noopener noreferrer"
                target="blank"
                className="group flex items-center gap-3 w-fit px-6 py-3 border border-zinc-800 bg-zinc-900 text-zinc-400 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-300 font-mono text-sm"
              >
                <span className="group-hover:translate-y-1 transition-transform duration-500">
                  ↓
                </span>
                Download CV
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
