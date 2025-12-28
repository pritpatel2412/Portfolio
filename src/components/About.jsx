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
      <div className="relative z-20 max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start gap-12">
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
            Hey, I’m Prit Patel — a front-end developer who loves building fun, functional, and slightly chaotic web experiences. I created KemLang, a Gujarati-inspired toy language, and I’m always experimenting with projects that mix culture, creativity, and clean UI. With a stack of React, Next.js, Tailwind, Prisma, and MongoDB, I learn by building (and sometimes breaking), and I’m currently exploring my startup idea, Xeon. Let’s make something bold — or at least weird enough to be unforgettable.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Currently pursuing my academic journey, I actively bring ideas to life through personal and open-source projects. I thrive on learning by building, and I’m always exploring real-world challenges to sharpen my skills. With a strong command of modern web technologies — especially React — I enjoy crafting clean, efficient solutions to complex problems.
          </p>
          <p className="text-lg leading-relaxed mb-4">
I'm building Xeon, a startup pitch platform that transforms bold ideas into structured opportunities. This venture is helping me grow my entrepreneurial mindset while honing skills in product thinking, strategy, and leadership — all through real-world feedback and continuous iteration.          </p>
          <p className="text-lg leading-relaxed">
            My goal is to take on challenging projects, learn from experienced mentors, and contribute meaningfully to the tech community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
