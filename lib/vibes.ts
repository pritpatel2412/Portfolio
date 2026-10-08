export type VibeId = 'journal' | 'raw' | 'grid' | 'poster' | 'noir' | 'colorlab';

export interface VibeConfig {
  id: VibeId;
  number: string;
  name: string;
  tagline: string;
  mood: string;
  swatches: {
    bg: string;
    ink: string;
    accent: string;
    surface: string;
  };
  typography: {
    display: string;
    body: string;
    mono: string;
  };
  description: string;
}

export const VIBES: VibeConfig[] = [
  {
    id: 'journal',
    number: '01',
    name: 'THE JOURNAL',
    tagline: 'European Design Magazine',
    mood: 'Quiet luxury, printed publication translated into digital space, elegant serif, generous whitespace, thin rules.',
    swatches: {
      bg: '#F5F2EB',
      ink: '#121316',
      accent: '#9A3824',
      surface: '#EDE8DE',
    },
    typography: {
      display: 'var(--font-newsreader), Georgia, serif',
      body: 'var(--font-bricolage), system-ui, sans-serif',
      mono: 'var(--font-geist-mono), monospace',
    },
    description: 'Off-white paper, high-contrast serif, editorial spreads, asymmetric columns, slow deliberate reveals.',
  },
  {
    id: 'raw',
    number: '02',
    name: 'INTERNET OBJECT',
    tagline: 'Brutalist Raw Web',
    mood: 'Experimental web, developer culture, visible 1px borders, raw HTML energy, monospace technical labels.',
    swatches: {
      bg: '#FFFFFF',
      ink: '#000000',
      accent: '#FF3B00',
      surface: '#F4F4F4',
    },
    typography: {
      display: 'var(--font-geist-mono), monospace',
      body: 'var(--font-geist-mono), monospace',
      mono: 'var(--font-geist-mono), monospace',
    },
    description: 'Black/white with safety orange, exposed borders, technical DOM telemetry, raw hyperlink aesthetics.',
  },
  {
    id: 'grid',
    number: '03',
    name: 'GRID STUDY',
    tagline: 'Swiss Modernism',
    mood: 'Architectural grid, modular layout discipline, International Klein Blue, structured typographic order.',
    swatches: {
      bg: '#0E0E10',
      ink: '#F4F4F6',
      accent: '#0047FF',
      surface: '#16161A',
    },
    typography: {
      display: 'var(--font-bricolage), system-ui, sans-serif',
      body: 'var(--font-bricolage), system-ui, sans-serif',
      mono: 'var(--font-geist-mono), monospace',
    },
    description: 'Deep black background, Swiss grid lines, strict alignment, numbered sections, blue structural rules.',
  },
  {
    id: 'poster',
    number: '04',
    name: 'NEON POSTER',
    tagline: 'Cultural Street Graphics',
    mood: 'Bold color blocks, vertical typography, sticker-like badges, oversized numerals, acid neon accents.',
    swatches: {
      bg: '#0F111A',
      ink: '#FFF5EA',
      accent: '#D8FF38',
      surface: '#1A1E2D',
    },
    typography: {
      display: 'var(--font-bricolage), system-ui, sans-serif',
      body: 'var(--font-bricolage), system-ui, sans-serif',
      mono: 'var(--font-geist-mono), monospace',
    },
    description: 'Deep midnight canvas, acid lime hits, vertical type rotations, layered poster compositions.',
  },
  {
    id: 'noir',
    number: '05',
    name: 'AFTER HOURS',
    tagline: 'Digital Studio Noir',
    mood: 'Late-night developer studio, cinematic dark interface, warm white type, muted ember accent, subtle grain.',
    swatches: {
      bg: '#08090C',
      ink: '#EDEBE6',
      accent: '#E0533C',
      surface: '#111318',
    },
    typography: {
      display: 'var(--font-newsreader), Georgia, serif',
      body: 'var(--font-bricolage), system-ui, sans-serif',
      mono: 'var(--font-geist-mono), monospace',
    },
    description: 'Cinematic near-black, warm ember glow, fine lines, illuminated cursor, contemplative pacing.',
  },
  {
    id: 'colorlab',
    number: '06',
    name: 'COLOR LAB',
    tagline: 'Experimental Playground',
    mood: 'Intentional rule-breaking, vibrant color chords, playful shapes, irregular grids, interactive kinetic tokens.',
    swatches: {
      bg: '#181528',
      ink: '#FAF8FF',
      accent: '#FF6B97',
      surface: '#241F3A',
    },
    typography: {
      display: 'var(--font-bricolage), system-ui, sans-serif',
      body: 'var(--font-bricolage), system-ui, sans-serif',
      mono: 'var(--font-geist-mono), monospace',
    },
    description: 'Plum violet base, coral pink and electric mint chords, asymmetric cards, fluid interactive micro-delights.',
  },
];

export const DEFAULT_VIBE: VibeId = 'journal';
