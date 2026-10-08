import { Site, SiteSchema } from '@/lib/schema';

export const site: Site = SiteSchema.parse({
  name: 'Prit Patel',
  monogram: 'PP',
  roleLine: 'Full-Stack & AI Systems Developer',
  location: 'Vadodara, India',
  timezone: 'Asia/Kolkata',
  availability: {
    status: 'open',
    label: 'Available for high-impact roles & technical consulting',
    types: ['Full-time', 'Contract', 'AI Engineering'],
  },
  positioning: {
    lead: 'Engineering resilient systems and',
    italicPhrase: 'intelligent autonomous agents',
    trail: 'at the intersection of AI, scale, and uncompromising craft.',
  },
  about: [
    'I build at the intersection of AI, systems, and design. Code for me is about engineering systems that think, adapt, and scale—from autonomous agent swarms to large-scale market simulations and production LLM pipelines.',
    'Currently pursuing Computer Science with a 9.67 GPA, I have solved 400+ problems on LeetCode and built production-grade platforms across real-time architectures, RAG pipelines, and security automation.',
    'I learn by building fast, stress-testing under real workloads, and shipping clean, maintainable systems that solve tangible problems.',
  ],
  currentlyBuilding: 'RedForge autonomous security assessment platform',
  githubUsername: 'pritpatel2412',
  email: 'try.prit24@gmail.com',
  links: {
    github: 'https://github.com/pritpatel2412',
    linkedin: 'https://www.linkedin.com/in/prit-patel-904272307',
    leetcode: 'https://leetcode.com/u/prit__2412/',
    instagram: 'https://www.instagram.com/prit__2412/',
    resume: 'https://drive.google.com/file/d/1Bt-CZQPBR7nR3JIpSOiYxlooDv3V93MS/view?usp=drive_link',
  },
  services: [
    {
      name: 'Agentic AI & RAG Pipelines',
      audience: 'Startups & engineering teams building LLM products',
      outcome: 'Low-latency search, grounding, and parallel tool-calling agent systems.',
    },
    {
      name: 'Full-Stack Web Architecture',
      audience: 'Product companies needing production scale',
      outcome: 'End-to-end web apps with strict type safety, real-time sync, and fluid UX.',
    },
    {
      name: 'Developer Tooling & Security Automation',
      audience: 'Teams scaling code quality and automated audits',
      outcome: 'CLI tools, AST-level parsers, compilers, and vulnerability scanning engines.',
    },
  ],
});
