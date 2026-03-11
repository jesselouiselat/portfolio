import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "gsap/all";
import axiosInstance from "../api/AxionInstance";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    try {
      (async () => {
        const result = await axiosInstance.get(
          "/portfolio/projects/getProjects",
        );
        setProjects(result.data);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    if (projects.length === 0) return;

    document.fonts.ready.then(() => {
      let mm = gsap.matchMedia();

      let ctx = gsap.context(() => {
        const rows = gsap.utils.toArray(".project-row");

        rows.forEach((row) => {
          const titleEl = row.querySelector(".project-title");
          const descEl = row.querySelector(".project-description");

          const titleSplit = new SplitText(titleEl, { type: "chars" });
          const descriptionSplit = new SplitText(descEl, { type: "lines" });

          gsap.from([titleSplit.chars, descriptionSplit.lines], {
            yPercent: 150,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.02,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
          const images = row.querySelectorAll(".project-img");
          gsap.from(images, {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
              trigger: row,
              start: "top center",
              toggleActions: "play none none reverse",
            },
          });
        });
      }, sectionRef);

      mm.add("(min-width: 768px)", () => {
        const rows = gsap.utils.toArray(".project-row");

        rows.forEach((row) => {
          const line = row.querySelector(".image-line");
          const scrollAmount = line.scrollWidth - window.innerWidth;

          gsap.to(line, {
            x: -scrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top top",
              end: () => `+=${line.scrollWidth * 0.5}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });
      });

      return () => {
        ctx.revert();
        mm.revert();
      };
    });
  }, [projects]);

  return (
    <div ref={sectionRef} className="" id="projects">
      {/* Header Section */}
      <div className="md:h-[25vh] flex items-end md:p-12 p-9 md:justify-start justify-center ">
        <h1 className="font-dmsans md:text-8xl text-5xl font-bold  uppercase  md:tracking-tighter tracking-wide">
          Projects
          <div className="h-0.5 w-full bg-linear-to-l from-zinc-950 to-transparent"></div>
        </h1>
      </div>

      {projects.map((project, id) => (
        <section
          key={id}
          className="project-row md:h-screen h-auto w-full flex flex-col justify-center overflow-hidden py-20 "
        >
          {/* Static Text Wrapper - This stays visible while pinned */}
          <div className="group px-12 mb-8 flex flex-col justify-between  w-full">
            <div className="max-w-2xl w-full">
              <h2 className="project-title md:text-5xl text-2xl font-mono md:tracking-wider font-bold mb-2  wrap-break-word leading-tight">
                {project.title}
              </h2>

              <p className="project-description group-hover:text-zinc-950 duration-300 transition-colors text-zinc-400 font-arimo tracking-tight md:text-lg">
                {project.description}
              </p>

              <div className="h-0.5 w-0 group-hover:w-full mt-3 bg-zinc-700 transition-all duration-1000"></div>
            </div>
            <div className="flex gap-4 justify-end items-center px-5 font-mono text-xs uppercase tracking-[0.2em]">
              {project.live_url && (
                <>
                  <a
                    href={project.live_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="group flex items-center gap-3 text-zinc-400 hover:p-2  rounded-full hover:bg-zinc-300 hover:text-zinc-900 transition-all duration-300"
                  >
                    {/* Container for the Live Indicator */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Site
                  </a>
                  <span>|</span>
                </>
              )}

              {project.github_repo_url && (
                <>
                  <a
                    href={project.github_repo_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="group flex items-center gap-3 hover:p-2 text-zinc-400 rounded-full hover:bg-zinc-300 hover:text-zinc-900 transition-all duration-300"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
                    </span>
                    Git Repo
                  </a>
                </>
              )}
            </div>

            <div className="text-zinc-600 font-mono text-sm  text-end">
              Project <span className="font-semibold">0{id + 1}</span> of 0
              {projects.length}
            </div>
          </div>

          {/* Scrolling Image Track */}
          <div className="image-line flex md:flex-row flex-col gap-6 px-12  items-center">
            {project.screenshots.map((img, i) => (
              <div
                key={i}
                className="project-img shrink-0 w-full md:w-150 aspect-video bg-zinc-900 shadow-xl overflow-hidden"
              >
                <img
                  src={img}
                  alt={`${project.title} screenshot ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
