import gsap from "gsap";
import jesse_lat from "../assets/img/jesse_lat_grad_pic.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);

export default function AboutMe() {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-me",
          start: "center 85%",
          toggleActions: "play none none reverse",
        },
      });
      tl.from([".title"], {
        x: 200,
        opacity: 0,
        ease: "expo.inOut",
        duration: 1.2,
      });
      tl.from(".title", {
        duration: 0.7,
        scrambleText: {
          chars: "XO",
          text: "jesse_lat",
          speed: 2,
        },
      });

      const splitDetails = new SplitText(".details", { type: "lines" });

      tl.from(
        splitDetails.lines,
        {
          duration: 1,
          y: 200,
          ease: "back.inOut",
          opacity: 0,
        },
        "<0.2",
      );
    });
  }, []);

  return (
    <>
      <div
        className="relative about-me p-10 md:grid grid-cols-7 gap-10 h-screen black-background"
        id="aboutMe"
      >
        <div className=" image col-span-3 flex flex-col justify-center items-center ">
          <img
            src={jesse_lat}
            className="grayscale opacity-85 w-80 h-80 rounded-full object-cover"
            alt="jesse-lat-pic"
          />
        </div>
        <div className=" col-span-4 flex flex-col  md:text-left justify-center text-center gap-8 mt-5">
          <h1 className="title text-white text-4xl md:text-4xl font-bold">
            About Me
          </h1>
          <p className="details w-150">
            I’m an Electronics Engineering graduate who transitioned into
            full-stack development, applying strong analytical and systems-based
            thinking to software engineering. I build and deploy
            production-ready web applications using React, Node.js, Express,
            PostgreSQL, and MongoDB.
            <br />
            <br />
            I’ve implemented authentication systems, designed databases, built
            REST APIs, integrated cloud storage, and developed AI features. I
            focus on turning complex problems into clean, scalable, and reliable
            solutions.
          </p>
        </div>
      </div>
    </>
  );
}
