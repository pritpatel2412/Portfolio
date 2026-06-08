import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "../lib/utils";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

const experiences = [
  {
    id: 1,
    title: "Web Developer Intern",
    company: "FutureTech Innovations",
    date: "May 2025 - June 2025",
    description: "Led the development of KemLang, a Gujarati programming language designed to make coding more accessible to native speakers. Built the complete language ecosystem, including the compiler/interpreter pipeline, online playground, VS Code extension, and developer tooling using Python, FastAPI, React, and TypeScript.",
    badge: "Internship"
  },
  {
    id: 2,
    title: "Full Stack Developer Intern",
    company: "HorizonTechX ",
    date: "April 2026 - May 2026",
    description: "Built LUMINA, a full-stack social media application with secure authentication, content publishing, social engagement features, and media sharing capabilities. Led the development of the complete system architecture, database design, REST APIs, and responsive user interface, delivering a scalable and production-ready web platform.",
    badge: "Internship"
  },
  {
    id: 3,
    title: "AI Developer Intern",
    company: "StayChat AI",
    date: "June 2026 - Sept 2026",
    description: "As an AI Developer Intern at StayChat AI, I contribute to the development of AI-powered products using Large Language Models (LLMs), RAG architectures, and modern backend technologies. My work focuses on building scalable, production-ready AI solutions and enhancing intelligent user experiences.",
    badge: "Current"
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen py-20 px-4 bg-black overflow-hidden pt-32">
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
      <div className="relative z-10 mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          My Journey
        </h2>
        <p className="mt-4 text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
          A timeline of my professional experience and the skills I've honed along the way.
        </p>
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-5xl mx-auto flex flex-col">
        {/* The Central Glowing Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-neutral-800 -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-transparent via-neutral-500 to-neutral-300 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
          />
        </div>

        {/* Experience Nodes */}
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              key={exp.id}
              className={cn(
                "relative flex w-full mb-16",
                isEven ? "md:justify-start" : "md:justify-end",
                "justify-start" // Always align left on mobile
              )}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-neutral-400 shadow-[0_0_10px_rgba(255,255,255,0.2)] -translate-x-1/2 mt-6 z-20" />

              {/* Card Container */}
              <div
                className={cn(
                  "w-full md:w-[45%] pl-20 pr-4 md:px-0",
                  isEven ? "md:pr-16" : "md:pl-16"
                )}
              >
                <CardContainer className="inter-var w-full m-0 p-0">
                  <CardBody className="bg-black relative group/card hover:shadow-2xl hover:shadow-white/[0.1] border-white/[0.2] w-full h-auto rounded-2xl p-6 border transition-all duration-500">
                    {/* Subtle Gradient background on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <CardItem
                        translateZ="50"
                        className="text-xl md:text-2xl font-bold text-white"
                      >
                        {exp.title}
                      </CardItem>
                      <CardItem
                        translateZ="60"
                        className="px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full bg-white/5 text-neutral-300 border border-white/10 whitespace-nowrap"
                      >
                        {exp.badge}
                      </CardItem>
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-neutral-400 text-sm mb-6 font-medium">
                      <CardItem translateZ="40" className="text-neutral-300 font-semibold">
                        {exp.company}
                      </CardItem>
                      <CardItem translateZ="40" className="text-neutral-500">
                        {exp.date}
                      </CardItem>
                    </div>

                    <CardItem
                      as="p"
                      translateZ="60"
                      className="relative z-10 text-neutral-300 text-sm leading-relaxed"
                    >
                      {exp.description}
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
