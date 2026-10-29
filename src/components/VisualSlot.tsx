/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Unified VisualSlot component.
 * Order of priority:
 *   1. Preview picture set on Edit pictures page (#/admin, IndexedDB/memory)
 *   2. imageUrl in content.ts
 *   3. Drawn fallback visual (SVG, theme-aware, accent #0B5A4D / #3FB59B)
 * Fixed 16:10 frame (profile 1:1) prevents layout shift.
 */

import React, { useState } from 'react';
import { content, ArchitectureNode } from '../content.ts';
import { usePictureSlot } from '../utils/pictureStore.ts';
import { LightboxModal } from './LightboxModal.tsx';
import { Maximize2 } from 'lucide-react';

export type FallbackVisualType =
  | 'resultsMiniChart'
  | 'pipelineDiagram'
  | 'explainability'
  | 'dashboardSketch'
  | 'proofTiles'
  | 'profileMonogram'
  | 'moreWorkSketch';

interface VisualSlotProps {
  slotId?: string;
  imageUrl?: string;
  altText: string;
  fallbackType?: FallbackVisualType;
  projectSlug?: string;
  aspectRatio?: '16:10' | '1:1';
  objectFit?: 'cover' | 'contain';
  enableLightbox?: boolean;
  className?: string;
}

/**
 * 3a. ResultsMiniChart: AeroTwin RMSE bars from results.chart.data,
 * best first, best in accent, values at bar ends.
 * Grey bars at least 3:1 against track (#8C897E vs #E4E2DC, #5A635A vs #1E231E).
 * No text below 13px.
 */
export function ResultsMiniChart() {
  const aerotwin = content.projects.find((p) => p.slug === 'aerotwin');
  const chartData = aerotwin?.results.chart?.data || [
    { label: "Hybrid LSTM + XGBoost", value: 14.00, highlight: true },
    { label: "XGBoost", value: 14.47 },
    { label: "TCN", value: 14.99 },
    { label: "LSTM", value: 15.54 },
    { label: "Random Forest", value: 16.82 },
    { label: "CNN", value: 20.54 }
  ];

  const sortedData = [...chartData].sort((a, b) => a.value - b.value);
  const maxVal = Math.max(...sortedData.map((d) => d.value)) * 1.15;

  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram: Prediction error by model (RMSE, lower is better)"
    >
      <rect width="800" height="500" className="fill-[#F8F7F3] dark:fill-[#151815]" />
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      {/* Header */}
      <text x="50" y="60" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] uppercase font-semibold" style={{ letterSpacing: '0.06em' }}>
        AeroTwin // Model Benchmarks
      </text>
      <text x="50" y="86" className="font-sans text-[14px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Prediction error by model (RMSE, lower is better)
      </text>
      <line x1="50" y1="105" x2="750" y2="105" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      {/* Horizontal Bars */}
      {sortedData.map((item, i) => {
        const y = 138 + i * 48;
        const barWidth = (item.value / maxVal) * 440;
        const isBest = item.highlight || i === 0;

        return (
          <g key={item.label}>
            <text
              x="50"
              y={y + 17}
              className={`font-sans text-[14px] ${
                isBest
                  ? 'fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold'
                  : 'fill-[#4A4A45] dark:fill-[#B4B3AC]'
              }`}
            >
              {item.label}
            </text>

            {/* Bar Track */}
            <rect
              x="230"
              y={y}
              width="440"
              height="24"
              className="fill-[#E4E2DC] dark:fill-[#1E231E]"
            />

            {/* Filled Bar (Grey bars >= 3:1 against track) */}
            <rect
              x="230"
              y={y}
              width={barWidth}
              height="24"
              className={isBest ? 'fill-[#0B5A4D] dark:fill-[#3FB59B]' : 'fill-[#8C897E] dark:fill-[#5A635A]'}
            />

            <text
              x={230 + barWidth + 12}
              y={y + 17}
              className="font-mono text-[14px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-medium"
            >
              {item.value.toFixed(2)}
            </text>
          </g>
        );
      })}

      <line x1="50" y1="440" x2="750" y2="440" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="50" y="462" className="font-mono text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Dataset: NASA C-MAPSS FD001 test set (100 engines)
      </text>
    </svg>
  );
}

/**
 * Helper to split text onto two lines without any ellipsis
 */
function splitIntoTwoLines(text: string, maxLen = 14): [string, string] {
  const words = text.split(' ');
  if (words.length <= 1) return [text, ''];
  let l1 = '';
  let l2 = '';
  for (const w of words) {
    if (!l1 || (l1 + ' ' + w).length <= maxLen) {
      l1 = l1 ? `${l1} ${w}` : w;
    } else {
      l2 = l2 ? `${l2} ${w}` : w;
    }
  }
  return [l1, l2];
}

/**
 * 3b. PipelineDiagram: boxes and arrows from architecture.nodes.
 * Labels wrap onto two lines without ellipsis.
 * Scales with container; stacks vertically when narrower than 700px.
 */
export function PipelineDiagram({ projectSlug = 'sensorstream' }: { projectSlug?: string }) {
  const project = content.projects.find((p) => p.slug === projectSlug) || content.projects[1];
  const nodes: ArchitectureNode[] = project.architecture.nodes;

  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Diagram: ${project.title} Architecture Pipeline`}
    >
      <style>{`
        .pipe-desktop { display: block; }
        .pipe-mobile { display: none; }
        @media (max-width: 699px) {
          .pipe-desktop { display: none; }
          .pipe-mobile { display: block; }
        }
      `}</style>

      <rect width="800" height="500" className="fill-[#F8F7F3] dark:fill-[#151815]" />
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      {/* Header */}
      <text x="50" y="58" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] uppercase font-semibold" style={{ letterSpacing: '0.06em' }}>
        System Architecture // Pipeline Flow
      </text>
      <text x="50" y="84" className="font-sans text-[14px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        {project.architecture.title}: {project.architecture.description}
      </text>
      <line x1="50" y1="102" x2="750" y2="102" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      {/* DESKTOP FLOW: Horizontal 5-Step Flow (>= 700px) */}
      <g className="pipe-desktop">
        {nodes.map((node, i) => {
          const x = 50 + i * 142;
          const y = 145;
          const width = 122;
          const height = 240;
          const [label1, label2] = splitIntoTwoLines(node.label, 14);
          const [sub1, sub2] = splitIntoTwoLines(node.sublabel || '', 16);

          return (
            <g key={node.id}>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]"
                strokeWidth="1"
              />
              <text x={x + 10} y={y + 24} className="font-mono text-[13px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold" style={{ letterSpacing: '0.06em' }}>
                Step {i + 1}
              </text>
              <line x1={x + 10} y1={y + 36} x2={x + width - 10} y2={y + 36} className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="0.5" />

              {/* Wrapped Label - never truncated */}
              <text x={x + 10} y={y + 60} className="font-serif text-[14px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
                {label1}
              </text>
              {label2 && (
                <text x={x + 10} y={y + 80} className="font-serif text-[14px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
                  {label2}
                </text>
              )}

              {/* Wrapped Sublabel - never truncated */}
              {sub1 && (
                <text x={x + 10} y={y + (label2 ? 110 : 92)} className="font-sans text-[12px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
                  {sub1}
                </text>
              )}
              {sub2 && (
                <text x={x + 10} y={y + (label2 ? 128 : 110)} className="font-sans text-[12px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
                  {sub2}
                </text>
              )}

              {/* Horizontal Connector Arrow */}
              {i < nodes.length - 1 && (
                <g>
                  <line
                    x1={x + width}
                    y1={y + height / 2}
                    x2={x + width + 15}
                    y2={y + height / 2}
                    className="stroke-[#0B5A4D] dark:stroke-[#3FB59B]"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points={`${x + width + 15},${y + height / 2 - 4} ${x + width + 15},${y + height / 2 + 4} ${x + width + 20},${y + height / 2}`}
                    className="fill-[#0B5A4D] dark:fill-[#3FB59B]"
                  />
                </g>
              )}
            </g>
          );
        })}
      </g>

      {/* MOBILE FLOW: Stacked Top-to-Bottom (< 700px) */}
      <g className="pipe-mobile">
        {nodes.map((node, i) => {
          const y = 118 + i * 62;
          const [label1, label2] = splitIntoTwoLines(node.label, 26);

          return (
            <g key={`m-${node.id}`}>
              <rect
                x="50"
                y={y}
                width="700"
                height="50"
                className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]"
                strokeWidth="1"
              />
              <text x="65" y={y + 30} className="font-mono text-[13px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold" style={{ letterSpacing: '0.06em' }}>
                0{i + 1}.
              </text>
              <text x="110" y={y + 24} className="font-serif text-[14px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
                {label1} {label2}
              </text>
              {node.sublabel && (
                <text x="110" y={y + 40} className="font-sans text-[12px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
                  {node.sublabel}
                </text>
              )}
              {i < nodes.length - 1 && (
                <line
                  x1="400"
                  y1={y + 50}
                  x2="400"
                  y2={y + 62}
                  className="stroke-[#0B5A4D] dark:stroke-[#3FB59B]"
                  strokeWidth="1.5"
                />
              )}
            </g>
          );
        })}
      </g>

      <line x1="50" y1="440" x2="750" y2="440" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="50" y="462" className="font-mono text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Diagram: Sequential data ingestion, processing, model inference, and output display
      </text>
    </svg>
  );
}

/**
 * 3c. ExplainabilityDiagram: one prediction linked to 4 methods, no numbers.
 * No text below 13px. High contrast.
 */
export function ExplainabilityDiagram() {
  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram: Multi-method explainability framework"
    >
      <rect width="800" height="500" className="fill-[#F8F7F3] dark:fill-[#151815]" />
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      <text x="50" y="58" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] uppercase font-semibold" style={{ letterSpacing: '0.06em' }}>
        AeroTwin // Explainability Framework
      </text>
      <text x="50" y="84" className="font-sans text-[14px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Attribution, local surrogates, counterfactual scenarios, and confidence intervals
      </text>
      <line x1="50" y1="102" x2="750" y2="102" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      {/* Center Prediction */}
      <rect
        x="280"
        y="210"
        width="240"
        height="80"
        className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#0B5A4D] dark:stroke-[#3FB59B]"
        strokeWidth="2"
      />
      <text x="400" y="242" textAnchor="middle" className="font-mono text-[13px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold uppercase" style={{ letterSpacing: '0.06em' }}>
        Model Prediction
      </text>
      <text x="400" y="268" textAnchor="middle" className="font-serif text-[16px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
        Remaining Useful Life
      </text>

      {/* Connectors */}
      <line x1="280" y1="230" x2="230" y2="155" className="stroke-[#0B5A4D] dark:stroke-[#3FB59B]" strokeWidth="1.5" />
      <line x1="520" y1="230" x2="570" y2="155" className="stroke-[#0B5A4D] dark:stroke-[#3FB59B]" strokeWidth="1.5" />
      <line x1="280" y1="270" x2="230" y2="345" className="stroke-[#0B5A4D] dark:stroke-[#3FB59B]" strokeWidth="1.5" />
      <line x1="520" y1="270" x2="570" y2="345" className="stroke-[#0B5A4D] dark:stroke-[#3FB59B]" strokeWidth="1.5" />

      {/* Box 1: SHAP */}
      <rect x="50" y="120" width="230" height="76" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="65" y="145" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold">
        SHAP
      </text>
      <text x="65" y="166" className="font-sans text-[13px] fill-[#1B1B1B] dark:fill-[#ECEBE6]">
        Which sensors pushed
      </text>
      <text x="65" y="184" className="font-sans text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        the prediction
      </text>

      {/* Box 2: LIME */}
      <rect x="520" y="120" width="230" height="76" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="535" y="145" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold">
        LIME
      </text>
      <text x="535" y="166" className="font-sans text-[13px] fill-[#1B1B1B] dark:fill-[#ECEBE6]">
        Local check of
      </text>
      <text x="535" y="184" className="font-sans text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        the explanation
      </text>

      {/* Box 3: Counterfactuals */}
      <rect x="50" y="310" width="230" height="76" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="65" y="335" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold">
        Counterfactuals
      </text>
      <text x="65" y="356" className="font-sans text-[13px] fill-[#1B1B1B] dark:fill-[#ECEBE6]">
        What change would
      </text>
      <text x="65" y="374" className="font-sans text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        alter the outcome
      </text>

      {/* Box 4: Monte Carlo uncertainty */}
      <rect x="520" y="310" width="230" height="76" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="535" y="335" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold">
        Monte Carlo Uncertainty
      </text>
      <text x="535" y="356" className="font-sans text-[13px] fill-[#1B1B1B] dark:fill-[#ECEBE6]">
        Statistical confidence
      </text>
      <text x="535" y="374" className="font-sans text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        range
      </text>

      <line x1="50" y1="440" x2="750" y2="440" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="50" y="462" className="font-mono text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Diagram: Four-pillar verification preventing model hallucination and opaque decisions
      </text>
    </svg>
  );
}

/**
 * 3d. DashboardSketch: wireframe panels with skeleton lines and "Illustration" tag.
 * Text minimum 13px. High contrast.
 */
export function DashboardSketch() {
  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration: Dashboard Layout Wireframe"
    >
      <rect width="800" height="500" className="fill-[#F8F7F3] dark:fill-[#151815]" />
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      <text x="50" y="58" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] uppercase font-semibold" style={{ letterSpacing: '0.06em' }}>
        SensorStream // Dashboard Layout Wireframe
      </text>

      {/* Tag: Illustration */}
      <rect x="640" y="40" width="110" height="26" className="stroke-[#E4E2DC] dark:stroke-[#2E332E] fill-[#EDECE6] dark:fill-[#1E231E]" />
      <text x="695" y="58" textAnchor="middle" className="font-mono text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Illustration
      </text>

      <line x1="50" y1="82" x2="750" y2="82" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      {/* Panel 1: Active power */}
      <rect x="50" y="105" width="335" height="150" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="70" y="136" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold">
        Active power
      </text>
      <line x1="70" y1="160" x2="160" y2="160" className="stroke-[#0B5A4D] dark:stroke-[#3FB59B]" strokeWidth="6" />
      <line x1="70" y1="185" x2="280" y2="185" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="2" strokeDasharray="4 4" />
      <polyline points="70,235 120,225 180,240 240,210 300,225 355,200" className="stroke-[#0B5A4D]/60 dark:stroke-[#3FB59B]/60" strokeWidth="2" fill="none" />

      {/* Panel 2: Voltage */}
      <rect x="415" y="105" width="335" height="150" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="435" y="136" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold">
        Voltage
      </text>
      <line x1="435" y1="160" x2="520" y2="160" className="stroke-[#1B1B1B] dark:stroke-[#ECEBE6]" strokeWidth="6" />
      <line x1="435" y1="185" x2="680" y2="185" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="2" strokeDasharray="4 4" />
      <polyline points="435,228 500,230 560,225 620,231 680,227 720,229" className="stroke-[#1B1B1B]/50 dark:stroke-[#ECEBE6]/50" strokeWidth="2" fill="none" />

      {/* Panel 3: Sub-metering */}
      <rect x="50" y="275" width="335" height="150" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="70" y="306" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold">
        Sub-metering
      </text>
      <rect x="70" y="330" width="80" height="70" className="fill-[#EDECE6] dark:fill-[#1E231E]" />
      <rect x="165" y="350" width="80" height="50" className="fill-[#EDECE6] dark:fill-[#1E231E]" />
      <rect x="260" y="320" width="80" height="80" className="fill-[#0B5A4D]/30 dark:fill-[#3FB59B]/30" />

      {/* Panel 4: MQTT messages */}
      <rect x="415" y="275" width="335" height="150" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="435" y="306" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold">
        MQTT messages
      </text>
      <line x1="435" y1="335" x2="700" y2="335" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="3" />
      <line x1="435" y1="360" x2="640" y2="360" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="3" />
      <line x1="435" y1="385" x2="680" y2="385" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="3" />
      <line x1="435" y1="410" x2="590" y2="410" className="stroke-[#0B5A4D] dark:stroke-[#3FB59B]" strokeWidth="3" />

      <line x1="50" y1="445" x2="750" y2="445" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="50" y="465" className="font-mono text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Illustration: Quad-panel telemetry monitor interface specification
      </text>
    </svg>
  );
}

/**
 * 3e. ProofTiles:
 * Sub-lines EXACTLY:
 *   - "Validated in a test environment"
 *   - "Value stream mapping"
 *   - "Found during value stream mapping"
 *   - "User research"
 * Diagram caption: "Diagram: confirmed figures from the attachment".
 */
export function ProofTiles() {
  const tiles = [
    { title: "200+ rule test cases", sub: "Validated in a test environment" },
    { title: "12 departments interviewed", sub: "Value stream mapping" },
    { title: "7 duplicated steps found", sub: "Found during value stream mapping" },
    { title: "12 personas · 6 journey maps", sub: "User research" }
  ];

  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram: confirmed figures from the attachment"
    >
      <rect width="800" height="500" className="fill-[#F8F7F3] dark:fill-[#151815]" />
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      <text x="50" y="58" className="font-mono text-[14px] fill-[#0B5A4D] dark:fill-[#3FB59B] uppercase font-semibold" style={{ letterSpacing: '0.06em' }}>
        KaribuTech AI // Commercial Banking Systems
      </text>
      <text x="50" y="84" className="font-sans text-[14px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Key verification deliverables and departmental milestones
      </text>
      <line x1="50" y1="102" x2="750" y2="102" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      {tiles.map((tile, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 50 + col * 360;
        const y = 125 + row * 150;

        return (
          <g key={tile.title}>
            <rect
              x={x}
              y={y}
              width="340"
              height="130"
              className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#2E332E]"
              strokeWidth="1"
            />
            <text x={x + 20} y={y + 36} className="font-mono text-[13px] fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold" style={{ letterSpacing: '0.06em' }}>
              0{i + 1}.
            </text>
            <text x={x + 20} y={y + 70} className="font-mono text-[16px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
              {tile.title}
            </text>
            <text x={x + 20} y={y + 100} className="font-sans text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
              {tile.sub}
            </text>
          </g>
        );
      })}

      <line x1="50" y1="440" x2="750" y2="440" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
      <text x="50" y="462" className="font-mono text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Diagram: confirmed figures from the attachment
      </text>
    </svg>
  );
}

/**
 * 3f. ProfileMonogram: initials "KJC" in serif font on hairline-bordered square
 * with identity line underneath.
 */
export function ProfileMonogram({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-square overflow-hidden bg-[#F4F3EE] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration: Monogram of Kuzivakwashe Joshua Chawatama"
      >
        <rect x="20" y="20" width="460" height="460" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />
        <rect x="30" y="30" width="440" height="440" className="stroke-[#E4E2DC]/50 dark:stroke-[#2E332E]/50" strokeWidth="0.5" />

        {/* Initials KJC in Serif */}
        <text
          x="250"
          y="235"
          textAnchor="middle"
          className="font-serif text-[76px] font-bold fill-[#0B5A4D] dark:fill-[#3FB59B]"
          style={{ letterSpacing: '4px' }}
        >
          KJC
        </text>

        <line x1="140" y1="265" x2="360" y2="265" className="stroke-[#0B5A4D]/60 dark:stroke-[#3FB59B]/60" strokeWidth="1.5" />

        {/* Full Name */}
        <text
          x="250"
          y="310"
          textAnchor="middle"
          className="font-serif text-[18px] font-semibold fill-[#1B1B1B] dark:fill-[#ECEBE6]"
        >
          {content.profile.fullName}
        </text>

        {/* Identity line underneath */}
        <text
          x="250"
          y="342"
          textAnchor="middle"
          className="font-mono text-[13px] uppercase fill-[#0B5A4D] dark:fill-[#3FB59B] font-semibold"
          style={{ letterSpacing: '0.06em' }}
        >
          {content.profile.identityLine}
        </text>

        <text
          x="250"
          y="370"
          textAnchor="middle"
          className="font-mono text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]"
        >
          {content.profile.location}
        </text>
      </svg>
    </div>
  );
}

/**
 * Neutral architectural blueprint sketch
 */
export function NeutralSketch({ label = 'Project Blueprint' }: { label?: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Illustration: ${label}`}
    >
      <rect width="800" height="500" className="fill-[#F8F7F3] dark:fill-[#151815]" />
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#2E332E]" strokeWidth="1" />

      <line x1="50" y1="120" x2="750" y2="120" className="stroke-[#E4E2DC]/60 dark:stroke-[#2E332E]/60" strokeWidth="1" strokeDasharray="6 6" />
      <line x1="50" y1="250" x2="750" y2="250" className="stroke-[#E4E2DC]/60 dark:stroke-[#2E332E]/60" strokeWidth="1" strokeDasharray="6 6" />
      <line x1="50" y1="380" x2="750" y2="380" className="stroke-[#E4E2DC]/60 dark:stroke-[#2E332E]/60" strokeWidth="1" strokeDasharray="6 6" />

      <rect x="230" y="180" width="340" height="140" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#0B5A4D] dark:stroke-[#3FB59B]" strokeWidth="1" />
      <text x="400" y="242" textAnchor="middle" className="font-mono text-[15px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
        {label}
      </text>
      <text x="400" y="272" textAnchor="middle" className="font-sans text-[13px] fill-[#4A4A45] dark:fill-[#B4B3AC]">
        Architecture & Research Specification
      </text>
    </svg>
  );
}

/**
 * Unified VisualSlot component.
 * Priority:
 *   1. Preview picture set on Edit pictures page (#/admin, IndexedDB/memory)
 *   2. imageUrl in content.ts
 *   3. Drawn fallback visual
 */
export function VisualSlot({
  slotId,
  imageUrl,
  altText,
  fallbackType,
  projectSlug,
  aspectRatio = '16:10',
  objectFit = 'cover',
  enableLightbox = false,
  className = ''
}: VisualSlotProps) {
  const { effectiveUrl, isPreview } = usePictureSlot(slotId, imageUrl);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const aspectClass = aspectRatio === '1:1' ? 'aspect-square' : 'aspect-[16/10]';

  const renderFallback = () => {
    switch (fallbackType) {
      case 'resultsMiniChart':
        return <ResultsMiniChart />;
      case 'pipelineDiagram':
        return <PipelineDiagram projectSlug={projectSlug} />;
      case 'explainability':
        return <ExplainabilityDiagram />;
      case 'dashboardSketch':
        return <DashboardSketch />;
      case 'proofTiles':
        return <ProofTiles />;
      case 'profileMonogram':
        return <ProfileMonogram />;
      default:
        if (projectSlug === 'aerotwin') return <ResultsMiniChart />;
        if (projectSlug === 'sensorstream') return <PipelineDiagram projectSlug="sensorstream" />;
        if (projectSlug === 'kaributech-banking') return <ProofTiles />;
        return <NeutralSketch label={altText || 'Project Schema'} />;
    }
  };

  return (
    <>
      <div
        className={`relative w-full ${aspectClass} overflow-hidden bg-[#F8F7F3] dark:bg-[#151815] ${
          effectiveUrl && enableLightbox ? 'cursor-pointer group' : ''
        } ${className}`}
        onClick={effectiveUrl && enableLightbox ? () => setLightboxOpen(true) : undefined}
      >
        {effectiveUrl ? (
          <>
            <img
              src={effectiveUrl}
              alt={altText}
              width={aspectRatio === '1:1' ? 800 : 1600}
              height={aspectRatio === '1:1' ? 800 : 1000}
              loading="lazy"
              className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
            {isPreview && (
              <span className="absolute top-2 left-2 px-2 py-0.5 text-[12px] font-mono uppercase tracking-[0.06em] bg-[#0B5A4D] text-[#FAFAF7] dark:bg-[#3FB59B] dark:text-[#121412] z-10 font-semibold">
                Local Preview
              </span>
            )}
            {enableLightbox && (
              <div className="absolute bottom-2 right-2 px-2.5 py-1.5 bg-[#121412]/85 text-[#ECEBE6] text-[13px] font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Enlarge</span>
              </div>
            )}
          </>
        ) : (
          renderFallback()
        )}
      </div>

      {effectiveUrl && enableLightbox && (
        <LightboxModal
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageUrl={effectiveUrl}
          altText={altText}
        />
      )}
    </>
  );
}
