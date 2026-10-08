export const TOKENS = {
  colors: {
    fog: {
      bg: '#ECEEF1',
      bgRaised: '#F6F7F9',
      ink: '#0B0D12',
      inkMuted: '#5A6070',
      line: 'rgba(11, 13, 18, 0.14)',
      signal: '#2B3BFF',
      onSignal: '#FFFFFF',
    },
    night: {
      bg: '#0D0F14',
      bgRaised: '#151821',
      ink: '#ECEEF1',
      inkMuted: '#9AA1B2',
      line: 'rgba(236, 238, 241, 0.14)',
      signal: '#7C88FF',
      onSignal: '#0D0F14',
    },
    blueprint: {
      bg: '#07090D',
      grid: 'rgba(92, 255, 176, 0.07)',
      ink: '#D7DCE6',
      inkMuted: '#8A93A6',
      phosphor: '#5CFFB0',
      warn: '#FFB020',
      line: 'rgba(215, 220, 230, 0.16)',
    },
  },
  motion: {
    easeOut: [0.16, 1, 0.3, 1] as const,
    easeInOut: [0.7, 0, 0.2, 1] as const,
    durations: {
      d1: 0.12,
      d2: 0.24,
      d3: 0.48,
      d4: 0.8,
      d5: 1.2,
    },
    springs: {
      lens: { stiffness: 220, damping: 24, mass: 0.6 },
      magnetic: { stiffness: 300, damping: 20, mass: 0.5 },
    },
  },
} as const;
