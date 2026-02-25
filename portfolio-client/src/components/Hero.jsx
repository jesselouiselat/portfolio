import { SplitText } from "gsap/all";
import github_logo from "../assets/img/github_logo.jpg";
import linkedin_logo from "../assets/img/linkedin_logo.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const external_links = [
    {
      website: "github",
      link: "https://github.com/jesselouiselat",
      logo: github_logo,
    },
    {
      website: "linkedin",
      link: "https://linkedin.com/in/jesselouiselat",
      logo: linkedin_logo,
    },
  ];

  useGSAP(() => {
    document.fonts.ready.then(() => {
      try {
        const tl = gsap.timeline();

        tl.to(".overlay path", {
          duration: 0.8,
          ease: "power3.inOut",
          scale: 10,
          transformOrigin: "50% 50% ",
        }).to(".overlay", {
          opacity: 0,
          duration: 0.1,
          ease: "power2.out",
          onComplete: () => {
            const ov = document.querySelector(".overlay");
            if (ov) ov.style.display = "none";
          },
        });

        let nameSplit, availabilitySplit, dateSplit;
        try {
          nameSplit = new SplitText(".name", { type: "words" });
          availabilitySplit = new SplitText(".available", { type: "lines" });
          dateSplit = new SplitText(".date", { type: "lines" });
        } catch (e) {
          nameSplit = null;
          availabilitySplit = null;
          dateSplit = null;
        }

        if (nameSplit && nameSplit.words) {
          gsap.from(nameSplit.words, {
            yPercent: -150,
            opacity: 0,
            duration: 1.5,
            ease: "power1.out",
            stagger: 0.06,
            delay: 1,
          });
        } else {
          gsap.from(".name", {
            yPercent: -50,
            opacity: 0,
            duration: 1.2,
            ease: "power1.out",
            delay: 1,
          });
        }

        if (availabilitySplit && availabilitySplit.lines) {
          gsap.from(availabilitySplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.01,
            delay: 2,
          });
        } else {
          gsap.from(".available", {
            opacity: 0,
            yPercent: 20,
            duration: 1.2,
            delay: 2,
          });
        }

        if (dateSplit && dateSplit.lines) {
          gsap.from(dateSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.01,
            delay: 2,
          });
        } else {
          gsap.from(".date", {
            opacity: 0,
            yPercent: 20,
            duration: 1.2,
            delay: 2,
          });
        }

        gsap.fromTo(
          ".external-links img",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.2,
            delay: 2,
          },
        );
      } catch (err) {
        // ensure overlay is removed if animation setup fails
        // eslint-disable-next-line no-console
        console.warn("Hero animations failed:", err);
        const ov = document.querySelector(".overlay");
        if (ov) ov.style.display = "none";
      }
    });

    // Safety fallback: hide overlay after 3s in case animations never run
    setTimeout(() => {
      const ov = document.querySelector(".overlay");
      if (ov && ov.style.display !== "none") ov.style.display = "none";
    }, 3000);

    const main = document.querySelector(".name");

    gsap.set(".name", { perspective: 650 });

    const outerRX = gsap.quickTo(".name-outer", "rotationX", {
      ease: "power3",
    });
    const outerRY = gsap.quickTo(".name-outer", "rotationY", {
      ease: "power3",
    });
    const innerX = gsap.quickTo(".name", "x", { ease: "power3" });
    const innerY = gsap.quickTo(".name", "y", { ease: "power3" });

    main.addEventListener("pointermove", (e) => {
      outerRX(gsap.utils.interpolate(15, -15, e.y / window.innerHeight));
      outerRY(gsap.utils.interpolate(-15, 15, e.x / window.innerWidth));
      innerX(gsap.utils.interpolate(-30, 30, e.x / window.innerWidth));
      innerY(gsap.utils.interpolate(-30, 30, e.y / window.innerHeight));
    });

    main.addEventListener("pointerleave", (e) => {
      outerRX(0);
      outerRY(0);
      innerX(0);
      innerY(0);
    });
  }, []);

  return (
    <>
      <div
        id="about_me"
        className=" h-[20vh] md:h-screen sm:flex md:grid grid-cols-1 grid-rows-5 "
      >
        <svg
          className="overlay fixed top-0 left-0 w-full h-full z-50"
          viewBox="0 0 200 200"
        >
          <path
            d="M100,0 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0"
            fill="black"
          />
        </svg>
        <div className="name-outer md:row-span-3 flex flex-col justify-center">
          <h1 className="name text-center text-4xl md:text-8xl uppercase">
            Jesse Louise Lat
          </h1>
        </div>

        <div className=" subheading md:row-span-2 flex justify-around  md:justify-between md:m-18 mt-9">
          <div className="availability">
            <p className="available text-sm md:text-base">Availabe for work</p>
            <h6 className=" date text-lg md:text-4xl"> Feb' 2026</h6>
          </div>
          <ul className="external-links flex justify-end ">
            {external_links.map((link) => (
              <li key={link.website}>
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={link.logo}
                    className="w-10 md:w-15 "
                    alt={link.website}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
