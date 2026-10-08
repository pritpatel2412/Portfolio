import { z } from 'zod';

export const MediaSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  blurDataURL: z.string().optional(),
});

export type Media = z.infer<typeof MediaSchema>;

export const DecisionSchema = z.object({
  title: z.string(),
  chose: z.string(),
  over: z.string(),
  because: z.string(),
});

export const MetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  note: z.string().optional(),
});

export const ProofBlockSchema = z.object({
  type: z.enum([
    'latencyWaterfall',
    'architectureDiagram',
    'deviceFrame',
    'beforeAfter',
    'codeBlock',
    'metricGrid',
  ]),
  title: z.string(),
  data: z.record(z.any()),
});

export type ProofBlock = z.infer<typeof ProofBlockSchema>;

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  year: z.number(),
  kind: z.enum(['product', 'client', 'personal', 'community']),
  role: z.string(),
  oneLiner: z
    .string()
    .max(160)
    .refine((val) => val.trim().split(/\s+/).length <= 18, {
      message: 'Project one-liner must be 18 words or fewer',
    }),
  flagship: z.boolean().optional(),
  tags: z.array(z.string()),
  stack: z.array(z.string()),
  links: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    })
  ),
  cover: MediaSchema,
  gallery: z.array(MediaSchema).default([]),
  metrics: z.array(MetricSchema).default([]),
  story: z.object({
    problem: z.string(),
    constraints: z.array(z.string()),
    approach: z.string(),
    result: z.string(),
    learned: z.string(),
  }),
  source: z.object({
    decisions: z.array(DecisionSchema),
    architecture: z.string().optional(),
    stats: z.record(z.string()).optional(),
  }),
  proof: z.array(ProofBlockSchema).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const RoleSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  start: z.string(),
  end: z.string(),
  current: z.boolean().default(false),
  mode: z.enum(['on-site', 'remote', 'hybrid']),
  location: z.string(),
  url: z.string().optional(),
  logo: z.string().optional(),
  paragraphs: z.array(z.string()),
  shipped: z.array(z.string()),
  stack: z.array(z.string()),
  adviceToPastSelf: z.string(),
  source: z.object({
    commitHash: z.string(),
    additions: z.number(),
    deletions: z.number(),
    filesChanged: z.number(),
  }),
});

export type Role = z.infer<typeof RoleSchema>;

export const StackItemSchema = z.object({
  name: z.string(),
  domain: z.enum(['languages', 'frontend', 'backend', 'ai-systems', 'data-cloud']),
  level: z.enum(['core', 'fluent', 'familiar']),
  projects: z.array(z.string()), // slugs of projects where used
});

export type StackItem = z.infer<typeof StackItemSchema>;

export const SiteSchema = z.object({
  name: z.string(),
  monogram: z.string(),
  roleLine: z.string(),
  location: z.string(),
  timezone: z.string(),
  availability: z.object({
    status: z.enum(['open', 'limited', 'unavailable']),
    label: z.string(),
    types: z.array(z.string()),
  }),
  positioning: z.object({
    lead: z.string(),
    italicPhrase: z.string(),
    trail: z.string(),
  }),
  about: z.array(z.string()),
  currentlyBuilding: z.string(),
  githubUsername: z.string(),
  email: z.string().email(),
  links: z.object({
    github: z.string(),
    linkedin: z.string(),
    leetcode: z.string(),
    instagram: z.string().optional(),
  }),
  services: z.array(
    z.object({
      name: z.string(),
      audience: z.string(),
      outcome: z.string(),
    })
  ),
});

export type Site = z.infer<typeof SiteSchema>;
