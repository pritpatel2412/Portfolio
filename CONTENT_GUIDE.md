# Content Guide — SURFACE / SOURCE Portfolio

This portfolio separates content from presentation completely. All content lives inside `/content` as strongly typed TypeScript and JSON files validated by Zod at build time.

## 1. Modifying Projects (`content/projects/index.ts`)
To add or update a project, ensure it adheres to the `ProjectSchema`:

```ts
ProjectSchema.parse({
  slug: 'my-project',
  title: 'Project Name',
  year: 2026,
  kind: 'product', // 'product' | 'client' | 'personal' | 'community'
  role: 'Lead Architect',
  oneLiner: 'Short sentence describing what you built and outcomes (<= 18 words).',
  flagship: true, // true for top 2 flagship features
  tags: ['AI Agents', 'FastAPI'],
  stack: ['Python', 'FastAPI', 'Redis'],
  links: [
    { label: 'Repository', href: 'https://github.com/...' },
  ],
  cover: {
    src: '/my_thumbnail.png', // stored in /public
    alt: 'Visual caption',
  },
  metrics: [
    { label: 'Scan Acceleration', value: '4.2x', note: 'over sequential engines' },
  ],
  story: {
    problem: 'Who had it and why it hurt...',
    constraints: ['Sub-second latency', 'Strict rate limits'],
    approach: 'How you engineered the solution...',
    result: 'Quantified outcomes...',
    learned: 'Honest lesson learned...',
  },
  source: {
    decisions: [
      {
        title: 'Decision Name',
        chose: 'What you picked',
        over: 'Alternative considered',
        because: 'The technical rationale',
      },
    ],
    architecture: 'API Gateway -> Worker Pool -> Redis',
    stats: {
      'Codebase Size': '14k LOC',
    },
  },
});
```

> **Rules**:
> - `oneLiner` must be **18 words or fewer**.
> - Never invent fake metrics or logos. If fewer than 3 verified metrics exist, omit the note or entry.

---

## 2. Modifying Work History (`content/roles.ts`)
Add or update career chapters in `roles.ts`:

```ts
RoleSchema.parse({
  id: 'company-name',
  company: 'Company',
  role: 'Your Title',
  start: 'June 2026',
  end: 'Present',
  current: true,
  mode: 'remote', // 'remote' | 'on-site' | 'hybrid'
  location: 'Remote',
  paragraphs: [
    'What you worked on...',
  ],
  shipped: [
    'Key accomplishment 1',
    'Key accomplishment 2',
  ],
  stack: ['Python', 'FastAPI', 'Docker'],
  adviceToPastSelf: 'One honest line...',
  source: {
    commitHash: '8f92a1c',
    additions: 12480,
    deletions: 3120,
    filesChanged: 84,
  },
});
```

---

## 3. Editing Owner Bio & Links (`content/site.ts`)
Update name, tagline, availability, or links in `site.ts`.

---

## 4. Updating Résumé (`content/resume.json`)
The résumé adheres to standard JSON Resume schema. Editing `resume.json` automatically updates both the interactive HTML sheet and the Source JSON inspector.
