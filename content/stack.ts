import { StackItem, StackItemSchema } from '@/lib/schema';

export const stackItems: StackItem[] = [
  // Languages
  StackItemSchema.parse({ name: 'Python', domain: 'languages', level: 'core', projects: ['redforge', 'searchmind', 'kemlang', 'aria', 'scraply'] }),
  StackItemSchema.parse({ name: 'TypeScript', domain: 'languages', level: 'core', projects: ['redforge', 'kyren', 'codeguard', 'kemlang'] }),
  StackItemSchema.parse({ name: 'JavaScript', domain: 'languages', level: 'core', projects: ['kyren', 'codeguard'] }),
  StackItemSchema.parse({ name: 'Java', domain: 'languages', level: 'fluent', projects: [] }),
  StackItemSchema.parse({ name: 'SQL', domain: 'languages', level: 'core', projects: ['redforge', 'searchmind', 'kyren'] }),

  // AI & Systems
  StackItemSchema.parse({ name: 'LLM Pipelines', domain: 'ai-systems', level: 'core', projects: ['redforge', 'kyren', 'codeguard', 'aria'] }),
  StackItemSchema.parse({ name: 'RAG Architectures', domain: 'ai-systems', level: 'core', projects: ['searchmind', 'kyren'] }),
  StackItemSchema.parse({ name: 'Autonomous Agents', domain: 'ai-systems', level: 'core', projects: ['redforge', 'searchmind', 'aria'] }),
  StackItemSchema.parse({ name: 'Browser Automation', domain: 'ai-systems', level: 'fluent', projects: ['aria', 'searchmind'] }),

  // Backend
  StackItemSchema.parse({ name: 'FastAPI', domain: 'backend', level: 'core', projects: ['redforge', 'searchmind', 'kemlang', 'aria'] }),
  StackItemSchema.parse({ name: 'Node.js', domain: 'backend', level: 'core', projects: ['kyren', 'codeguard'] }),
  StackItemSchema.parse({ name: 'Express', domain: 'backend', level: 'fluent', projects: ['kyren'] }),
  StackItemSchema.parse({ name: 'WebSockets', domain: 'backend', level: 'fluent', projects: ['aria'] }),

  // Frontend
  StackItemSchema.parse({ name: 'React', domain: 'frontend', level: 'core', projects: ['redforge', 'searchmind', 'kyren', 'codeguard', 'kemlang', 'aria'] }),
  StackItemSchema.parse({ name: 'Next.js', domain: 'frontend', level: 'core', projects: ['kyren'] }),
  StackItemSchema.parse({ name: 'Tailwind CSS', domain: 'frontend', level: 'core', projects: ['redforge', 'searchmind', 'kyren', 'codeguard'] }),
  StackItemSchema.parse({ name: 'GSAP', domain: 'frontend', level: 'fluent', projects: [] }),
  StackItemSchema.parse({ name: 'Three.js', domain: 'frontend', level: 'fluent', projects: [] }),

  // Data & Cloud
  StackItemSchema.parse({ name: 'PostgreSQL', domain: 'data-cloud', level: 'core', projects: ['redforge', 'searchmind', 'kyren'] }),
  StackItemSchema.parse({ name: 'Redis', domain: 'data-cloud', level: 'core', projects: ['redforge', 'searchmind'] }),
  StackItemSchema.parse({ name: 'Docker', domain: 'data-cloud', level: 'fluent', projects: ['redforge'] }),
  StackItemSchema.parse({ name: 'Git', domain: 'data-cloud', level: 'core', projects: ['redforge', 'searchmind', 'kyren', 'codeguard', 'kemlang'] }),
];
