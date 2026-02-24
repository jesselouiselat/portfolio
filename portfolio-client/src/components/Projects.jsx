import gsap from "gsap";
import screenshot1 from "../assets/img/screenshots/screenshot_1.png";
import screenshot2 from "../assets/img/screenshots/screenshot_2.png";
import screenshot3 from "../assets/img/screenshots/screenshot_3.png";
import screenshot4 from "../assets/img/screenshots/screenshot_4.png";
import screenshot5 from "../assets/img/screenshots/screenshot_5.png";
import screenshot6 from "../assets/img/screenshots/screenshot_6.png";
import screenshot7 from "../assets/img/screenshots/screenshot_7.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Projects() {
  const projects = [
    {
      projectTitle: "Islatambay Freediving",
      projectDescription: `is a full-stack freediving website with user browsing, admin-managed
          content, and a Google AI assistant. Built with React, JavaScript,
          Supabase, and Cloudinary, it features Google authentication, a
          responsive UI, smooth GSAP animations, and full admin control over
          what displays on the site.
      `,
      screenshots: [
        screenshot1,
        screenshot2,
        screenshot3,
        screenshot4,
        screenshot5,
        screenshot6,
      ],
    },
    {
      projectTitle: "Task Manager",
      projectDescription: `this is a task manager.
      `,
      screenshots: [
        screenshot1,
        screenshot2,
        screenshot3,
        screenshot4,
        screenshot5,
        screenshot6,
      ],
    },
  ];

  const sectionRef = useRef(null);

  useGSAP(() => {
    try {
      gsap.utils.toArray(".project-section").forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "+=1%",
            pin: true,
            pinSpacing: true,
            scrub: 4,
          },
        });

        const titleEl = section.querySelector(".project-title");
        const descEl = section.querySelector(".project-description");

        let projectTitle, projectDescription;
        try {
          projectTitle = new SplitText(titleEl, { type: "chars" });
          projectDescription = new SplitText(descEl, { type: "lines" });
        } catch (e) {
          projectTitle = null;
          projectDescription = null;
        }

        if (projectTitle && projectTitle.chars) {
          gsap.from(projectTitle.chars, {
            opacity: 0,
            yPercent: 100,
            stagger: 0.1,
            duration: 0.2,
            ease: "power1.inOut",

            scrollTrigger: {
              trigger: section,
              start: "center bottom",
              once: true,
            },
          });
        } else if (titleEl) {
          gsap.from(titleEl, {
            opacity: 0,
            yPercent: 20,
            duration: 0.2,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: section,
              start: "bottom top",
              once: true,
            },
          });
        }

        if (projectDescription && projectDescription.lines) {
          gsap.from(projectDescription.lines, {
            opacity: 0,
            yPercent: 100,
            stagger: 0.5,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top center",
              once: true,
            },
          });
        } else if (descEl) {
          gsap.from(descEl, {
            opacity: 0,
            yPercent: 20,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "center bottom",
              once: true,
            },
          });
        }

        tl.from(section, { x: 200, opacity: 0 });

        const images = section.querySelectorAll("img");
        tl.from(images, { x: -50, opacity: 0, stagger: 0.2 }, "+=0.5");
      });
    } catch (err) {
      console.warn("GSAP Projects animation prevented:", err);
    }
  }, []);

  return (
    <div className=" w-full  " ref={sectionRef} id="projects">
      {projects.map((project, id) => (
        <div key={id} className="project-section   grid grid-cols-3">
          {/* Left column */}
          <div className="col-span-1 flex flex-col gap-5 p-9">
            <h1 className="projects text-4xl md:text-7xl font-bold">
              Projects
            </h1>
            <p className="project-title text-4xl">{project.projectTitle}</p>
            <p className="project-description">{project.projectDescription}</p>
          </div>
          {/* Right column */}
          <div className="col-span-2  p-8 rounded-4xl">
            <div className="flex flex-wrap justify-center gap-5 content-start">
              {project.screenshots.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="md:w-65 w-15 rounded-3xl"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
