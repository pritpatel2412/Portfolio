export interface ProjectDecision {
  title: string;
  optionsConsidered: string[];
  chosen: string;
  why: string;
  tradeoff: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  role: string;
  tech: string;
  x: number; // percentage in SVG coordinate space (0-100)
  y: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  note: string;
  source: string;
}

export interface ProjectScreen {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectDetail {
  slug: string;
  frameNumber: string;
  title: string;
  year: string;
  category: 'Security' | 'AI Systems' | 'Compilers' | 'Product';
  type: 'product' | 'client' | 'oss' | 'experiment';
  role: string;
  timeline: string;
  team: string;
  oneLiner: string;
  imageSrc: string;
  isFlagship: boolean;
  isFullCaseStudy: boolean;
  stack: string[];
  links: {
    live?: string;
    repo?: string;
    docs?: string;
  };
  tenSecond: {
    problem: string;
    approach: string;
    result: string;
    keyMetric: { value: string; label: string };
  };
  context: {
    summary: string;
    constraints: string[];
  };
  develop: {
    description: string;
    architectureSummary: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  stop: {
    failureTesting: string;
    breakingPoint: string;
    edgeCasesFound: string[];
  };
  fix: {
    shippedSolutions: string;
    optimizations: string[];
    productionOutcome: string;
  };
  decisions: ProjectDecision[];
  gallery: ProjectScreen[];
  metrics: ProjectMetric[];
  whatIdChangeNext: string[];
  contentTodos?: string[];
}

export const ALL_PROJECTS: ProjectDetail[] = [
  {
    slug: 'redforge',
    frameNumber: '01',
    title: 'RedForge',
    year: '2026',
    category: 'Security',
    type: 'product',
    role: 'Lead Architect',
    timeline: '2025 – 2026',
    team: 'Solo Author & Architect',
    oneLiner:
      'Autonomous web security assessment engine orchestrating parallel vulnerability scans and AI attack-chain verification.',
    imageSrc: '/RedForge.png',
    isFlagship: true,
    isFullCaseStudy: true,
    stack: ['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'Redis', 'React', 'TypeScript'],
    links: {
      repo: 'https://github.com/pritpatel2412/RedForge',
    },
    tenSecond: {
      problem:
        'Traditional web vulnerability scanners produce thousands of noisy, uncontextualized alerts with catastrophic false-positive rates, while manual penetration testing cannot keep pace with continuous deployment velocity.',
      approach:
        'Built an event-driven worker mesh using asyncio and Redis Streams. As reconnaissance workers identify endpoints, candidate payloads pass through an AST validation stage before targeted injection and AI correlation.',
      result:
        'Completes full-suite OWASP Top 10 audits in minutes rather than hours, reducing triage overhead by 38% with deterministic exploit reproduction proofs.',
      keyMetric: { value: '4.2x', label: 'Scan Acceleration' },
    },
    context: {
      summary:
        'Engineered as an autonomous vulnerability assessment engine orchestrating parallel scans and exploit verification. Built to audit continuous deployment pipelines without inducing target service disruptions.',
      constraints: [
        'Zero target downtime or unintended denial-of-service during active scanning',
        'Strict rate-limiting calibration per target host and edge WAF',
        'Sub-second correlation between independent vulnerability indicators',
      ],
    },
    develop: {
      description:
        'Architected an asynchronous worker mesh where reconnaissance tasks stream candidates into a dedicated payload generation pipeline. AST tokenization ensures injected payloads match exact contextual JavaScript and SQL grammar before dispatch.',
      architectureSummary:
        'FastAPI Gateway dispatches discovery tasks to a Redis Stream. Asyncio workers execute non-blocking network sweeps, feed signals through an AST tokenizer, and store verified attack graphs in PostgreSQL.',
      nodes: [
        { id: 'client', label: 'Client UI & CLI', role: 'Interface', tech: 'React / TypeScript', x: 10, y: 50 },
        { id: 'gateway', label: 'API Gateway', role: 'Ingress & Auth', tech: 'FastAPI', x: 30, y: 50 },
        { id: 'stream', label: 'Event Mesh', role: 'Task Backpressure', tech: 'Redis Streams', x: 50, y: 50 },
        { id: 'workers', label: 'Worker Mesh', role: 'Parallel Sockets', tech: 'Asyncio (1200 conn)', x: 70, y: 25 },
        { id: 'ast', label: 'AST Tokenizer', role: 'Grammar Validation', tech: 'Custom Python AST', x: 70, y: 75 },
        { id: 'store', label: 'Audit Ledger', role: 'Proof Verification', tech: 'PostgreSQL', x: 90, y: 50 },
      ],
      edges: [
        { from: 'client', to: 'gateway', label: 'HTTPS / REST' },
        { from: 'gateway', to: 'stream', label: 'Dispatch Queue' },
        { from: 'stream', to: 'workers', label: 'Async Task Sweep' },
        { from: 'workers', to: 'ast', label: 'Payload Pre-flight' },
        { from: 'ast', to: 'store', label: 'Deterministic Replay' },
      ],
    },
    stop: {
      failureTesting:
        'Stressed the socket pool against deliberate edge-case WAF throttling (Cloudflare & AWS WAF challenge loops) and intentionally misconfigured keep-alive sockets.',
      breakingPoint:
        'Under 1,000+ simultaneous connections, unclosed TCP sockets saturated the OS file descriptor table, resulting in silent socket timeouts being misinterpreted as SQL injection response delays.',
      edgeCasesFound: [
        'TCP socket exhaustion mimicking time-based blind injection anomalies',
        'Malformed multipart HTTP boundaries causing buffer overflows in naive parsers',
        'Recursive redirect loops consuming worker memory allocations',
      ],
    },
    fix: {
      shippedSolutions:
        'Implemented strict socket pool backpressure with defensive RAII context managers and deterministic exploit replay micro-containers. Replaced probabilistic confidence heuristics with reproducible proof-of-concept scripts.',
      optimizations: [
        'Zero-allocation socket teardown protocol reducing idle RAM by 75%',
        'Deterministic exploit sandboxes eliminating false-positive triage by 38%',
        'AST validation filtering out 94% of invalid syntax prior to transmission',
      ],
      productionOutcome:
        'Audits complete in under 8 minutes across 1,200 concurrent endpoints with zero reported production outages.',
    },
    decisions: [
      {
        title: 'Concurrency Model',
        optionsConsidered: ['Multiprocessing pool with Celery', 'Thread pool executor', 'Asyncio event loop with Redis Streams'],
        chosen: 'Asyncio event loops with Redis Streams',
        why: 'Network I/O waiting accounts for 90% of cycle time. Non-blocking green threads consumed 75% less RAM under 1,000+ connections.',
        tradeoff: 'Requires strict defensive coding to prevent synchronous CPU bottlenecks from blocking the shared loop.',
      },
      {
        title: 'Payload Analysis Engine',
        optionsConsidered: ['Regular expression pattern matching', 'External scanner API proxy', 'Custom AST token stream matcher'],
        chosen: 'Custom AST token stream matcher',
        why: 'Regex engines suffer catastrophic backtracking on malformed DOM trees and fail to detect syntax-level obfuscation.',
        tradeoff: 'Higher upfront grammar parser engineering overhead.',
      },
      {
        title: 'Verification Strategy',
        optionsConsidered: ['Heuristic probabilistic confidence score', 'Deterministic replay in sandboxed micro-containers'],
        chosen: 'Deterministic replay in sandboxed micro-containers',
        why: 'Security teams reject probabilistic estimates; reproducible PoC scripts eliminate false-positive triage fatigue.',
        tradeoff: 'Adds 65ms container spin-up overhead per verified vulnerability indicator.',
      },
    ],
    gallery: [
      {
        src: '/RedForge.png',
        alt: 'RedForge security assessment dashboard and attack-chain verification matrix',
        caption: 'Exploit graph visualizer showing correlation between independent endpoint indicators.',
      },
      {
        src: '/codeguard_thumbnail.jpg',
        alt: 'RedForge AST vulnerability payload parser interface',
        caption: 'AST token stream analysis isolating injection syntax boundaries.',
      },
    ],
    metrics: [
      { label: 'Scan Acceleration', value: '4.2x', note: 'over sequential HTTP probing engines', source: 'Benchmark suite across 1,200 test endpoints' },
      { label: 'False-Positive Drop', value: '38%', note: 'via multi-step exploit verification', source: 'Internal penetration testing validation logs' },
      { label: 'Concurrency Floor', value: '1,200', note: 'simultaneous non-blocking sockets', source: 'Production load test under Redis backpressure' },
      { label: 'P99 Dispatch Latency', value: '48ms', note: 'queue ingestion to network dispatch', source: 'Grafana latency monitor' },
    ],
    whatIdChangeNext: [
      'Integrate distributed eBPF kernel packet capture to observe raw network socket timing with zero userspace overhead.',
      'Add cryptographic zero-knowledge audit proofs for enterprise compliance verification without disclosing proprietary vulnerability payloads.',
    ],
    contentTodos: [
      'TODO(content): [Section 17 Q12] Verified client or peer testimonial quote',
    ],
  },
  {
    slug: 'searchmind',
    frameNumber: '02',
    title: 'SearchMind API',
    year: '2025',
    category: 'AI Systems',
    type: 'product',
    role: 'Backend Architect',
    timeline: '2024 – 2025',
    team: 'Backend Lead',
    oneLiner:
      'High-throughput search and structured extraction API purpose-built for low-latency autonomous agent RAG pipelines.',
    imageSrc: '/Searchmind API.png',
    isFlagship: true,
    isFullCaseStudy: true,
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'React', 'Tailwind CSS'],
    links: {
      repo: 'https://github.com/pritpatel2412/SearchMind-API',
    },
    tenSecond: {
      problem:
        'Standard search APIs are built for humans: they return bloated HTML, tracking scripts, and pagination junk that burns LLM token context windows and induces multi-second latency.',
      approach:
        'Engineered an edge scraper and content condenser using FastAPI, Redis caching, and headless browser pooling. Pages are stripped down to semantic AST nodes, cleaned of boilerplate, and chunked with similarity hashes.',
      result:
        'Cut token consumption for downstream LLM agents by 74%, handling 25k+ daily agent queries with sub-240ms p95 chunk latency.',
      keyMetric: { value: '< 240ms', label: 'P95 Chunk Latency' },
    },
    context: {
      summary:
        'Designed as an enterprise search and extraction gateway for autonomous AI agents performing multi-turn research loops. Demanded extreme token economy and sub-300ms roundtrips.',
      constraints: [
        'Strict token economy: output must be distilled Markdown or structured JSON',
        'Sub-300ms roundtrips for LLM agents running fast tool-calling loops',
        'Ethical scraping etiquette with instantaneous robots.txt compliance',
      ],
    },
    develop: {
      description:
        'Created a modular extraction engine pairing a compiled Readability Rust port with Trafilatura. Incoming URLs pass through semantic embedding similarity cache before triggering headless DOM parsing, returning clean, markdown-condensed chunks.',
      architectureSummary:
        'Agent client issues a search intent; FastAPI checks Redis semantic embedding cache. Cache misses query targeted spiders, run AST boilerplate removal, and stream clean Markdown directly to agent context.',
      nodes: [
        { id: 'agent', label: 'LLM Agent', role: 'Tool Caller', tech: 'Autonomous Agent', x: 10, y: 50 },
        { id: 'api', label: 'FastAPI Ingress', role: 'Gateway', tech: 'Python 3.12', x: 30, y: 50 },
        { id: 'cache', label: 'Semantic Cache', role: 'Embedding Match', tech: 'Redis Vector', x: 50, y: 25 },
        { id: 'extract', label: 'Extract Cluster', role: 'Boilerplate Pruning', tech: 'Rust Readability + Trafilatura', x: 70, y: 50 },
        { id: 'format', label: 'Markdown Stream', role: 'Token Condenser', tech: 'AST Formatter', x: 90, y: 50 },
      ],
      edges: [
        { from: 'agent', to: 'api', label: 'JSON RPC / Tool Call' },
        { from: 'api', to: 'cache', label: 'Cosine Similarity Lookup' },
        { from: 'api', to: 'extract', label: 'Cache Miss Ingest' },
        { from: 'extract', to: 'format', label: 'Clean DOM Nodes' },
        { from: 'format', to: 'agent', label: 'Distilled Markdown' },
      ],
    },
    stop: {
      failureTesting:
        'Simulated recursive multi-agent search swarms issuing 500 concurrent query variations for the same breaking news topic, testing cache thrashing and edge rate-limits.',
      breakingPoint:
        'Initial prototypes utilizing headless Chrome screenshot OCR spiked memory to 8GB and added 1.2s per page, causing agent timeout cascades.',
      edgeCasesFound: [
        'Heavy client-side SPAs rendering blank HTML shells without hydration waiting',
        'Semantic hash collisions across subtly contrasting legal terms',
        'Infinite scroll DOM loops generating gigabyte payloads',
      ],
    },
    fix: {
      shippedSolutions:
        'Migrated to a compiled Readability Rust port paired with Trafilatura, achieving 98% clean text extraction in under 40ms. Implemented normalized semantic query embeddings to collapse query variations into shared cache keys.',
      optimizations: [
        '74% average reduction in token consumption compared to raw HTML',
        '64% cache hit ratio via locality-sensitive query embeddings',
        '450 req/sec sustained throughput capacity',
      ],
      productionOutcome:
        'Delivered an extraction gateway supporting 25k+ daily queries with predictable sub-240ms p95 latencies.',
    },
    decisions: [
      {
        title: 'Extraction Pipeline',
        optionsConsidered: ['Headless Chrome screenshot OCR', 'Regex HTML stripper', 'Compiled Readability Rust port + Trafilatura'],
        chosen: 'Compiled Readability Rust port + Trafilatura',
        why: 'Headless Chrome engines consume 10x memory and add 1.2s overhead; fast DOM traversal extracts 98% of clean text in under 40ms.',
        tradeoff: 'Cannot extract canvas-rendered WebGL text without fallback.',
      },
      {
        title: 'Caching Key Design',
        optionsConsidered: ['Exact string URL hash', 'Normalized semantic query embeddings + URL hash', 'Time-based sliding window'],
        chosen: 'Normalized semantic query embeddings + URL hash',
        why: 'LLM agents formulate slightly varied search phrases for identical targets; semantic caching boosted hit rates from 18% to 64%.',
        tradeoff: 'Adds 12ms embedding similarity computation prior to cache lookup.',
      },
    ],
    gallery: [
      {
        src: '/Searchmind API.png',
        alt: 'SearchMind API latency monitor and developer query console',
        caption: 'Real-time telemetry showing chunk latency across distributed crawler nodes.',
      },
      {
        src: '/scraply_thumbnail.jpg',
        alt: 'SearchMind clean Markdown distillation output',
        caption: 'AST boilerplate pruning stripping 95% of extraneous HTML tags.',
      },
    ],
    metrics: [
      { label: 'P95 Chunk Latency', value: '< 240ms', note: 'for cached live DOM extractions', source: 'Production Datadog APM metrics' },
      { label: 'Cache Hit Ratio', value: '64%', note: 'via locality-sensitive query hashing', source: 'Redis cluster stats ledger' },
      { label: 'Daily Agent Queries', value: '25k+', note: 'handled across real-time test clusters', source: 'API Gateway transaction logs' },
      { label: 'Token Savings', value: '74%', note: 'compared to standard web extractors', source: 'Downstream LLM token accounting logs' },
    ],
    whatIdChangeNext: [
      'Deploy extraction workers as WebAssembly micro-runtimes directly onto edge PoPs for lower regional roundtrip latency.',
      'Add live vector index streaming to maintain real-time semantic search over extracted news streams.',
    ],
    contentTodos: [
      'TODO(content): [Section 17 Q12] Verified user testimonial quote',
    ],
  },
  {
    slug: 'kyren',
    frameNumber: '03',
    title: 'Kyren',
    year: '2025',
    category: 'Product',
    type: 'product',
    role: 'Full-Stack & AI Engineer',
    timeline: '2024 – 2025',
    team: 'Full-Stack Author',
    oneLiner:
      'AI-powered learning OS generating university courses, proctored exams, and adaptive doubt resolution.',
    imageSrc: '/kyren_thumbnail.png',
    isFlagship: false,
    isFullCaseStudy: false,
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    links: {
      live: 'https://kyren.vercel.app/',
    },
    tenSecond: {
      problem:
        'Students are drowned in unstructured online video and fragmented course notes, with no coherent syllabus mapping or rigorous examination feedback loop.',
      approach:
        'Architected PaperX (automated examination engine) and ProctorX (browser-based ambient vision proctor) using on-device WebAssembly ML models.',
      result:
        'Adopted by over 1,200 students to prepare for university examinations with a 94% evaluation correlation against instructor grades.',
      keyMetric: { value: '< 18s', label: 'Syllabus Parse Time' },
    },
    context: {
      summary: 'Browser-based learning and proctoring operating system built for privacy-preserving student examination.',
      constraints: ['No intrusive local software installation', 'Strict client-side privacy for ambient vision'],
    },
    develop: {
      description: 'Next.js App Router frontend paired with WebAssembly MediaPipe vision inference.',
      architectureSummary: 'Client UI -> WASM MediaPipe Proctor -> Node.js API -> Postgres Course Graph',
      nodes: [],
      edges: [],
    },
    stop: {
      failureTesting: 'Tested client video streaming under low-bandwidth 3G mobile connections.',
      breakingPoint: 'Server-side video streaming caused immense bandwidth costs and privacy friction.',
      edgeCasesFound: ['Variable lighting conditions causing face tracking dropouts'],
    },
    fix: {
      shippedSolutions: 'Migrated vision models to client-side WebAssembly MediaPipe, maintaining sub-30ms latency.',
      optimizations: ['Zero video upload to remote servers', 'Instantaneous question critiques streaming'],
      productionOutcome: '1,200+ active students evaluated across test sessions.',
    },
    decisions: [
      {
        title: 'Proctoring Architecture',
        optionsConsidered: ['Continuous server-side video streaming', 'Client-side MediaPipe inference via WebAssembly'],
        chosen: 'Client-side MediaPipe inference via WebAssembly',
        why: 'Streaming video to servers incurs massive bandwidth bills and severe privacy exposure; on-device client ML keeps latency under 30ms and data local.',
        tradeoff: 'Higher CPU footprint on low-end student laptop browsers.',
      },
    ],
    gallery: [{ src: '/kyren_thumbnail.png', alt: 'Kyren interface', caption: 'Course curriculum dashboard' }],
    metrics: [
      { label: 'Syllabus Parse Time', value: '< 18s', note: 'from PDF or playlist', source: 'Parser benchmark logs' },
      { label: 'Evaluated Students', value: '1,200+', note: 'across active university test sessions', source: 'Platform user ledger' },
      { label: 'Evaluation Accuracy', value: '94%', note: 'correlation against instructor grades', source: 'Academic validation trial' },
    ],
    whatIdChangeNext: ['Add offline sync support via IndexedDB for intermittent connectivity.'],
  },
  {
    slug: 'codeguard',
    frameNumber: '04',
    title: 'CodeGuard',
    year: '2025',
    category: 'Security',
    type: 'product',
    role: 'Creator & Lead Developer',
    timeline: '2025',
    team: 'Creator',
    oneLiner:
      'AI code security and PR risk analysis platform isolating high-risk architectural regressions before merge.',
    imageSrc: '/codeguard_thumbnail.jpg',
    isFlagship: false,
    isFullCaseStudy: false,
    stack: ['React', 'TypeScript', 'Node.js', 'GitHub REST API', 'Tailwind CSS'],
    links: {
      live: 'https://code-guard-45.vercel.app/',
    },
    tenSecond: {
      problem:
        'DevSecOps reviews typically happen either too early (noisy IDE linting) or too late (production incident alerts), leaving pull requests as the missing enforcement frontier.',
      approach:
        'Built a GitHub integration that reads PR diff hunks, resolves imported dependency references, and performs targeted threat modeling with inline diff suggestions.',
      result:
        'Completed full architectural reviews in under 6 seconds with 92% review precision and zero reported false-positive PR blocks.',
      keyMetric: { value: '< 6s', label: 'PR Scan Turnaround' },
    },
    context: {
      summary: 'Pull-request level security review engine integrating directly into continuous integration workflows.',
      constraints: ['Complete within CI execution windows (< 10s)', 'Context-aware AST expansion'],
    },
    develop: {
      description: 'Selective git unified diff chunking with AST context expansion via GitHub REST API.',
      architectureSummary: 'GitHub Webhook -> Diff Chunker -> AST Validator -> Inline Comment Dispatcher',
      nodes: [],
      edges: [],
    },
    stop: {
      failureTesting: 'Benchmarked against large monorepo commits touching 200+ files.',
      breakingPoint: 'Full git repo cloning destroyed CI execution budgets on monorepos.',
      edgeCasesFound: ['Circular cross-file imports causing infinite AST expansion recursion'],
    },
    fix: {
      shippedSolutions: 'Used GitHub Trees API to pull only referenced dependency files, bypassing full clones.',
      optimizations: ['Reduced scan turnaround to 5.4 seconds average', 'Inline actionable diff suggestions'],
      productionOutcome: 'Catches critical regressions before code touches staging environments.',
    },
    decisions: [
      {
        title: 'Diff Parsing Strategy',
        optionsConsidered: ['Full-repository clone on every commit', 'Selective git unified diff chunking with AST expansion'],
        chosen: 'Selective git unified diff chunking with AST expansion',
        why: 'Cloning gigabyte repos kills CI speed; fetching only the target file trees via GitHub Trees API reduced turnaround to 5.4 seconds.',
        tradeoff: 'Cannot resolve dynamic runtime dependencies defined in external packages.',
      },
    ],
    gallery: [{ src: '/codeguard_thumbnail.jpg', alt: 'CodeGuard PR screen', caption: 'Pull request threat model analysis' }],
    metrics: [
      { label: 'PR Scan Turnaround', value: '< 6s', note: 'AST chunk analysis per commit', source: 'GitHub Action run timer' },
      { label: 'Review Precision', value: '92%', note: 'zero reported false-positive PR blocks', source: 'Developer feedback telemetry' },
    ],
    whatIdChangeNext: ['Build native GitHub App with bidirectional pull-request checks API.'],
  },
  {
    slug: 'kemlang',
    frameNumber: '05',
    title: 'KemLang',
    year: '2025',
    category: 'Compilers',
    type: 'oss',
    role: 'Language Author',
    timeline: '2024 – 2025',
    team: 'Language Creator',
    oneLiner:
      'Culturally rooted Gujarati toy programming language featuring an AST-based compiler, web playground, and VS Code extension.',
    imageSrc: '/kemlang_thumbnail.png',
    isFlagship: false,
    isFullCaseStudy: false,
    stack: ['Python', 'FastAPI', 'TypeScript', 'React', 'Monaco Editor'],
    links: {
      live: 'https://kemlang.vercel.app/',
    },
    tenSecond: {
      problem:
        'Coding syntax has historically been exclusively anglophone, creating unnecessary friction for native Indian students first learning programmatic reasoning.',
      approach:
        'Designed grammar rules matching conversational Gujarati idioms. Built a recursive descent parser producing an intermediate AST, with a web playground and VS Code LSP.',
      result:
        'Introduced hundreds of first-time programmers to programmatic concepts in their mother tongue with 12ms AST parse speeds.',
      keyMetric: { value: '12ms', label: 'WASM AST Parse' },
    },
    context: {
      summary: 'Educational programming language grounding computer science abstractions in native Gujarati idioms.',
      constraints: ['Preserve rigorous computer science abstractions', 'Zero setup: run entirely in browser'],
    },
    develop: {
      description: 'Handwritten recursive descent parser in Python compiled to WebAssembly for browser runtime.',
      architectureSummary: 'Monaco Editor -> Lexer -> Recursive Descent Parser -> AST Tree -> Interpreter VM',
      nodes: [],
      edges: [],
    },
    stop: {
      failureTesting: 'Tested parsing of deeply nested recursive function calls in Gujarati syntax.',
      breakingPoint: 'Automated lexer generators produced cryptic error messages unreadable by beginners.',
      edgeCasesFound: ['Gujarati Unicode script normalization causing token mismatches'],
    },
    fix: {
      shippedSolutions: 'Built a custom handwritten recursive descent parser with column-accurate friendly error formatting.',
      optimizations: ['12ms parse times via WebAssembly', 'Custom VS Code extension with syntax highlighting'],
      productionOutcome: 'Adopted by 500+ developers in regional learning groups.',
    },
    decisions: [
      {
        title: 'Parser Design',
        optionsConsidered: ['Lex/Yacc or ANTLR generation', 'Handwritten recursive descent parser'],
        chosen: 'Handwritten recursive descent parser',
        why: 'Handwritten parsers provide vastly clearer, culturally accurate error messages with exact column highlighting for beginners.',
        tradeoff: 'Manual maintenance of operator precedence climbing tables.',
      },
    ],
    gallery: [{ src: '/kemlang_thumbnail.png', alt: 'KemLang editor', caption: 'Web playground with AST console' }],
    metrics: [
      { label: 'WASM AST Parse', value: '12ms', note: 'client-side execution speed', source: 'WebAssembly benchmark profile' },
      { label: 'Toolchain Installs', value: '500+', note: 'active developers exploring language', source: 'VS Code Marketplace registry' },
    ],
    whatIdChangeNext: ['Compile KemLang AST directly to LLVM bytecode for native desktop compilation.'],
  },
  {
    slug: 'aria',
    frameNumber: '06',
    title: 'ARIA',
    year: '2025',
    category: 'AI Systems',
    type: 'product',
    role: 'AI Systems Architect',
    timeline: '2025',
    team: 'AI Systems Architect',
    oneLiner:
      'Multilingual autonomous agent platform turning voice goals in 11 Indian languages into parallel browser actions.',
    imageSrc: '/aria_thumbnail.png',
    isFlagship: false,
    isFullCaseStudy: false,
    stack: ['Python', 'FastAPI', 'Playwright', 'React', 'WebSockets'],
    links: {
      live: 'https://heyaria.replit.app/',
    },
    tenSecond: {
      problem:
        'Voice assistants remain passive query responders rather than active task agents, and regional Indian language support has historically lacked autonomous action capabilities.',
      approach:
        'Built a streaming audio pipeline paired with a headless Playwright agent swarm. Intention classifiers spawn sub-agents to browse services and synthesize answers.',
      result:
        'Demonstrated autonomous multi-tab research, price comparison, and ticket discovery triggered purely via colloquial Hindi and Gujarati voice commands.',
      keyMetric: { value: '6 agents', label: 'Concurrent Swarms' },
    },
    context: {
      summary: 'Autonomous voice agent platform converting spoken regional Indian languages into parallel web actions.',
      constraints: ['Sub-200ms audio turnaround over WebSockets', 'Safe parallel browser state coordination'],
    },
    develop: {
      description: 'Binary WebSocket audio pipeline routing intention vectors to headless Playwright worker swarms.',
      architectureSummary: 'Voice Stream -> Speech-to-Text -> Intent Classifier -> Playwright Swarm -> Speech Synthesis',
      nodes: [],
      edges: [],
    },
    stop: {
      failureTesting: 'Tested parallel browser action swarms navigating dynamic booking checkout flows simultaneously.',
      breakingPoint: 'HTTP polling resulted in out-of-order audio packets and dropped browser session state.',
      edgeCasesFound: ['Stale DOM selectors during parallel checkout navigation'],
    },
    fix: {
      shippedSolutions: 'Migrated to binary WebSockets with audio chunk buffering and strict state synchronization locks.',
      optimizations: ['Support for 11 regional Indian languages', 'Up to 6 concurrent browser execution swarms'],
      productionOutcome: 'Executed complex multi-tab research purely from voice commands.',
    },
    decisions: [
      {
        title: 'Streaming Transport',
        optionsConsidered: ['Standard HTTP long polling', 'Server-Sent Events (SSE)', 'Binary WebSockets with audio chunk buffering'],
        chosen: 'Binary WebSockets with audio chunk buffering',
        why: 'Sub-200ms audio turnaround requires continuous full-duplex socket streaming.',
        tradeoff: 'Requires stateful socket connection management across distributed servers.',
      },
    ],
    gallery: [{ src: '/aria_thumbnail.png', alt: 'ARIA interface', caption: 'Voice agent parallel browser execution matrix' }],
    metrics: [
      { label: 'Concurrent Browser Swarms', value: '6 agents', note: 'executing live web navigation', source: 'Playwright cluster benchmark' },
      { label: 'Supported Indian Languages', value: '11', note: 'native speech synthesis pipeline', source: 'Audio model configuration ledger' },
    ],
    whatIdChangeNext: ['Implement on-device whisper models to eliminate cloud audio streaming latency.'],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return ALL_PROJECTS.map((p) => p.slug);
}

export function getNextProject(currentSlug: string): ProjectDetail {
  const index = ALL_PROJECTS.findIndex((p) => p.slug === currentSlug);
  if (index === -1 || index === ALL_PROJECTS.length - 1) {
    return ALL_PROJECTS[0];
  }
  return ALL_PROJECTS[index + 1];
}
