import React from "react";

import { ScrambleTextPlugin, SplitText } from "gsap/all";
import github_logo from "../assets/img/github_logo.jpg";
import linkedin_logo from "../assets/img/linkedin_logo.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import axiosInstance from "../api/AxionInstance";
import { useEffect } from "react";
import LoadingCover from "./LoadingCover";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default function Hero() {
  const [heroDetails, setHeroDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosInstance.get(
          "/portfolio/hero/aboutMeDetails",
        );
        setLoading(false);

        setHeroDetails(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const external_links = [
    {
      website: "github",
      logo: github_logo,
    },
    {
      website: "linkedin",
      logo: linkedin_logo,
    },
  ];

  useEffect(() => {
    if (heroDetails.length > 0) {
      document.fonts.ready.then(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#about_me",
            start: "center top",
            end: "bottom bottom",
            toggleActions: "play reverse restart none",
          },
        });
        tl.play(0);

        const nameSplit = new SplitText(".name", { type: "words" });

        tl.from(nameSplit.words, {
          yPercent: -150,
          opacity: 0,
          duration: 1,
          ease: "power4.inOut",
          stagger: 0.3,
        }).fromTo(
          [".external-link", ".resume", ".availability"],
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
          },
          "<0.5",
        );
      });
    }
  }, [heroDetails]);

  return (
    <div
      id="about_me"
      className="h-screen flex flex-col justify-evenly md:grid grid-cols-1 grid-rows-5"
    >
      {loading && <LoadingCover />}
      {!loading && heroDetails && (
        <>
          {heroDetails.map((detail, id) => (
            <React.Fragment key={id}>
              {/* Full name */}
              <div className="flex items-center justify-center md:row-span-3">
                <h1
                  key={`name-${id}`}
                  className="name hover:text-9xl duration-300 transition-all font-arimo font-semibold md:text-center text-6xl md:text-8xl uppercase p-8"
                >
                  {detail.name}
                </h1>
              </div>

              {/* Availability + Links */}
              <div className="md:row-span-2 ">
                <div className="flex flex-col gap-7 md:flex-row md:h-full md:items-center md:justify-between px-15 ">
                  <div className="availability">
                    <p className="font-dmsans tracking-wide text-lg md:text-base ">
                      Available for work
                    </p>
                    <h6 className="font-mono text-2xl md:text-4xl">
                      {detail.additional_details.availability}
                    </h6>
                  </div>
                  <a
                    href={detail.additional_details.resume}
                    download="Jesse_Louise_Lat_CV.pdf"
                    rel="noopener noreferrer"
                    target="blank"
                    className="group resume flex items-center gap-3 w-fit px-6 py-3 border border-zinc-800 text-zinc-400 rounded-full hover:bg-zinc-900 hover:text-zinc-200 transition-all duration-300 font-mono text-sm"
                  >
                    <span className="group-hover:translate-y-1 transition-transform duration-500">
                      ↓
                    </span>
                    Download CV
                  </a>

                  <ul className=" flex md:justify-end gap-4 ">
                    {external_links.map((link) => (
                      <li key={link.website} className="external-link">
                        <a
                          href={detail.additional_details.links[link.website]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={link.logo}
                            className="w-10 md:w-16 hover:shadow-2xl hover:w-17 transition-all"
                            alt={link.website}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
}
