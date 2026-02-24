import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top center",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(
      gsap.utils.toArray(".contact-form .flex-1, .contact-form > div , button"),
      {
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.1,
      },
    );
  }, []);
  return (
    <div
      className="contact-section relative  px-6 py-24 sm:py-32 lg:px-8"
      id="contact"
    >
      <div className="contact-form">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className=" text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Connect with me
          </h2>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-10 max-w-xl sm:mt-10"
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-600"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-600"
              />
            </div>
          </div>
          <div className="flex-1 mt-6">
            <label
              htmlFor="message"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Let's talk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
