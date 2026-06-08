import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { cn } from "../lib/utils";
import { FaEnvelope, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const projectIdeas = [
  {
    id: 1,
    title: "ReadAloud",
    description: "What if enterprise-grade text-to-speech could run entirely on your device? Exploring a future where privacy, accessibility, and multilingual voice generation coexist without sending data to the cloud.",
    status: "Future",
  },
  {
    id: 2,
    title: "SearchMind API",
    description: "AI agents rely on search, but most search APIs weren't built for them. Reimagining web search from the ground up for RAG systems, autonomous agents, and LLM-powered applications.",
    status: "Current",
  },
  {
    id: 3,
    title: "WebLayer AI",
    description: "Browsers were designed for humans. What happens when AI agents can search, navigate, extract information, and interact with the web autonomously using a unified interface?",
    status: "Future",
  },
  {
    id: 4,
    title: "NeuralCanvas",
    description: "An interactive, node-based workspace where non-technical users can drag and drop AI models, API endpoints, and logic blocks to visually program and deploy custom micro-apps in minutes.",
    status: "Future",
  },
  {
    id: 5,
    title: "Darpan",
    description: "What if government corruption could be detected automatically using only public data? An AI system that investigates procurement patterns, builds evidence, and turns transparency into action.",
    status: "Future",
  },
  {
    id: 6,
    title: "ComplianceOS",
    description: "Regulations change every day, but most companies find out too late. Building an AI compliance team that monitors laws, maps risk, and surfaces what matters before deadlines arrive.",
    status: "Future",
  },
  {
    id: 7,
    title: "Idea → SaaS",
    description: "What if a product idea was all you needed to launch a startup? Exploring a future where AI agents research, plan, build, test, and deploy SaaS products with minimal human effort.",
    status: "Future",
  },
  {
    id: 8,
    title: "LexGuard AI",
    description: "Legal cases generate thousands of documents, conversations, and pieces of evidence. Reimagining how lawyers and clients organize, analyze, and prepare cases using AI-powered legal intelligence.",
    status: "Future",
  },
  {
    id: 9,
    title: "Maya",
    description: "Landing opportunities often depends on sending the right message to the right person. An AI-powered outreach engine that turns cold contacts into meaningful conversations at scale.",
    status: "Future",
  }
];

const Ideas = () => {
  const getMailToLink = (title) =>
    `mailto:try.prit24@gmail.com?subject=Requesting%20PRD%20for%20${encodeURIComponent(title)}&body=Hi%20Prit,%0A%0AI%20am%20interested%20in%20learning%20more%20about%20the%20${encodeURIComponent(title)}%20project.%20Could%20you%20please%20share%20the%20detailed%20PRD%20with%20me?%0A%0AThanks!`;

  const getWhatsAppLink = (title) =>
    `https://wa.me/916353769515?text=${encodeURIComponent(`Hi Prit, I'd like to request the detailed PRD for your project idea: ${title}`)}`;

  const linkedInUrl = "https://www.linkedin.com/in/prit-patel-904272307";

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
      <div className="relative z-10 mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          Project Ideas Lab
        </h2>
        <p className="mt-4 text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
          A glimpse into the concepts I am actively building or planning to tackle next. See something interesting? Request the PRD!
        </p>
      </div>

      {/* Ideas Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
        {projectIdeas.map((idea) => (
          <CardContainer key={idea.id} className="inter-var w-full m-0 p-0">
            <CardBody className="bg-black relative group/card hover:shadow-2xl hover:shadow-white/[0.1] border-white/[0.2] w-full h-full rounded-2xl p-6 md:p-8 border transition-all duration-500 flex flex-col">
              {/* Subtle Gradient background on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <CardItem
                  translateZ="50"
                  className="text-xl md:text-2xl font-bold text-white leading-tight"
                >
                  {idea.title}
                </CardItem>
                <CardItem
                  translateZ="60"
                  className={cn(
                    "px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full border whitespace-nowrap self-start sm:self-center",
                    idea.status === "Current" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                  )}
                >
                  {idea.status}
                </CardItem>
              </div>

              <CardItem
                as="p"
                translateZ="60"
                className="relative z-10 text-neutral-300 text-sm md:text-base leading-relaxed flex-grow mb-8"
              >
                {idea.description}
              </CardItem>

              {/* Request PRD Action Row */}
              <div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardItem translateZ="30" className="text-neutral-400 text-sm font-semibold">
                  Request detailed PRD:
                </CardItem>

                <CardItem translateZ="40" className="flex items-center gap-3">
                  <a
                    href={getWhatsAppLink(idea.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-green-400 transition-all duration-300"
                    title="Request via WhatsApp"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                  </a>
                  <a
                    href={getMailToLink(idea.title)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-all duration-300"
                    title="Request via Email"
                  >
                    <FaEnvelope className="w-4 h-4" />
                  </a>
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-blue-400 transition-all duration-300"
                    title="Message on LinkedIn"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </CardItem>
              </div>

            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
