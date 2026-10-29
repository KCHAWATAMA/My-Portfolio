/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Unified VisualSlot component.
 * Order of priority:
 *   1. Preview picture set on Edit pictures page (#/admin, IndexedDB/memory)
 *   2. imageUrl in content.ts
 *   3. Drawn fallback visual (SVG, theme-aware, accent #0E6B5C / #3FB59B)
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
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      {/* Header */}
      <text x="50" y="60" className="font-mono text-[13px] fill-[#0E6B5C] dark:fill-[#3FB59B] uppercase font-semibold">
        AeroTwin // Model Benchmarks
      </text>
      <text x="50" y="85" className="font-sans text-[13px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        Prediction error by model (RMSE, lower is better)
      </text>
      <line x1="50" y1="105" x2="750" y2="105" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      {/* Horizontal Bars */}
      {sortedData.map((item, i) => {
        const y = 140 + i * 50;
        const barWidth = (item.value / maxVal) * 440;
        const isBest = item.highlight || i === 0;

        return (
          <g key={item.label}>
            <text
              x="50"
              y={y + 16}
              className={`font-sans text-[13px] ${
                isBest
                  ? 'fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold'
                  : 'fill-[#5A5A55] dark:fill-[#9E9D96]'
              }`}
            >
              {item.label}
            </text>

            <rect
              x="230"
              y={y}
              width="440"
              height="22"
              className="fill-[#EDECE6] dark:fill-[#1E231E]"
            />

            <rect
              x="230"
              y={y}
              width={barWidth}
              height="22"
              className={isBest ? 'fill-[#0E6B5C] dark:fill-[#3FB59B]' : 'fill-[#B0ADA4] dark:fill-[#4A524A]'}
            />

            <text
              x={230 + barWidth + 12}
              y={y + 16}
              className="font-mono text-[12px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-medium"
            >
              {item.value.toFixed(2)}
            </text>
          </g>
        );
      })}

      <line x1="50" y1="440" x2="750" y2="440" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="50" y="460" className="font-mono text-[11px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        Dataset: NASA C-MAPSS FD001 test set (100 engines)
      </text>
    </svg>
  );
}

/**
 * 3b. PipelineDiagram: boxes and arrows from architecture.nodes
 * (left to right on desktop / responsive flow in SVG).
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
      <rect width="800" height="500" className="fill-[#F8F7F3] dark:fill-[#151815]" />
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      {/* Header */}
      <text x="50" y="60" className="font-mono text-[13px] fill-[#0E6B5C] dark:fill-[#3FB59B] uppercase font-semibold">
        System Architecture // Pipeline Flow
      </text>
      <text x="50" y="85" className="font-sans text-[13px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        {project.architecture.title}: {project.architecture.description}
      </text>
      <line x1="50" y1="105" x2="750" y2="105" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      {/* 5 Sequential Node Boxes */}
      {nodes.map((node, i) => {
        const x = 50 + i * 142;
        const y = 200;
        const width = 120;
        const height = 150;

        return (
          <g key={node.id}>
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]"
              strokeWidth="1"
            />
            <text x={x + 10} y={y + 24} className="font-mono text-[11px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
              Step {i + 1}
            </text>
            <line x1={x + 10} y1={y + 34} x2={x + width - 10} y2={y + 34} className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="0.5" />

            <text x={x + 10} y={y + 56} className="font-serif text-[12px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
              {node.label.length > 15 ? node.label.slice(0, 14) + '…' : node.label}
            </text>

            {node.sublabel && (
              <text x={x + 10} y={y + 80} className="font-sans text-[10px] fill-[#5A5A55] dark:fill-[#9E9D96]">
                {node.sublabel.length > 32 ? node.sublabel.slice(0, 30) + '…' : node.sublabel}
              </text>
            )}

            {i < nodes.length - 1 && (
              <g>
                <line
                  x1={x + width}
                  y1={y + height / 2}
                  x2={x + width + 22}
                  y2={y + height / 2}
                  className="stroke-[#0E6B5C] dark:stroke-[#3FB59B]"
                  strokeWidth="1.5"
                />
                <polygon
                  points={`${x + width + 22},${y + height / 2 - 4} ${x + width + 22},${y + height / 2 + 4} ${x + width + 28},${y + height / 2}`}
                  className="fill-[#0E6B5C] dark:fill-[#3FB59B]"
                />
              </g>
            )}
          </g>
        );
      })}

      <line x1="50" y1="440" x2="750" y2="440" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="50" y="460" className="font-mono text-[11px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        Diagram: Sequential data ingestion, processing, model inference, and output display
      </text>
    </svg>
  );
}

/**
 * 3c. ExplainabilityDiagram: one prediction linked to 4 methods, no numbers.
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
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      <text x="50" y="55" className="font-mono text-[13px] fill-[#0E6B5C] dark:fill-[#3FB59B] uppercase font-semibold">
        AeroTwin // Explainability Framework
      </text>
      <text x="50" y="78" className="font-sans text-[13px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        Diagram: Interpretable model predictions through attribution, local surrogates, counterfactuals and confidence intervals
      </text>
      <line x1="50" y1="95" x2="750" y2="95" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      {/* Center Prediction */}
      <rect
        x="290"
        y="215"
        width="220"
        height="70"
        className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#0E6B5C] dark:stroke-[#3FB59B]"
        strokeWidth="2"
      />
      <text x="400" y="244" textAnchor="middle" className="font-mono text-[11px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold uppercase">
        Model Prediction
      </text>
      <text x="400" y="266" textAnchor="middle" className="font-serif text-[14px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
        Remaining Useful Life
      </text>

      {/* Connectors */}
      <line x1="290" y1="230" x2="230" y2="155" className="stroke-[#0E6B5C] dark:stroke-[#3FB59B]" strokeWidth="1.5" />
      <line x1="510" y1="230" x2="570" y2="155" className="stroke-[#0E6B5C] dark:stroke-[#3FB59B]" strokeWidth="1.5" />
      <line x1="290" y1="270" x2="230" y2="345" className="stroke-[#0E6B5C] dark:stroke-[#3FB59B]" strokeWidth="1.5" />
      <line x1="510" y1="270" x2="570" y2="345" className="stroke-[#0E6B5C] dark:stroke-[#3FB59B]" strokeWidth="1.5" />

      {/* Box 1: SHAP */}
      <rect x="50" y="120" width="220" height="70" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="65" y="145" className="font-mono text-[12px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
        SHAP
      </text>
      <text x="65" y="168" className="font-sans text-[11px] fill-[#1B1B1B] dark:fill-[#ECEBE6]">
        Which sensors pushed the prediction
      </text>

      {/* Box 2: LIME */}
      <rect x="530" y="120" width="220" height="70" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="545" y="145" className="font-mono text-[12px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
        LIME
      </text>
      <text x="545" y="168" className="font-sans text-[11px] fill-[#1B1B1B] dark:fill-[#ECEBE6]">
        Local check of the explanation
      </text>

      {/* Box 3: Counterfactuals */}
      <rect x="50" y="310" width="220" height="70" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="65" y="335" className="font-mono text-[12px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
        Counterfactuals
      </text>
      <text x="65" y="358" className="font-sans text-[11px] fill-[#1B1B1B] dark:fill-[#ECEBE6]">
        What change would alter the outcome
      </text>

      {/* Box 4: Monte Carlo uncertainty */}
      <rect x="530" y="310" width="220" height="70" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="545" y="335" className="font-mono text-[12px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
        Monte Carlo Uncertainty
      </text>
      <text x="545" y="358" className="font-sans text-[11px] fill-[#1B1B1B] dark:fill-[#ECEBE6]">
        Confidence range
      </text>

      <line x1="50" y1="440" x2="750" y2="440" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="50" y="460" className="font-mono text-[11px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        Diagram: Four-pillar verification preventing model hallucination and opaque decisions
      </text>
    </svg>
  );
}

/**
 * 3d. DashboardSketch: wireframe panels with skeleton lines and "Illustration" tag.
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
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      <text x="50" y="55" className="font-mono text-[13px] fill-[#0E6B5C] dark:fill-[#3FB59B] uppercase font-semibold">
        SensorStream // Dashboard Layout Wireframe
      </text>

      {/* Tag: Illustration */}
      <rect x="660" y="40" width="90" height="24" className="stroke-[#E4E2DC] dark:stroke-[#272B27] fill-[#EDECE6] dark:fill-[#1E231E]" />
      <text x="705" y="56" textAnchor="middle" className="font-mono text-[11px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        Illustration
      </text>

      <line x1="50" y1="80" x2="750" y2="80" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      {/* Panel 1: Active power */}
      <rect x="50" y="105" width="335" height="150" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="70" y="135" className="font-mono text-[12px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
        Active power
      </text>
      <line x1="70" y1="160" x2="160" y2="160" className="stroke-[#0E6B5C] dark:stroke-[#3FB59B]" strokeWidth="6" />
      <line x1="70" y1="185" x2="280" y2="185" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="2" strokeDasharray="4 4" />
      <polyline points="70,235 120,225 180,240 240,210 300,225 355,200" className="stroke-[#0E6B5C]/60 dark:stroke-[#3FB59B]/60" strokeWidth="2" fill="none" />

      {/* Panel 2: Voltage */}
      <rect x="415" y="105" width="335" height="150" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="435" y="135" className="font-mono text-[12px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
        Voltage
      </text>
      <line x1="435" y1="160" x2="520" y2="160" className="stroke-[#1B1B1B] dark:stroke-[#ECEBE6]" strokeWidth="6" />
      <line x1="435" y1="185" x2="680" y2="185" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="2" strokeDasharray="4 4" />
      <polyline points="435,228 500,230 560,225 620,231 680,227 720,229" className="stroke-[#1B1B1B]/40 dark:stroke-[#ECEBE6]/40" strokeWidth="2" fill="none" />

      {/* Panel 3: Sub-metering */}
      <rect x="50" y="275" width="335" height="150" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="70" y="305" className="font-mono text-[12px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
        Sub-metering
      </text>
      <rect x="70" y="330" width="80" height="70" className="fill-[#EDECE6] dark:fill-[#1E231E]" />
      <rect x="165" y="350" width="80" height="50" className="fill-[#EDECE6] dark:fill-[#1E231E]" />
      <rect x="260" y="320" width="80" height="80" className="fill-[#0E6B5C]/30 dark:fill-[#3FB59B]/30" />

      {/* Panel 4: MQTT messages */}
      <rect x="415" y="275" width="335" height="150" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="435" y="305" className="font-mono text-[12px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
        MQTT messages
      </text>
      <line x1="435" y1="335" x2="700" y2="335" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="3" />
      <line x1="435" y1="360" x2="640" y2="360" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="3" />
      <line x1="435" y1="385" x2="680" y2="385" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="3" />
      <line x1="435" y1="410" x2="590" y2="410" className="stroke-[#0E6B5C] dark:stroke-[#3FB59B]" strokeWidth="3" />

      <line x1="50" y1="445" x2="750" y2="445" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="50" y="465" className="font-mono text-[11px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        Illustration: Quad-panel telemetry monitor interface specification
      </text>
    </svg>
  );
}

/**
 * 3e. ProofTiles: "200+ rule test cases", "12 departments interviewed",
 * "7 duplicated steps found", "12 personas · 6 journey maps".
 */
export function ProofTiles() {
  const tiles = [
    { title: "200+ rule test cases", sub: "Validated in test environment" },
    { title: "12 departments interviewed", sub: "Operational value stream mapping" },
    { title: "7 duplicated steps found", sub: "Eliminated across credit processing" },
    { title: "12 personas · 6 journey maps", sub: "Customer onboarding blueprints" }
  ];

  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram: KaribuTech Banking Systems Key Verification Deliverables"
    >
      <rect width="800" height="500" className="fill-[#F8F7F3] dark:fill-[#151815]" />
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      <text x="50" y="55" className="font-mono text-[13px] fill-[#0E6B5C] dark:fill-[#3FB59B] uppercase font-semibold">
        KaribuTech AI // Commercial Banking Systems
      </text>
      <text x="50" y="78" className="font-sans text-[13px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        Diagram: Key verification deliverables and departmental milestones
      </text>
      <line x1="50" y1="95" x2="750" y2="95" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

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
              className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#E4E2DC] dark:stroke-[#272B27]"
              strokeWidth="1"
            />
            <text x={x + 20} y={y + 35} className="font-mono text-[11px] fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold">
              0{i + 1}.
            </text>
            <text x={x + 20} y={y + 68} className="font-mono text-[14px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
              {tile.title}
            </text>
            <text x={x + 20} y={y + 98} className="font-sans text-[12px] fill-[#5A5A55] dark:fill-[#9E9D96]">
              {tile.sub}
            </text>
          </g>
        );
      })}

      <line x1="50" y1="440" x2="750" y2="440" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
      <text x="50" y="460" className="font-mono text-[11px] fill-[#5A5A55] dark:fill-[#9E9D96]">
        Diagram: Verified outcomes deployed to commercial bank test environment
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
    <div className={`relative w-full aspect-square overflow-hidden bg-[#F4F3EE] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration: Monogram of Kuzivakwashe Joshua Chawatama"
      >
        <rect x="20" y="20" width="460" height="460" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
        <rect x="30" y="30" width="440" height="440" className="stroke-[#E4E2DC]/50 dark:stroke-[#272B27]/50" strokeWidth="0.5" />

        {/* Initials KJC in Serif */}
        <text
          x="250"
          y="235"
          textAnchor="middle"
          className="font-serif text-[76px] font-bold fill-[#0E6B5C] dark:fill-[#3FB59B]"
          style={{ letterSpacing: '4px' }}
        >
          KJC
        </text>

        <line x1="140" y1="265" x2="360" y2="265" className="stroke-[#0E6B5C]/60 dark:stroke-[#3FB59B]/60" strokeWidth="1.5" />

        {/* Full Name */}
        <text
          x="250"
          y="310"
          textAnchor="middle"
          className="font-serif text-[17px] font-semibold fill-[#1B1B1B] dark:fill-[#ECEBE6]"
        >
          {content.profile.fullName}
        </text>

        {/* Identity line underneath */}
        <text
          x="250"
          y="342"
          textAnchor="middle"
          className="font-mono text-[11px] uppercase tracking-wider fill-[#0E6B5C] dark:fill-[#3FB59B] font-semibold"
        >
          {content.profile.identityLine}
        </text>

        <text
          x="250"
          y="370"
          textAnchor="middle"
          className="font-mono text-[10px] fill-[#5A5A55] dark:fill-[#9E9D96]"
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
      <rect x="20" y="20" width="760" height="460" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />

      <line x1="50" y1="120" x2="750" y2="120" className="stroke-[#E4E2DC]/60 dark:stroke-[#272B27]/60" strokeWidth="1" strokeDasharray="6 6" />
      <line x1="50" y1="250" x2="750" y2="250" className="stroke-[#E4E2DC]/60 dark:stroke-[#272B27]/60" strokeWidth="1" strokeDasharray="6 6" />
      <line x1="50" y1="380" x2="750" y2="380" className="stroke-[#E4E2DC]/60 dark:stroke-[#272B27]/60" strokeWidth="1" strokeDasharray="6 6" />

      <rect x="250" y="180" width="300" height="140" className="fill-[#FFFFFF] dark:fill-[#1C201C] stroke-[#0E6B5C] dark:stroke-[#3FB59B]" strokeWidth="1" />
      <text x="400" y="240" textAnchor="middle" className="font-mono text-[14px] fill-[#1B1B1B] dark:fill-[#ECEBE6] font-semibold">
        {label}
      </text>
      <text x="400" y="270" textAnchor="middle" className="font-sans text-[11px] fill-[#5A5A55] dark:fill-[#9E9D96]">
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
              <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#0E6B5C] text-[#FAFAF7] dark:bg-[#3FB59B] dark:text-[#121412] z-10">
                Local Preview
              </span>
            )}
            {enableLightbox && (
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#121412]/80 text-[#ECEBE6] text-[11px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3" aria-hidden="true" />
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
