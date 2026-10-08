import { Project, ProjectSchema } from '@/lib/schema';

export const projects: Project[] = [
  ProjectSchema.parse({
    slug: 'redforge',
    title: 'RedForge',
    year: 2026,
    kind: 'product',
    role: 'Lead Architect',
    oneLiner: 'Autonomous web security assessment engine orchestrating parallel vulnerability scans and AI attack-chain verification.',
    flagship: true,
    tags: ['Security', 'Autonomous Agents', 'FastAPI', 'Distributed Systems'],
    stack: ['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'Redis', 'React', 'TypeScript'],
    links: [
      { label: 'Repository', href: 'https://github.com/pritpatel2412/RedForge' },
    ],
    cover: {
      src: '/RedForge.png',
      alt: 'RedForge security assessment dashboard with attack-chain analysis',
    },
    metrics: [
      { label: 'Scan Acceleration', value: '4.2x', note: 'over sequential HTTP probing engines' },
      { label: 'False-Positive Drop', value: '38%', note: 'via multi-step exploit verification' },
      { label: 'Concurrency', value: '1,200', note: 'simultaneous non-blocking sockets' },
    ],
    story: {
      problem:
        'Traditional web vulnerability scanners produce thousands of noisy, uncontextualized alerts with catastrophic false-positive rates, while manual penetration testing cannot keep pace with continuous deployment velocity.',
      constraints: [
        'Zero target downtime or unintended denial-of-service during active scanning',
        'Strict rate-limiting calibration per target host and edge WAF',
        'Sub-second correlation between independent vulnerability indicators',
      ],
      approach:
        'Built an event-driven worker mesh using asyncio and Redis Streams. As reconnaissance workers identify endpoints, candidate payloads are fed through an AST validation stage before targeted injection. Verified signals trigger an LLM-assisted correlation engine that chains findings into an actionable exploit graph.',
      result:
        'Delivered an automated scanner that completes full-suite OWASP Top 10 audits in minutes rather than hours, reducing triage overhead by over a third while surfacing complete proof-of-concept reproduction scripts.',
      learned:
        'Defensive automation demands strict backpressure and defensive socket teardown; without rigorous socket cleanup, network noise rapidly disguises itself as genuine application response anomalies.',
    },
    source: {
      decisions: [
        {
          title: 'Concurrency Model',
          chose: 'Asyncio event loops with Redis Streams',
          over: 'Multiprocessing pool with Celery',
          because: 'Network I/O waiting accounts for 90% of cycle time; non-blocking green threads consumed 75% less RAM under 1,000+ active connections.',
        },
        {
          title: 'Payload Analysis Engine',
          chose: 'Custom AST token stream matcher',
          over: 'Regular expression filters',
          because: 'Regex engines suffer catastrophic backtracking on malformed HTML/JS and fail to recognize structural AST obfuscation.',
        },
        {
          title: 'Verification Strategy',
          chose: 'Deterministic replay in sandboxed micro-containers',
          over: 'Heuristic confidence scores',
          because: 'Security teams distrust probabilistic scores; deterministic reproduction proof eliminates alert fatigue.',
        },
      ],
      architecture: 'Client UI -> API Gateway (FastAPI) -> Redis Stream -> Worker Pool (Asyncio) -> Postgres Audit Store',
      stats: {
        'Codebase Size': '14,200 LOC',
        'Avg Memory footprint': '380MB',
        'Test Suite Coverage': '88%',
      },
    },
    proof: [
      {
        type: 'metricGrid',
        title: 'Core Engine Throughput',
        data: {
          'Target Endpoints / min': '1,200',
          'P99 Dispatch Latency': '48ms',
          'Payload Verification Rate': '99.4%',
        },
      },
      {
        type: 'latencyWaterfall',
        title: 'Exploit Chain Verification Budget',
        data: {
          stages: [
            { name: 'DNS & SSL Reconnaissance', durationMs: 42 },
            { name: 'Endpoint Spidering', durationMs: 110 },
            { name: 'AST Fuzz Generation', durationMs: 35 },
            { name: 'Concurrent Injections', durationMs: 240 },
            { name: 'Attack-Chain Verification', durationMs: 65 },
          ],
        },
      },
    ],
  }),

  ProjectSchema.parse({
    slug: 'searchmind',
    title: 'SearchMind API',
    year: 2025,
    kind: 'product',
    role: 'Backend Architect',
    oneLiner: 'High-throughput search and structured extraction API purpose-built for low-latency autonomous agent RAG pipelines.',
    flagship: true,
    tags: ['AI Search', 'RAG', 'FastAPI', 'Redis', 'PostgreSQL'],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'React', 'Tailwind CSS'],
    links: [
      { label: 'Repository', href: 'https://github.com/pritpatel2412/SearchMind-API' },
    ],
    cover: {
      src: '/Searchmind API.png',
      alt: 'SearchMind API developer console and latency monitor',
    },
    metrics: [
      { label: 'P95 Chunk Latency', value: '< 240ms', note: 'for cached live DOM extractions' },
      { label: 'Cache Hit Ratio', value: '64%', note: 'via locality-sensitive query hashing' },
      { label: 'Daily Agent Queries', value: '25k+', note: 'handled across real-time test clusters' },
    ],
    story: {
      problem:
        'Standard search APIs are designed for human eyes: they return heavy bloated HTML, tracking scripts, and pagination junk that burns LLM token context windows and induces multi-second latency.',
      constraints: [
        'Strict token economy: output must be distilled Markdown or structured JSON',
        'Sub-300ms roundtrips for LLM agents running fast tool-calling loops',
        'Ethical scraping etiquette with instantaneous robot.txt compliance',
      ],
      approach:
        'Engineered an edge scraper and content condenser using FastAPI, Redis caching, and headless browser pooling. Pages are stripped down to semantic AST nodes, cleaned of boilerplate, and chunked by topic with similarity hashes before being dispatched to agent clients.',
      result:
        'Cut token consumption for downstream LLM agents by 74% compared to raw HTML extractors, enabling autonomous research agents to query the live web with near-instantaneous responses.',
      learned:
        'Agentic consumers care about text density and structure, not visuals. Stripping 95% of HTML payload before tokenization improves downstream reasoning accuracy noticeably.',
    },
    source: {
      decisions: [
        {
          title: 'Extraction Pipeline',
          chose: 'Compiled Readability Rust port + Trafilatura',
          over: 'Headless Chrome screenshot OCR',
          because: 'Headless browser engines consume 10x memory and add 1.2s overhead; fast DOM traversal extracts 98% of clean text in under 40ms.',
        },
        {
          title: 'Caching Key Design',
          chose: 'Normalized semantic query embeddings + URL hash',
          over: 'Exact string match',
          because: 'LLM agents formulate slightly varied search phrases for identical targets; semantic caching boosted hit rates from 18% to 64%.',
        },
      ],
      architecture: 'Agent Client -> FastAPI -> Semantic Cache (Redis) -> Extract Cluster -> Clean Markdown Stream',
      stats: {
        'Throughput Capacity': '450 req/sec',
        'Token Savings': '74% average',
      },
    },
    proof: [
      {
        type: 'latencyWaterfall',
        title: 'End-to-End Extraction Waterfall',
        data: {
          stages: [
            { name: 'Semantic Query Hash Lookup', durationMs: 12 },
            { name: 'Fast HTTP Head Request', durationMs: 48 },
            { name: 'DOM Tree Ingestion', durationMs: 82 },
            { name: 'Boilerplate Pruning & Markdown Format', durationMs: 54 },
            { name: 'JSON Streaming Response', durationMs: 18 },
          ],
        },
      },
    ],
  }),

  ProjectSchema.parse({
    slug: 'kyren',
    title: 'Kyren',
    year: 2025,
    kind: 'product',
    role: 'Full-Stack & AI Engineer',
    oneLiner: 'AI-powered learning OS generating university courses, proctored exams, and adaptive doubt resolution.',
    flagship: false,
    tags: ['Education OS', 'AI Proctoring', 'React', 'Next.js', 'LLM'],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    links: [
      { label: 'Live App', href: 'https://kyren.vercel.app/' },
    ],
    cover: {
      src: '/kyren_thumbnail.png',
      alt: 'Kyren educational OS interface with course tree',
    },
    metrics: [
      { label: 'Syllabus Parse Time', value: '< 18s', note: 'from syllabus PDF or YouTube playlist' },
      { label: 'Evaluated Students', value: '1,200+', note: 'across active university test sessions' },
      { label: 'Evaluation Accuracy', value: '94%', note: 'benchmark correlation against instructor grades' },
    ],
    story: {
      problem:
        'Students are drowned in unstructured online video and fragmented course notes, with no coherent syllabus mapping or rigorous examination feedback loop.',
      constraints: [
        'Browser-based AI proctoring without intrusive local executable installations',
        'Adaptive assessment generation matching exact university syllabus taxonomy',
      ],
      approach:
        'Architected PaperX (automated examination engine) and ProctorX (browser-based ambient vision proctor) with an LLM tutor pipeline that breaks topics into progressive cognitive milestones.',
      result:
        'Adopted by over 1,200 students to prepare for university examinations, reducing course study prep time by half while offering personalized feedback on written answers.',
      learned:
        'Student engagement hinges on immediate micro-feedback; batch grading leaves users disengaged, whereas streaming question critiques creates steady study momentum.',
    },
    source: {
      decisions: [
        {
          title: 'Proctoring Architecture',
          chose: 'Client-side MediaPipe inference via WebAssembly',
          over: 'Continuous server-side video streaming',
          because: 'Streaming video to servers incurs massive bandwidth bills and severe privacy exposure; on-device client ML keeps latency under 30ms and data local.',
        },
      ],
    },
  }),

  ProjectSchema.parse({
    slug: 'codeguard',
    title: 'CodeGuard',
    year: 2025,
    kind: 'product',
    role: 'Creator & Lead Developer',
    oneLiner: 'AI code security and PR risk analysis platform isolating high-risk architectural regressions before merge.',
    flagship: false,
    tags: ['DevSecOps', 'Code Review', 'React', 'TypeScript'],
    stack: ['React', 'TypeScript', 'Node.js', 'GitHub REST API', 'Tailwind CSS'],
    links: [
      { label: 'Live App', href: 'https://code-guard-45.vercel.app/' },
    ],
    cover: {
      src: '/codeguard_thumbnail.jpg',
      alt: 'CodeGuard pull request vulnerability scanner screen',
    },
    metrics: [
      { label: 'PR Scan Turnaround', value: '< 6s', note: 'AST chunk analysis per commit' },
      { label: 'Review Precision', value: '92%', note: 'zero reported false-positive PR blocks' },
    ],
    story: {
      problem:
        'DevSecOps reviews typically happen either too early (noisy IDE linting) or too late (production incident alerts), leaving pull requests as the missing enforcement frontier.',
      constraints: [
        'Must complete scans within standard CI execution windows without blocking development flows',
        'Context-aware: understand sibling imports and configuration changes beyond isolated diffs',
      ],
      approach:
        'Built a GitHub integration that reads PR diff hunks, resolves imported dependency references, and performs targeted security threat modeling with structured remediation suggestions.',
      result:
        'Allowed development teams to catch SQL vulnerabilities, secret leaks, and unauthenticated endpoints before code touched staging environments.',
      learned:
        'Developers ignore general security reminders. Suggestions must be inline code diffs that can be accepted with one click.',
    },
    source: {
      decisions: [
        {
          title: 'Diff Parsing',
          chose: 'Selective git unified diff chunking with AST expansion',
          over: 'Full-repository clone on every commit',
          because: 'Cloning gigabyte repos kills CI speed; fetching only the target file trees via GitHub Trees API reduced turnaround to 5.4 seconds.',
        },
      ],
    },
  }),

  ProjectSchema.parse({
    slug: 'kemlang',
    title: 'KemLang',
    year: 2025,
    kind: 'community',
    role: 'Language Author',
    oneLiner: 'Culturally rooted Gujarati toy programming language featuring an AST-based compiler, web playground, and VS Code extension.',
    flagship: false,
    tags: ['Compilers', 'AST', 'Programming Language', 'Python'],
    stack: ['Python', 'FastAPI', 'TypeScript', 'React', 'Monaco Editor'],
    links: [
      { label: 'Live Playground', href: 'https://kemlang.vercel.app/' },
    ],
    cover: {
      src: '/kemlang_thumbnail.png',
      alt: 'KemLang compiler web playground and syntax console',
    },
    metrics: [
      { label: 'WASM AST Parse', value: '12ms', note: 'client-side execution speed' },
      { label: 'VS Code Toolchain Installs', value: '500+', note: 'active developers exploring language' },
    ],
    story: {
      problem:
        'Coding syntax has historically been exclusively anglophone, creating unnecessary initial friction for native Indian students first learning programmatic reasoning.',
      constraints: [
        'Preserve rigorous computer science abstractions (lexing, grammar, AST, scoping, call stacks)',
        'Zero setup requirement for beginners: run entirely in the web browser',
      ],
      approach:
        'Designed grammar rules matching conversational Gujarati idioms. Built a recursive descent parser producing an intermediate AST, with an interactive web playground and custom language server for VS Code.',
      result:
        'Shared across regional developer groups, introducing hundreds of first-time programmers to variables, control flow, functions, and algorithmic concepts in their mother tongue.',
      learned:
        'Language is fundamentally about mental models. Grounding abstract programming concepts in familiar conversational idioms vastly reduces beginner cognitive load.',
    },
    source: {
      decisions: [
        {
          title: 'Parser Design',
          chose: 'Handwritten recursive descent parser',
          over: 'Lex/Yacc or ANTLR generation',
          because: 'Handwritten parsers provide vastly clearer, culturally accurate error messages with exact column highlighting for beginners.',
        },
      ],
    },
  }),

  ProjectSchema.parse({
    slug: 'aria',
    title: 'ARIA',
    year: 2025,
    kind: 'product',
    role: 'AI Systems Architect',
    oneLiner: 'Multilingual autonomous agent platform turning voice goals in 11 Indian languages into parallel browser actions.',
    flagship: false,
    tags: ['Multi-Agent', 'Voice AI', 'Browser Automation', 'Python'],
    stack: ['Python', 'FastAPI', 'Playwright', 'React', 'WebSockets'],
    links: [
      { label: 'Live Demo', href: 'https://heyaria.replit.app/' },
    ],
    cover: {
      src: '/aria_thumbnail.png',
      alt: 'ARIA voice agent running parallel browser execution sessions',
    },
    metrics: [
      { label: 'Concurrent Browser Swarms', value: '6 agents', note: 'executing live web navigation' },
      { label: 'Supported Indian Languages', value: '11', note: 'native speech synthesis pipeline' },
    ],
    story: {
      problem:
        'Voice assistants remain passive query responders rather than active task agents, and regional Indian language support has historically lacked autonomous action capabilities.',
      constraints: [
        'Real-time bi-directional audio streaming over WebSockets',
        'Coordinated multi-agent execution avoiding stale browser page race conditions',
      ],
      approach:
        'Built a streaming audio pipeline paired with a headless Playwright agent swarm. As the user speaks, intention classifiers spawn sub-agents to browse services, gather live data, and synthesize answers via natural voice.',
      result:
        'Demonstrated autonomous multi-tab research, price comparison, and ticket discovery triggered purely via colloquial Hindi and Gujarati voice commands.',
      learned:
        'Multi-agent systems fail most often during handoffs. Rigorous state synchronization primitives between parallel browser sessions are critical.',
    },
    source: {
      decisions: [
        {
          title: 'Streaming Transport',
          chose: 'Binary WebSockets with audio chunk buffering',
          over: 'Standard HTTP long polling',
          because: 'Sub-200ms audio turnaround requires continuous full-duplex socket streaming.',
        },
      ],
    },
  }),
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
