import { Role, RoleSchema } from '@/lib/schema';

export const roles: Role[] = [
  RoleSchema.parse({
    id: 'staychat-ai',
    company: 'StayChat AI',
    role: 'AI Developer Intern',
    start: 'June 2026',
    end: 'Present',
    current: true,
    mode: 'remote',
    location: 'Remote',
    paragraphs: [
      'Contributing to core AI infrastructure focusing on production LLM pipelines, Retrieval-Augmented Generation (RAG) architectures, and high-throughput backend services.',
      'Optimizing query grounding latency, prompt serialization, and token efficiency for real-time intelligent user experiences.',
    ],
    shipped: [
      'Engineered low-latency document chunking and vector retrieval pipelines',
      'Deployed evaluation suites tracking model hallucination rates under conversational stress',
      'Implemented rate-limited inference gateways with Redis caching',
    ],
    stack: ['Python', 'FastAPI', 'RAG', 'Vector DB', 'LangChain', 'Docker'],
    adviceToPastSelf: 'Focus heavily on evaluation harnesses before tweaking prompts; you cannot optimize what you do not quantitatively measure.',
    source: {
      commitHash: '8f92a1c',
      additions: 12480,
      deletions: 3120,
      filesChanged: 84,
    },
  }),

  RoleSchema.parse({
    id: 'horizontechx',
    company: 'HorizonTechX',
    role: 'Full Stack Developer Intern',
    start: 'April 2026',
    end: 'May 2026',
    current: false,
    mode: 'remote',
    location: 'Remote',
    paragraphs: [
      'Built LUMINA, a full-stack social media application with end-to-end authentication, content publishing, real-time engagement features, and media delivery pipelines.',
      'Led database schema design, RESTful API architecture, and responsive client user interfaces to deliver a production-ready web platform.',
    ],
    shipped: [
      'Designed normalized relational database models supporting social graph queries',
      'Built secure JWT authentication and role-based access control workflows',
      'Implemented media upload and image compression microservices',
    ],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    adviceToPastSelf: 'Design database indexes based on real query read-patterns from day one, not as an afterthought during latency triage.',
    source: {
      commitHash: '4b3d78e',
      additions: 8940,
      deletions: 2140,
      filesChanged: 62,
    },
  }),

  RoleSchema.parse({
    id: 'futuretech-innovations',
    company: 'FutureTech Innovations',
    role: 'Web Developer Intern',
    start: 'May 2025',
    end: 'June 2025',
    current: false,
    mode: 'remote',
    location: 'Remote',
    paragraphs: [
      'Led the engineering of KemLang, a Gujarati programming language designed to introduce computer science logic to native language speakers.',
      'Engineered the complete language toolchain from compiler and interpreter pipeline to an interactive browser playground and official VS Code syntax extension.',
    ],
    shipped: [
      'Implemented lexical tokenizer and recursive-descent AST parser',
      'Built browser-based interactive code runner and Monaco Editor integration',
      'Published VS Code extension providing native syntax highlighting for 500+ users',
    ],
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Monaco Editor'],
    adviceToPastSelf: 'Syntax ergonomics matter infinitely more than feature quantity for beginner learning curves.',
    source: {
      commitHash: '1e4a90f',
      additions: 6420,
      deletions: 890,
      filesChanged: 45,
    },
  }),
];
