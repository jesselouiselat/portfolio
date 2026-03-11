import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../api/AxionInstance";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);
  const [messageStatus, setMessageStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const message = event.target.message.value.trim();
    const time = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Manila",
      hour12: true,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    console.log(time);

    if (!name || !email || !message) {
      setError("Please fill in all the fields first");
      return;
    }

    setError(null);
    setLoading(true);
    event.target.reset();

    try {
      const result = await axiosInstance.post("/portfolio/contact/sendEmail", {
        name,
        email,
        message,
      });

      setMessageStatus(result.data?.message || "Message sent successfully!");
      event.target.reset();
    } catch (err) {
      console.warn("Backend failed, trying Direct Web3Forms fallback...");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORM_API_KEY,

            name,
            email,
            message,
            time,
            subject: "Email From Portfolio (via WEb3Form)",
          }),
        });

        const data = await response.json();
        if (data.success) {
          setMessageStatus("Message sent successfully!");
        } else {
          setError("Both systems failed. Please try again later.");
        }
      } catch (error) {
        setError("Total connection failure.");
      }
    } finally {
      setLoading(false);
      event.target.reset();
    }
  };

  useEffect(() => {
    if (!contactRef.current) return;
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 20%",
          toggleActions: "play none none reverse",
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
      <div className="md:absolute md:left-1/2 md:-translate-x-1/2 pointer-events-none select-none mb-7">
        <h2 className="font-dmsans contact-bg-text md:text-[21vw] text-center text-6xl font-bold text-zinc-700 md:text-zinc-900 leading-none">
          CONTACT
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <form
          onSubmit={sendEmail}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
          onFocus={() => {
            setError(null);
            setMessageStatus(null);
          }}
        >
          {/* Name Field */}
          <div className="form-element group relative">
            <label
              htmlFor="name"
              className="block font-dmsans text-xs uppercase tracking-widest text-zinc-300  group-focus:text-lg  transition-all group-focus-within:text-white duration-300"
            >
              Name/Company
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Juan Dela Cruz"
              on
              className="w-full font-arimo bg-transparent mt-2 border-b group-hover:text-xl  border-zinc-600 py-2 text-zinc-100 outline-none focus:border-white hover:border-white transition-all placeholder:text-zinc-500 duration-300"
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
              className="w-full font-arimo bg-transparent mt-2 border-b group-hover:text-xl  border-zinc-600 py-2 text-zinc-100 outline-none focus:border-white hover:border-white transition-all placeholder:text-zinc-500 duration-300"
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
              className="w-full font-arimo bg-transparent mt-2 border-b group-hover:text-xl  border-zinc-600 py-2 text-zinc-100 outline-none focus:border-white hover:border-white transition-all placeholder:text-zinc-500 duration-300"
            />
          </div>

          {/* Feedback */}
          <div className="md:col-span-2  text-center">
            {error && (
              <p className="text-red-400 text-sm italic animate-pulse font-mono tracking-wider">
                {error}
              </p>
            )}
            {messageStatus && !error && (
              <p className="text-green-300 text-sm italic animate-pulse font-mono tracking-wider">
                {messageStatus}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-element md:col-span-2 flex justify-center ">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-zinc-900 text-zinc-200 hover:bg-zinc-200 hover:text-zinc-900 font-bold uppercase tracking-widest transition-all"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
