import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../api/AxionInstance";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosInstance.get(
          "/portfolio/skills/skillsDetails",
        );
        setSkills(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (skills.length > 0) {
      document.fonts.ready.then(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".skills-panel",
            start: "top center",
            end: "bottom 10%",
            toggleActions: "play reverse restart reverse",
          },
        });
        skills.forEach((skill, i) => {
          tl.to(
            `.skills-details-${i}`,
            {
              duration: 1.3,
              scrambleText: {
                text: skill.details,
                chars: "01",
                speed: 0.5,
              },
            },
            "<",
          );
        });
        tl.to(
          ".skill",
          {
            duration: 1,
            scrambleText: {
              text: "Developer/\nDesigner",
              chars: "01",
              speed: 0.5,
            },
          },
          "<0.5",
        );
      });
    }
  }, [skills]);

  return (
    <div
      className="min-h-screen bg-zinc-950 flex flex-col justify-center md:grid grid-cols-12 gap-12 p-8 md:p-16 lg:p-24 selection:bg-zinc-200 selection:text-zinc-900"
      id="skills"
    >
      {/* Left Side: Header Section */}
      <div className="md:col-span-5 flex flex-col justify-center border-l border-zinc-800 pl-8 h-fit self-center">
        <span className="text-zinc-500 font-mono text-xs mb-4 tracking-[0.3em] uppercase">
          [ Core Skills]
        </span>

        <h1 className="skill text-zinc-100 font-dmsans text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
          Skills
        </h1>

        <div className="h-px w-24 bg-linear-to-r from-zinc-500 to-transparent"></div>
      </div>

      {/* Right Side: Skills Panel */}
      <div className="skills-panel md:col-span-7 flex flex-col justify-center gap-12 md:pl-12 border-l border-zinc-900">
        {skills.map((skill, id) => (
          <div className="group relative" key={id}>
            {/* Tool Label */}
            <h2 className="text-zinc-400 font-mono text-xl uppercase tracking-widest mb-2 group-hover:text-zinc-100 transition-colors duration-300">
              // {skill.tools}
            </h2>

            {/* Scramble Text Target */}
            <p
              className={`skills-details-${id} text-zinc-500 font-arimo text-xl md:text-lg leading-relaxed max-w-xl group-hover:text-zinc-300 transition-colors duration-500`}
            >
              {"_".repeat(24)}
            </p>

            {/* Decorative underline */}
            <div className="mt-8 h-px w-full bg-zinc-900 group-hover:bg-zinc-800 transition-all duration-700 overflow-hidden">
              <div className="h-full w-0 group-hover:w-full bg-zinc-400 transition-all duration-1000"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
