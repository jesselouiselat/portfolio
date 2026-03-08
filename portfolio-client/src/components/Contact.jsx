import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);

  useEffect(() => {
    if (!contactRef.current) return;
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 40%",
          end: "center top",
          toggleActions: "play reverse restart reverse",
        },
      });
      tl.from(".contact-bg-text", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      tl.from(
        ".form-element",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "<",
      );
    }, contactRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={contactRef}
      className="contact-section relative bg-zinc-950 px-6 py-32 overflow-hidden"
      id="contact"
    >
      {/* Large Background Text for depth */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <h2 className="font-dmsans contact-bg-text text-[21vw] font-bold text-zinc-900 leading-none">
          CONTACT
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <form
          action="#"
          method="POST"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
        >
          {/* Name Field */}
          <div className="form-element group relative">
            <label
              htmlFor="name"
              className="block font-dmsans text-xs uppercase tracking-widest text-zinc-300  group-focus:text-lg  transition-all group-focus-within:text-white duration-300"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Juan Dela Cruz"
              className="w-full font-arimo bg-transparent border-b group-hover:text-xl  border-zinc-600 py-2 text-zinc-100 outline-none focus:border-white hover:border-white transition-all placeholder:text-zinc-500 duration-300"
            />
          </div>

          {/* Email Field */}
          <div className="form-element group relative">
            <label
              htmlFor="email"
              className="block font-dmsans text-xs uppercase tracking-widest text-zinc-300  group-focus:text-lg  transition-all group-focus-within:text-white duration-300"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="juandelacruz@email.com"
              className="w-full font-arimo bg-transparent border-b group-hover:text-xl  border-zinc-600 py-2 text-zinc-100 outline-none focus:border-white hover:border-white transition-all placeholder:text-zinc-500 duration-300"
            />
          </div>

          {/* Message Field */}
          <div className="form-element md:col-span-2 group relative">
            <label
              htmlFor="message"
              className="block font-dmsans text-xs uppercase tracking-widest text-zinc-300  group-focus:text-lg  transition-all group-focus-within:text-white duration-300"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              placeholder="Tell me about your project..."
              className="w-full font-arimo bg-transparent border-b group-hover:text-xl  border-zinc-600 py-2 text-zinc-100 outline-none focus:border-white hover:border-white transition-all placeholder:text-zinc-500 duration-300"
            />
          </div>

          {/* Submit Button */}
          <div className="group form-element md:col-span-2 flex justify-center mt-5">
            <button
              type="submit"
              className="group relative px-8 py-4 bg-zinc-900 text-zinc-200 group-hover:bg-zinc-200 group-hover:text-zinc-900 font-bold uppercase tracking-widest overflow-hidden transition-all hover:pr-16"
            >
              <span className="relative z-10 font-dmsans">Send Message</span>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                →
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
