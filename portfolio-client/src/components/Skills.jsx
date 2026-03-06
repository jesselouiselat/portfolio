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
      className="h-screen bg-black flex flex-col justify-center md:grid grid-cols-4 gap-9 p-9"
      id="skills"
    >
      {/* Section title */}
      <div className="md:flex items-center justify-end col-span-2 col-start-1">
        <h1 className="skill color-dirtyWhite font-dmsans text-7xl">Skills</h1>
      </div>
      {/* Skills details */}

      <div className="skills-panel flex flex-col justify-center col-span-2 col-start-3 gap-9 md:ml-9">
        {skills.map((skill, id) => (
          <div className="" key={id}>
            <h2 className="color-dirtyWhite font-arimo">{skill.tools}</h2>
            <p className={`skills-details-${id} color-lightGray`}>
              {skill.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
