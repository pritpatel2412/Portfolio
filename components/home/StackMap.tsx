'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { stackItems } from '@/content/stack';
import { Layered } from '@/components/system/Layered';

interface NodePosition {
  name: string;
  domain: string;
  x: number;
  y: number;
}

const NODES: NodePosition[] = [
  // Languages (Center-Left)
  { name: 'Python', domain: 'languages', x: 280, y: 160 },
  { name: 'TypeScript', domain: 'languages', x: 420, y: 140 },
  { name: 'SQL', domain: 'languages', x: 340, y: 220 },

  // AI & Systems (Top-Right)
  { name: 'LLM Pipelines', domain: 'ai-systems', x: 580, y: 110 },
  { name: 'RAG Architectures', domain: 'ai-systems', x: 680, y: 180 },
  { name: 'Autonomous Agents', domain: 'ai-systems', x: 540, y: 200 },

  // Backend (Center-Bottom)
  { name: 'FastAPI', domain: 'backend', x: 440, y: 260 },
  { name: 'Node.js', domain: 'backend', x: 300, y: 310 },
  { name: 'WebSockets', domain: 'backend', x: 560, y: 300 },

  // Frontend (Top-Left)
  { name: 'React', domain: 'frontend', x: 220, y: 80 },
  { name: 'Next.js', domain: 'frontend', x: 350, y: 70 },
  { name: 'Tailwind CSS', domain: 'frontend', x: 180, y: 180 },

  // Data & Cloud (Bottom-Right)
  { name: 'PostgreSQL', domain: 'data-cloud', x: 660, y: 280 },
  { name: 'Redis', domain: 'data-cloud', x: 740, y: 200 },
  { name: 'Docker', domain: 'data-cloud', x: 780, y: 310 },
];

const EDGES: [string, string][] = [
  ['Python', 'FastAPI'],
  ['FastAPI', 'Redis'],
  ['FastAPI', 'PostgreSQL'],
  ['Python', 'LLM Pipelines'],
  ['TypeScript', 'React'],
  ['React', 'Next.js'],
  ['React', 'Tailwind CSS'],
  ['LLM Pipelines', 'RAG Architectures'],
  ['RAG Architectures', 'Redis'],
  ['Autonomous Agents', 'FastAPI'],
  ['Autonomous Agents', 'LLM Pipelines'],
  ['FastAPI', 'WebSockets'],
  ['PostgreSQL', 'Docker'],
];

export function StackMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const isConnected = (a: string, b: string) => {
    return EDGES.some(([u, v]) => (u === a && v === b) || (u === b && v === a));
  };

  return (
    <section className="py-20 md:py-32 border-t border-[var(--line)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex flex-col gap-10">
        <div className="flex items-center justify-between font-mono text-xs text-[var(--ink-muted)]">
          <span>04 / SYSTEM ARCHITECTURE CONSTELLATION</span>
          <span>PRECOMPUTED TOPOLOGY GRAPH</span>
        </div>

        <Layered
          surface={
            <div className="p-6 md:p-10 border border-[var(--line)] rounded-xl bg-[var(--bg-raised)]">
              {/* Desktop SVG Node Graph */}
              <div className="hidden md:block relative w-full h-[400px]">
                <svg className="w-full h-full" viewBox="100 30 750 340">
                  {/* Connection Edges */}
                  {EDGES.map(([u, v], i) => {
                    const nodeU = NODES.find((n) => n.name === u);
                    const nodeV = NODES.find((n) => n.name === v);
                    if (!nodeU || !nodeV) return null;

                    const active = hoveredNode === u || hoveredNode === v;

                    return (
                      <line
                        key={i}
                        x1={nodeU.x}
                        y1={nodeU.y}
                        x2={nodeV.x}
                        y2={nodeV.y}
                        stroke={active ? 'var(--signal)' : 'var(--line)'}
                        strokeWidth={active ? 2 : 1}
                        strokeDasharray={active ? undefined : '3,3'}
                        className="transition-all duration-200"
                      />
                    );
                  })}

                  {/* Nodes */}
                  {NODES.map((node) => {
                    const isHovered = hoveredNode === node.name;
                    const isNeighbor = hoveredNode && isConnected(hoveredNode, node.name);
                    const opacity = !hoveredNode || isHovered || isNeighbor ? 1 : 0.25;

                    return (
                      <g
                        key={node.name}
                        transform={`translate(${node.x}, ${node.y})`}
                        onMouseEnter={() => setHoveredNode(node.name)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-pointer transition-opacity duration-200"
                        style={{ opacity }}
                      >
                        <circle
                          r={isHovered ? 8 : 5}
                          fill={isHovered ? 'var(--signal)' : 'var(--ink)'}
                          className="transition-all duration-150"
                        />
                        <text
                          x={12}
                          y={4}
                          className="font-mono text-[11px] select-none fill-[var(--ink)]"
                          fontWeight={isHovered ? 'bold' : 'normal'}
                        >
                          {node.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Mobile Grouped Chips Fallback */}
              <div className="block md:hidden space-y-4">
                <div className="flex flex-wrap gap-2">
                  {NODES.map((n) => (
                    <span
                      key={n.name}
                      className="px-3 py-1 rounded-full border border-[var(--line)] font-mono text-xs text-[var(--ink)]"
                    >
                      {n.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          }
          source={
            <div className="space-y-4 font-mono text-xs">
              <div className="text-[var(--phosphor)] font-bold">
                // SYSTEM CONSTELLATION ADJACENCY MATRIX
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[var(--ink-muted)]">
                {EDGES.map(([u, v], i) => (
                  <div key={i} className="p-1.5 rounded border border-[var(--line)] bg-[var(--bg-raised)]">
                    <span className="text-[var(--phosphor)]">{u}</span> ─── <span className="text-[var(--ink)]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}
