import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function Skills() {
  const skills = [
    {
      title: "Programming Languages",
      tools: "JavaScript, PHP, HTML/CSS",
      details:
        "Built interactive frontends and dynamic backends using JavaScript and PHP.",
    },
    {
      title: "Frameworks/Libraries",
      tools: "React, Node.js, Express.js, Tailwind, Bootstrap",
      details:
        "Created full-stack apps with React and Node.js, styled with Tailwind and Bootstrap.",
    },
    {
      title: "Database/Tools",
      tools: "PostgreSQL, MongoDB, Git, Postman, Supabase",
      details:
        "Managed databases and streamlined workflows with Git, Postman, and Supabase.",
    },
  ];

  useGSAP(() => {
    try {
      skills.forEach((skill, id) => {
        const originalText = skill.details;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: `.skill-${id}`,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          })
          .fromTo(
            [`.skill-${id} .details`],
            {
              duration: 2,
              scrambleText: {
                chars: "XO",
                speed: 0.3,
              },
              delay: 1,
            },
            {
              duration: 1.2,
              scrambleText: {
                text: originalText,
                chars: "",
                speed: 0.3,
              },
            },
          )
          .fromTo(
            ".skills",
            {
              scrambleText: {
                chars: "XO",
                speed: 0.2,
              },
            },
            {
              duration: 1.5,
              scrollTrigger: {
                trigger: ".skills",
                start: "top bottom",
              },
              scrambleText: {
                text: "Developer/ Designer",
                chars: "",
                speed: 0.2,
              },
            },
            "<",
          );
      });
    } catch (err) {
      console.warn("GSAP Skills animation prevented:", err);
    }
  }, []);

  return (
    <>
      <div
        className="skills-section p-10 md:grid grid-cols-5 gap-10 h-screen black-background "
        id="skills"
      >
        <div className=" col-span-2 flex flex-col justify-center text-right">
          <h1 className="skills text-white md:text-5xl font-extrabold">
            Developer/ <br />
            Designer
          </h1>
        </div>
        <div className=" col-span-3 flex flex-col justify-center md:text-left text-center gap-8 mt-5">
          {skills.map((skill, id) => (
            <div className={`skill-panel skill-${id}`} key={id}>
              <h2 className=" tools">{skill.tools}</h2>
              <p className="details">{skill.details}</p>
            </div>
          ))}
          <h1>Hello</h1>
        </div>
      </div>
    </>
  );
}
