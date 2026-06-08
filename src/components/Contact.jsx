import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  // Initialize EmailJS and ensure the page is scrollable
  useEffect(() => {
    emailjs.init("SOJX1V8QGKkoCpxHW");
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    if (!formRef.current) return;

    emailjs.sendForm(
      "service_prlpgfd",
      "template_kaia8pq",
      formRef.current,
      {
        publicKey: "SOJX1V8QGKkoCpxHW",
      }
    )

      .then(() => {
        setStatus("✅ Message sent successfully!");
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("❌ Failed to send message. Please try again later.");
      })
      .finally(() => setSending(false));
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 bg-black">
      {/* Background pattern */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Radial mask overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content */}
      <div className="relative z-[60] max-w-xl w-full text-center">
        <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-5xl sm:text-7xl font-extrabold text-transparent">
          Connect with Me
        </h1>
        <p className="mt-4 text-neutral-400 text-lg">Let's chat — drop a message!</p>

        {/* Direct Contact Links */}
        <div className="flex items-center justify-center gap-6 mt-8 relative z-[60]">
          <a
            href="https://wa.me/916353769515"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-400 hover:text-green-400 transition-colors"
          >
            <span className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-green-500/50">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.3l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
            </span>
          </a>
          <a
            href="mailto:try.prit24@gmail.com"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <span className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/50">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg>
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/prit-patel-904272307"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors"
          >
            <span className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
            </span>
          </a>
        </div>

        <form ref={formRef} onSubmit={sendEmail} className="mt-10 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full rounded-md bg-black/40 px-4 py-2 text-white placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (Gmail preferred)"
            required
            className="w-full rounded-md bg-black/40 px-4 py-2 text-white placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            rows={4}
            className="w-full rounded-md bg-black/40 px-4 py-2 text-white placeholder-neutral-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20"
          />

          <div className="mt-6 flex justify-center relative z-[60]">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              type="submit"
              disabled={sending}
              className="bg-black text-white flex items-center space-x-2 px-6 py-2 font-semibold disabled:opacity-60"
            >
              <span>{sending ? "Sending..." : "Send Message"}</span>
            </HoverBorderGradient>
          </div>

          {status && (
            <p className={`mt-4 text-sm ${status.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;