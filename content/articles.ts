export interface ArticleHeading {
  id: string;
  title: string;
  level: number;
}

export interface ArticleCodeSnippet {
  filename: string;
  language: string;
  code: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  sidenote?: string;
  callout?: {
    type: 'note' | 'tip' | 'warning';
    title: string;
    text: string;
  };
  codeSnippet?: ArticleCodeSnippet;
}

export interface ArticleDetail {
  slug: string;
  title: string;
  date: string;
  updated: string;
  readTime: string;
  category: 'Compilers & Security' | 'AI Systems' | 'Language Engineering';
  summary: string;
  tags: string[];
  headings: ArticleHeading[];
  sections: ArticleSection[];
}

export const ARTICLES: ArticleDetail[] = [
  {
    slug: 'ast-vs-regex-security-scanners',
    title: 'Why Regex Backtracking Fails in Vulnerability Scanners (and ASTs Don’t)',
    date: 'February 2026',
    updated: 'October 2026',
    readTime: '6 min read',
    category: 'Compilers & Security',
    summary:
      'A deep dive into parsing security payloads as structural AST tokens versus regular expressions when evaluating SQL injection and XSS exploit vectors under high concurrency.',
    tags: ['Security', 'Compilers', 'Python', 'FastAPI'],
    headings: [
      { id: 'the-regex-breaking-point', title: 'The Concurrency Failure of Regex Pattern Matching', level: 2 },
      { id: 'why-regular-expressions-fail', title: 'Why Regular Expressions Lack Syntactic Context', level: 2 },
      { id: 'compiled-ast-tokenization', title: 'Compiled AST Tokenization & Linear Scalability', level: 2 },
      { id: 'production-takeaways', title: 'Production Engineering Takeaways', level: 2 },
    ],
    sections: [
      {
        id: 'the-regex-breaking-point',
        title: 'The Concurrency Failure of Regex Pattern Matching',
        paragraphs: [
          'When building RedForge, an autonomous security assessment engine, we initially reached for high-performance regular expression engines to detect malicious injection payloads across thousands of HTTP endpoints per minute. Within days of running high-concurrency benchmarks against real-world target applications, the approach broke down.',
        ],
        sidenote:
          'Catastrophic backtracking occurs when Non-deterministic Finite Automata (NFA) evaluate nested ambiguous quantifiers like (a+)+ under adversarial inputs.',
        callout: {
          type: 'warning',
          title: 'Vulnerability Scanner Invariant',
          text: 'Never evaluate untrusted input buffers against regular expressions with nested quantifiers in production scanners. A single polyglot payload can pin an entire worker process indefinitely.',
        },
      },
      {
        id: 'why-regular-expressions-fail',
        title: 'Why Regular Expressions Lack Syntactic Context',
        paragraphs: [
          'The failure mode was twofold: first, catastrophic backtracking when parsing malformed or deeply nested polyglot payloads. Second, and more critically, regular expressions lack semantic context. An unquoted parameter inside a SQL string literal looks identical to an unescaped clause in an executable query block from a pure regex perspective.',
        ],
        codeSnippet: {
          filename: 'scanner/ast_tokenizer.py',
          language: 'python',
          code: `# Structural token classification vs raw string pattern matching
class SQLTokenClassifier:
    def classify_token_stream(self, tokens: list[Token]) -> InjectionRisk:
        for idx, token in enumerate(tokens):
            # AST context prevents false positives inside literal quotes
            if token.type == TokenType.SQL_KEYWORD and not token.in_literal_string:
                if self.is_untrusted_boundary(tokens, idx):
                    return InjectionRisk.CRITICAL_UNESCAPED_CLAUSE
        return InjectionRisk.BENIGN`,
        },
      },
      {
        id: 'compiled-ast-tokenization',
        title: 'Compiled AST Tokenization & Linear Scalability',
        paragraphs: [
          'We replaced the signature scanning stage with a compiled AST tokenization pipeline. By streaming tokens into a state-machine parser rather than matching monolithic pattern buffers, we achieved two breakthrough properties:',
          '1. Deterministic execution time: token classification scales strictly linearly O(N) with input length, with zero risk of exponential backtracking cliffs.',
          '2. Structural awareness: the parser understands boundary escapes, comment stripping, and identifier obfuscation inherently.',
        ],
        sidenote:
          'State machine token streaming consumes a constant O(1) auxiliary memory window regardless of payload nesting depth.',
      },
      {
        id: 'production-takeaways',
        title: 'Production Engineering Takeaways',
        paragraphs: [
          'The lesson: defensive automation demands structural understanding of code syntax. Treating source payloads as raw strings is the root cause of both alert fatigue and scanner evasion.',
        ],
        callout: {
          type: 'tip',
          title: 'Benchmark Result',
          text: 'Switching from PCRE regex patterns to compiled token stream matching in RedForge reduced p99 endpoint analysis latency from 420ms to 48ms under 1,200 concurrent socket connections.',
        },
      },
    ],
  },
  {
    slug: 'low-latency-rag-agent-memory',
    title: 'Sub-200ms RAG: Semantic Query Caching for Autonomous Browser Agents',
    date: 'January 2026',
    updated: 'October 2026',
    readTime: '8 min read',
    category: 'AI Systems',
    summary:
      'Designing locality-sensitive embedding hashes in Redis to reduce redundant vector queries by 64% without losing factual grounding in multi-turn agent sessions.',
    tags: ['AI Agents', 'RAG', 'Redis', 'Python'],
    headings: [
      { id: 'the-rag-token-problem', title: 'The Multi-Turn RAG Latency Penalty', level: 2 },
      { id: 'why-http-caching-fails', title: 'Why Standard HTTP Key Caching Fails LLMs', level: 2 },
      { id: 'two-tier-lsh-architecture', title: 'Two-Tier Locality-Sensitive Hashing in Redis', level: 2 },
      { id: 'measured-production-impact', title: 'Measured Impact in Autonomous Swarms', level: 2 },
    ],
    sections: [
      {
        id: 'the-rag-token-problem',
        title: 'The Multi-Turn RAG Latency Penalty',
        paragraphs: [
          'Autonomous web agents are notorious token and latency hogs. In building SearchMind API and ARIA, our multi-agent platforms executing parallel research loops, we discovered that over 60% of search queries issued by reasoning models within a multi-turn session were semantic duplicates or slight syntactic variations of recently fetched facts.',
        ],
        sidenote:
          'Multi-agent loops multiply latency: an agent executing a 5-step web search can accumulate over 8 seconds of pure vector search overhead without caching.',
      },
      {
        id: 'why-http-caching-fails',
        title: 'Why Standard HTTP Key Caching Fails LLMs',
        paragraphs: [
          'Standard HTTP caching fails because LLMs rarely formulate the exact same query string twice. They alter prepositional phrases, add synonyms, or rephrase questions based on recent conversational turns.',
        ],
        codeSnippet: {
          filename: 'cache/semantic_lsh.py',
          language: 'python',
          code: `# Locality-Sensitive Embedding Projection in Redis
def compute_lsh_bucket(embedding: np.ndarray, projection_matrix: np.ndarray) -> str:
    # 64-bit random hyperplane projection
    projected = np.dot(embedding, projection_matrix) > 0
    bitstring = ''.join(['1' if bit else '0' for bit in projected])
    return f"rag:lsh:{bitstring[:16]}"`,
        },
      },
      {
        id: 'two-tier-lsh-architecture',
        title: 'Two-Tier Locality-Sensitive Hashing in Redis',
        paragraphs: [
          'To solve this without paying the latency penalty of full vector database similarity scans on every micro-query, we architected a two-tier semantic caching mesh in Redis:',
          'Tier 1 utilizes Locality-Sensitive Hashing (LSH) over lightweight semantic projection vectors computed in under 12ms. High-probability hash bucket hits retrieve cached markdown chunks directly.',
          'Tier 2 performs cosine thresholding only when LSH produces border candidates.',
        ],
        sidenote:
          'LSH collapses high-dimensional embedding space into discrete hash buckets in O(D) time, avoiding expensive O(N) cosine similarity sweeps.',
        callout: {
          type: 'note',
          title: 'Cache Invalidation Strategy',
          text: 'Cached markdown chunks expire with a strict 4-hour TTL and undergo instant eviction upon detected domain robots.txt or content header modifications.',
        },
      },
      {
        id: 'measured-production-impact',
        title: 'Measured Impact in Autonomous Swarms',
        paragraphs: [
          'This reduced roundtrip agent search latency from 850ms down to 190ms for cached pathways, cutting our downstream LLM token consumption by nearly three-quarters across production workloads.',
        ],
        callout: {
          type: 'tip',
          title: 'Production Verified Metric',
          text: 'SearchMind API achieves a 64% cache hit ratio across 25,000+ daily agent queries with a sustained p95 chunk delivery latency under 240ms.',
        },
      },
    ],
  },
  {
    slug: 'building-a-regional-compiler',
    title: 'Building a Mother-Tongue Compiler: Architecture Lessons from KemLang',
    date: 'November 2025',
    updated: 'October 2026',
    readTime: '7 min read',
    category: 'Language Engineering',
    summary:
      'Architectural insights from designing a culturally grounded Gujarati toy programming language, bytecode interpreter, and web playground from scratch.',
    tags: ['Compilers', 'AST', 'TypeScript', 'Education'],
    headings: [
      { id: 'language-as-mental-models', title: 'Language as Computational Mental Models', level: 2 },
      { id: 'the-kemlang-mission', title: 'Preserving Computer Science Invariants', level: 2 },
      { id: 'parser-and-ast-design', title: 'Handwritten Recursive Descent Parser Architecture', level: 2 },
      { id: 'webassembly-and-adoption', title: 'WebAssembly Toolchains and Developer Adoption', level: 2 },
    ],
    sections: [
      {
        id: 'language-as-mental-models',
        title: 'Language as Computational Mental Models',
        paragraphs: [
          'Programming languages have historically carried a hidden prerequisite: fluency in English terminology. Keywords like `if`, `while`, `function`, and `return` are so second-nature to experienced developers that we forget the cognitive friction they create for native language speakers first approaching computational thinking.',
        ],
        sidenote:
          'Cognitive load theory indicates learners grasp control-flow abstractions significantly faster when keywords reflect their primary mental vocabulary.',
      },
      {
        id: 'the-kemlang-mission',
        title: 'Preserving Computer Science Invariants',
        paragraphs: [
          'With KemLang, the goal was not to create an esoteric novelty, but a fully functional educational language ecosystem in Gujarati that preserved rigorous computer science fundamentals.',
        ],
        callout: {
          type: 'note',
          title: 'Syntactic Invariant',
          text: 'KemLang does not alter lexical semantics or operational computer science primitives: scoping, stack frames, recursive evaluations, and AST construction remain mathematically rigorous.',
        },
      },
      {
        id: 'parser-and-ast-design',
        title: 'Handwritten Recursive Descent Parser Architecture',
        paragraphs: [
          'Key architectural challenges included designing grammar rules that felt conversational yet unambiguous, writing a recursive descent parser with precise error diagnostics, and shipping an interactive web playground powered by Monaco Editor without requiring server roundtrips.',
        ],
        codeSnippet: {
          filename: 'compiler/parser.py',
          language: 'python',
          code: `# KemLang Recursive Descent Expression Evaluation
def parse_conditional_statement(self) -> ASTNode:
    self.consume(TokenType.JO, "Expected 'જો' (if) keyword")
    condition = self.parse_expression()
    self.consume(TokenType.TO, "Expected 'તો' (then) keyword")
    consequent = self.parse_block()
    alternate = None
    if self.match(TokenType.NAHITAR): # else
        alternate = self.parse_block()
    return IfNode(condition=condition, then_branch=consequent, else_branch=alternate)`,
        },
        sidenote:
          'Unicode character normalization (NFC) is essential in regional lexers to prevent distinct grapheme clusters from generating syntax errors.',
      },
      {
        id: 'webassembly-and-adoption',
        title: 'WebAssembly Toolchains and Developer Adoption',
        paragraphs: [
          'By compiling the interpreter to WebAssembly and developing a custom language server extension for VS Code, KemLang was adopted by hundreds of regional students exploring programming for the first time.',
        ],
        callout: {
          type: 'tip',
          title: 'Adoption Milestone',
          text: 'KemLang client-side WebAssembly parser parses ASTs in under 12ms and has accumulated 500+ active toolchain installations across regional developer communities.',
        },
      },
    ],
  },
];
export const articles = ARTICLES;

export function getArticleBySlug(slug: string): ArticleDetail | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}

export function getNextArticle(currentSlug: string): ArticleDetail {
  const index = ARTICLES.findIndex((a) => a.slug === currentSlug);
  if (index === -1 || index === ARTICLES.length - 1) {
    return ARTICLES[0];
  }
  return ARTICLES[index + 1];
}

export function getPreviousArticle(currentSlug: string): ArticleDetail {
  const index = ARTICLES.findIndex((a) => a.slug === currentSlug);
  if (index <= 0) {
    return ARTICLES[ARTICLES.length - 1];
  }
  return ARTICLES[index - 1];
}
