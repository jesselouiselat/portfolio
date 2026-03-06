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

    let ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".project-row");

      rows.forEach((row) => {
        const line = row.querySelector(".image-line");
        const titleEl = row.querySelector(".project-title");
        const descEl = row.querySelector(".project-description");

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
            toggleActions: "play reverse restart reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={sectionRef} className="">
      {/* Header Section */}
      <div className="md:h-[25vh] flex items-end md:p-12 p-9 md:justify-start justify-center ">
        <h1 className="font-dmsans md:text-8xl text-5xl font-bold  uppercase  md:tracking-tighter tracking-wide">
          Projects
        </h1>
      </div>

      {projects.map((project, id) => (
        <section
          key={id}
          className="project-row h-screen w-full flex flex-col justify-center overflow-hidden border-t border-zinc-800"
        >
          {/* Static Text Wrapper - This stays visible while pinned */}
          <div className="px-12 mb-8 flex flex-col justify-between  w-full">
            <div className="max-w-2xl">
              <h2 className="project-title text-5xl font-dmsans font-bold mb-4">
                {project.title}
              </h2>
              <p className="project-description text-zinc-400 font-arimo text-lg">
                {project.description}
              </p>
            </div>
            <div className="text-zinc-600 font-mono text-sm p-5 text-end">
              Project <span className="font-semibold">0{id + 1}</span> of 0
              {projects.length}
            </div>
          </div>

          {/* Scrolling Image Track */}
          <div className="image-line flex gap-6 px-12 items-center">
            {project.screenshots.map((img, i) => (
              <div
                key={i}
                className="project-img shrink-0 w-100 md:w-150 aspect-video bg-zinc-900 shadow-xl overflow-hidden"
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
