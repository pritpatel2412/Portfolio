import React, { useRef } from "react";
import { cn } from "../lib/utils";
import { CardSpotlight } from "./ui/card-spotlight";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const Skills = () => {
  const colors = [
    [138, 43, 226],  // Purple
    [147, 112, 219], // Light Purple
    [186, 85, 211],  // Medium Purple
    [153, 50, 204],  // Dark Purple
    [218, 112, 214], // Orchid
    [221, 160, 221], // Plum
    [216, 191, 216], // Thistle
    [128, 0, 128],   // Dark Magenta
    [56, 189, 248],  // Tailwind-like Sky Blue
    [70, 130, 180],  // Postgresql
    [57, 255, 20],   // Three.js - Neon Green
    [30, 41, 59],    //Next.js - Slate Blue
    [255, 0, 128],   // Framer Motion - Vibrant Pink
    [0, 199, 255],   // Figma - Vivid Cyan/Blue
    [104, 160, 99],  // Node.js - Medium Green
    [51, 51, 51],     // Express.js - Dark Gray
    [255, 136, 0],    // Postman - Bright Orange
    [242, 101, 34],   // Java - Logo Orange
    [0, 201, 167],  //React Native - Bright Teal 
  ];

  const icons = [
    <FaReact key="react" className="text-white text-xl" />,
    <FaHtml5 key="html" className="text-white text-xl" />,
    <FaCss3Alt key="css" className="text-white text-xl" />,
    <FaJs key="js" className="text-white text-xl" />,
    <SiTypescript key="ts" className="text-white text-xl" />,
    <img
      key="gsap"
      src="/Gsap.png"
      alt="Gsap"
      className="w-9 h-9 p-1 object-contain"
    />,
    <FaPython key="python" className="text-white text-xl" />,
    <img
      key="flask"
      src="/Flask.png"
      alt="Flask"
      className="w-9 h-9 p-1 object-contain"
    />,
    <img
      key="tailwind"
      src="/tailwind.png"
      alt="Tailwind"
      className="w-9 h-9 p-1 object-contain"
    />,
    <img
      key="postgresql"
      src="/postgresql.png"
      alt="Postgresql"
      className="w-9 h-9 p-1 object-contain"
    />,
    <img
      key="three-js-logo"
      src="/three-js-logo.png"
      alt="three.js"
      className="w-9 h-9 p-1 object-contain"
    />,
    <img
      key="next-js-logo"
      src="/next.png"
      alt="Next.js"
      className="w-15 h-15 p-1 object-contain"
    />,
    <img
      key="motion_logo"
      src="/motion_logo().png"
      alt="motion"
      className="w-15 h-15 p-1 object-contain"
    />,
    <img
      key="figma_logo"
      src="/figma_logo.png"
      alt="figma"
      className="w-13 h-12 p-1 object-contain"
    />,
    <img
      key="NodeJS_logo"
      src="/NodeJS_Logo.png"
      alt="NodeJS"
      className="w-13 h-12 p-1 object-contain"
    />,
    <img
      key="ExpressJS_logo"
      src="/ExpressJS_Logo.png"
      alt="ExpressJS"
      className="w-16 h-11 p-1 object-contain"
    />,
    <img
      key="Postman_Logo"
      src="/Postman_Logo.png"
      alt="Postman"
      className="w-15 h-15 p-1 object-contain"
    />,
    <img
      key="Java_Logo"
      src="/Java_Logo.png"
      alt="Java"
      className="w-13 h-14 px-1 pb-1 object-contain"
    />,
    <img
      key="React_Native_Logo"
      src="/react_native_logo.png"
      alt="React_Native"
      className="w-11 h-12 px-1 pb-1 object-contain"
    />,
  ];

  const audioSources = [
    "/e6-piano.mp3",
    "/d6-piano.mp3",
    "/b6-piano.mp3",
    "/g6-piano.mp3",
    "/f6-piano.mp3",
    "/a6-piano.mp3",
    "/c6-piano.mp3",
    "/d6-piano.mp3",
    "/e6-piano.mp3", 
    "/a6-piano.mp3",
    "/c6-piano.mp3",
    "/g6-piano.mp3",
    "/f6-piano.mp3",
    "/a6-piano.mp3",
    "/f6-piano.mp3",
    "/g6-piano.mp3",
    "/b6-piano.mp3",
    "/e6-piano.mp3",
    "/d6-piano.mp3",
  ];

  const audioRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const audio = new Audio(audioSources[index]);
    audioRefs.current[index] = audio;
    audio.play();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-12 sm:py-20 bg-black">
      
      {/* Background Grid */}
      <div
        className={cn(
          "absolute inset-0 z-0 pointer-events-none",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Radial Mask */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-transparent z-20 mb-4 sm:mb-6">
        Tools in My Arsenal
      </h2>

      {/* Prompts */}
      <div className="z-20 mb-6 text-lg font-semibold text-center">
        {/* Mobile: Tap Prompt */}
        <p className="block sm:hidden bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-transparent">
          Try tapping on the icons 🎵
        </p>

        {/* Desktop/Tablet: Hover Prompt */}
        <p className="hidden sm:block bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-transparent">
          Hover over the icons to hear a sound 🎵
        </p>
      </div>

      {/* Icon Cards */}
      <div className="relative z-20 flex justify-center gap-3 flex-wrap max-w-5xl w-full">
      {icons.map((icon, index) => (
        <CardSpotlight
          key={index}
          className="h-18 w-18 rounded-full flex items-center justify-center bg-black"
          color={`rgb(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]})`}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleMouseEnter(index)}
        >
          <div className="relative z-20">
            {icon}
          </div>
        </CardSpotlight>
      ))}
      </div>
    </div>
  );
};

export default Skills;