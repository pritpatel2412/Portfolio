import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { cn } from "../lib/utils"; 
import { FaGithub } from 'react-icons/fa';
import Lenis from 'lenis';
import { useEffect,useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectImage from "./utils/ProjectImage";

const projects = [
  {
    title: "KemLang",
    description: "A Gujarati-inspired toy programming language that blends cultural flavor with real coding logic. Designed to make programming feel more accessible, fun, and local—especially for beginners.",
    link: "https://kemlang.vercel.app/",
    image: "/kemlang_thumbnail.png",
    blurhash: "L15f+F~q00Rj_3kC%MRj~qkC?bof"

  },
  {
    title: "CodeGuard",
    description: "Code Guard is an AI-powered code security and pull request (PR) risk analysis platform designed to help developers and teams identify risky code changes before they are merged into production.",
    link: "https://code-guard-45.vercel.app/",
    image: "/codeguard_thumbnail.jpg",
    blurhash: "L26z$X~q00Rj_3kC%MRj~qkC?bof" // replace if you have the actual blurhash

  },
  {
    title: "Job Portal",
    description: "A full-featured web platform that connects job seekers with employers. Users can browse and apply for jobs, while companies can post openings and manage applications — all in one streamlined interface.",
    link: "https://jobportal-frontend-vjgp.onrender.com",
    image: "/jobhunt_thumbnail.png",
    blurhash: "L45x9U~q00Rj_3kC%MRj~qkC?bof" // replace with actual blurhash if available

  },
  {
    title: "Snippix",
    description: "A smart and organized platform to save, manage, and share code snippets. Designed for developers to boost productivity, store reusable code, and collaborate effortlessly.",
    link: "https://snippix.vercel.app/",
    image: "/snippix_thumbnail.png",
    blurhash: "L35x8X~q00Rj_3kC%MRj~qkC?bof" // replace with your actual blurhash if available

  },
  {
    title: "Flowsketch",
    description: "A simple and intuitive tool to create, edit, and export flowcharts and diagrams. Ideal for developers, students, and teams to easily visualize ideas, algorithms, and workflows.",
    link: "https://flow-sketch-iota.vercel.app/",
    image: "/flowsketch_thumbnail.jpg",
    blurhash: "L44x9Y~q00Rj_3kC%MRj~qkC?bof" // replace with actual blurhash if available

  },
  {
    title: "Learning Management System",
    description: "A web-based platform that streamlines the delivery, management, and tracking of educational content. It connects students, instructors, and admins in a centralized, interactive learning environment.",
    link: "https://lms-frontend-5g2b.onrender.com",
    image: "/lms_thumbnail.jpg",
    blurhash: "L54x9c~q00Rj_3kC%MRj~qkC?bof" // replace with your actual blurhash if available

  },
  {
    title: "Scraply",
    description: "Scraply — A smart web scraping tool that extracts full website content from any public URL 🌐. Features include structured data export (JSON, CSV, Markdown), NLP insights, media downloader, and ethical scraping controls.",
    link: "https://scraply-45.lovable.app",
    image: "/scraply_thumbnail.jpg",
    blurhash: "L65x9f~q00Rj_3kC%MRj~qkC?bof" // replace with your actual blurhash if available

  },
  {
    title: "Password Generator",
    description: "A simple tool that generates strong, random passwords using a mix of uppercase, lowercase, numbers, and symbols. Perfect for enhancing account security and avoiding weak or reused passwords.",
    link: "https://pritpatel-password-generator.onrender.com",
    image: "/password_generator_thumbnail.jpg",
    blurhash: "L64x9f~q00Rj_3kC%MRj~qkC?bof" // replace with actual blurhash if available

  },
  {
    title: "Coming Soon",
    description:
      "Still in the oven. Can’t wait to serve it hot!",
    link: "",
    image: "/black_page.jpg",
    blurhash:"L00SvEayWAfQozfQayfQayfQf8fQ"
  },
];

const Projects = () => {

  const scrollLineRef = useRef(null);

  useEffect(() => {
    // Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 3.2, // Scroll animation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      smooth: true, // Enable smooth scrolling
    });

    // frame loop for Lenis boommm
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(scrollLineRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Cleanup on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    
    <div className="relative flex flex-col items-center justify-center w-full py-20 px-4 bg-black">
      
      <div
        ref={scrollLineRef}
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-b from-neutral-200 to-neutral-500 w-0 z-50"
      ></div>

      {/* Dot Background Layer */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Radial Mask Overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Section Title */}
      <div className="relative z-10 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          Things I've been building 🚀
        </h2>
        <p className="mt-4 text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
          Exploring ideas, solving problems, and having fun with code — here’s what I’ve built so far.
        </p>
      </div>

      {/* Project Cards */}
      <div className="relative z-10 flex flex-wrap justify-center gap-8">
        {projects.map((project, index) => (
          <CardContainer key={index} className="inter-var">
            <CardBody className="bg-black relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white"
              >
                {project.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-300 text-sm max-w-sm mt-2"
              >
                {project.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <ProjectImage
                  image={project.image}
                  blurhash={project.blurhash}
                  alt={project.title}
                />
              </CardItem>
              <div className="flex justify-end items-center mt-6">
                <CardItem
                  translateZ={20}
                  as="a"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
                >
                  Live →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
      <div>
      <a 
      href="https://github.com/pritpatel2412"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-base font-semibold leading-6  text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-7 ring-1 ring-white/10 ">
          <span>
            For More
          </span>
          <FaGithub className="h-6 w-6 text-white" />
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </a>
      </div>

    </div>
  );
};

export default Projects;
