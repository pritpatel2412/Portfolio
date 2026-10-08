'use client';

import React, { useState } from 'react';
import { ArchitectureNode, ArchitectureEdge } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  title?: string;
}

export function ArchitectureDiagram({ nodes, edges, title }: ArchitectureDiagramProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const activeNode = nodes.find((n) => n.id === activeNodeId);

  return (
    <div className="my-8 rounded-[var(--radius-ui)] border border-[var(--line)] bg-[var(--surface)] p-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--line)] font-mono text-xs text-[var(--text-dim)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--safelight)]" />
          <strong className="text-[var(--text)] uppercase">
            {title || 'INTERACTIVE SYSTEM ARCHITECTURE'}
          </strong>
        </div>
        <span className="text-[11px] opacity-70">
          [ Hover nodes to inspect protocol pipeline ]
        </span>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full aspect-[2/1] sm:aspect-[2.5/1] bg-[var(--surface-2)] rounded-[var(--radius-ui)] border border-[var(--line)] overflow-hidden flex items-center justify-center p-4">
        <svg
          viewBox="0 0 1000 400"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Arrow marker */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--safelight)" />
            </marker>
          </defs>

          {/* Connection Edges */}
          {edges.map((edge) => {
            const source = nodes.find((n) => n.id === edge.from);
            const target = nodes.find((n) => n.id === edge.to);
            if (!source || !target) return null;

            const x1 = source.x * 10;
            const y1 = source.y * 4;
            const x2 = target.x * 10;
            const y2 = target.y * 4;

            const isHighlighted =
              activeNodeId === edge.from || activeNodeId === edge.to;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isHighlighted ? 'var(--safelight)' : 'var(--line)'}
                  strokeWidth={isHighlighted ? '2.5' : '1.5'}
                  strokeDasharray={isHighlighted ? 'none' : '4,4'}
                  markerEnd="url(#arrow)"
                  className="transition-all duration-300"
                />
                {/* Edge Label */}
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 8}
                  fill="var(--text-dim)"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className={cn(
                    'transition-opacity duration-300 uppercase',
                    isHighlighted ? 'opacity-100 font-bold fill-[var(--safelight)]' : 'opacity-60'
                  )}
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const cx = node.x * 10;
            const cy = node.y * 4;
            const isActive = activeNodeId === node.id;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setActiveNodeId(node.id)}
                onMouseLeave={() => setActiveNodeId(null)}
                tabIndex={0}
                role="button"
                aria-label={`Node: ${node.label}, ${node.tech}`}
                className="cursor-pointer focus:outline-none"
              >
                {/* Node Box */}
                <rect
                  x={cx - 75}
                  y={cy - 35}
                  width="150"
                  height="70"
                  rx="3"
                  className={cn(
                    'transition-all duration-200',
                    isActive
                      ? 'fill-[var(--surface-2)] stroke-[var(--safelight)] stroke-2 shadow-lg'
                      : 'fill-[var(--surface)] stroke-[var(--line)] stroke-1 hover:stroke-[var(--text-dim)]'
                  )}
                />
                {/* Status Dot */}
                <circle
                  cx={cx - 60}
                  cy={cy - 15}
                  r="3.5"
                  fill="var(--safelight)"
                />
                {/* Node Label */}
                <text
                  x={cx - 50}
                  y={cy - 12}
                  fill="var(--text)"
                  fontSize="12"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
                {/* Role / Tech */}
                <text
                  x={cx - 50}
                  y={cy + 8}
                  fill="var(--text-dim)"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {node.role}
                </text>
                <text
                  x={cx - 50}
                  y={cy + 22}
                  fill="var(--safelight)"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  [{node.tech}]
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details Bar */}
      {activeNode && (
        <div className="mt-4 p-4 rounded-[var(--radius-ui)] bg-[var(--surface-2)] border border-[var(--safelight)]/40 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-[var(--text)]">
                {activeNode.label}
              </span>
              <span className="font-mono text-xs text-[var(--safelight)] uppercase">
                [{activeNode.tech}]
              </span>
            </div>
            <p className="font-mono text-xs text-[var(--text-dim)] mt-0.5">
              Role: {activeNode.role}
            </p>
          </div>
          <span className="font-mono text-[11px] text-[var(--text-dim)]">
            Active in verified execution graph
          </span>
        </div>
      )}
    </div>
  );
}
