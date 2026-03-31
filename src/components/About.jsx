import React from 'react';
import { cn } from "../lib/utils";
import BlurImage from './utils/BlurImage';

const About = () => {
  return (
    <section className="about-container relative flex min-h-[50rem] md:min-h-screen w-full items-center justify-center bg-black text-center py-20 px-4">
      {/* Background pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Faded radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content */}
      <div className="relative z-[60] max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Profile Image */}
        <div className="w-64 h-64 rounded-full overflow-hidden flex-shrink-0 border-4 border-neutral-800">
          <BlurImage
            src="/profile_pic1.png"
            blurhash="LAB._mEN5SkC-TNdofWX0hay}=WC"
            alt="Profile"
            className="w-full h-full object-cover object-top"
          />
        </div>


        {/* Text Content */}
        <div className="text-left text-neutral-300 max-w-2xl ml-8 md:ml-16">
          <h1 className="text-4xl sm:text-7xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent py-8">
            About Me.
          </h1>
          <p className="text-lg leading-relaxed mb-4">
            Hey, I’m Prit Patel — a builder at the intersection of AI, systems, and design. I don’t just write code; I engineer experiences that think, adapt, and scale. From building Kyren, an AI-powered learning OS, to ARIA, a multi-agent autonomous platform, and StockMind, a large-scale market simulation — I focus on creating systems that go beyond interfaces and actually do things.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Currently a Computer Science student (GPA 9.67), I’ve solved 400+ problems on LeetCode and built production-grade applications across AI, full-stack, and real-time architectures. My stack includes React, Next.js, TypeScript, and modern backend systems, with a strong focus on LLM pipelines, RAG architectures, and scalable system design.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            I learn by building fast, breaking things, and shipping anyway. Whether it’s AI proctoring with real-time vision models or decentralized agent swarms, I’m driven by solving complex, real-world problems through clean and efficient solutions.
          </p>
          <p className="text-lg leading-relaxed">
            Currently working on something new — still under wraps. My goal is to take on ambitious challenges, learn from great builders, and create technology that doesn’t just work — it stands out.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
