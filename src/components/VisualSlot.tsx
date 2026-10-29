/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Unified VisualSlot component.
 * Order of priority:
 *   1. Preview picture set on Edit pictures page (#/admin, IndexedDB/memory)
 *   2. imageUrl in content.ts
 *   3. Drawn fallback visual rendered as responsive HTML components so on-screen
 *      text size is strictly never below 12px (titles 14px, full figures >= 13px).
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

export interface VisualSlotProps {
  slotId?: string;
  imageUrl?: string;
  altText: string;
  fallbackType?: FallbackVisualType;
  projectSlug?: string;
  aspectRatio?: '16:10' | '1:1';
  objectFit?: 'cover' | 'contain';
  enableLightbox?: boolean;
  className?: string;
  variant?: 'compact' | 'full';
}

/**
 * 3a. ResultsMiniChart:
 *   - COMPACT: 3 best models only + "Full results in the case study →", no "AEROTWIN // MODEL BENCHMARKS" header
 *   - FULL: All 6 models, header, dataset note, >= 13px labels
 * Grey bars >= 3:1 against track (#8C897E vs #E4E2DC, #5A635A vs #1E231E).
 * Minimum on-screen text size: 12px in compact footnote; >= 13px everywhere else.
 */
export function ResultsMiniChart({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
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

  if (variant === 'compact') {
    const top3 = sortedData.slice(0, 3);
    const maxVal = Math.max(...top3.map((d) => d.value)) * 1.15;

    return (
      <div className="w-full h-full p-4 sm:p-5 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between select-none">
        {/* Title: 14px sans */}
        <div className="text-[14px] font-sans font-semibold text-[#1B1B1B] dark:text-[#ECEBE6] leading-tight">
          Prediction error by model (RMSE, lower is better)
        </div>

        {/* 3 best models */}
        <div className="space-y-2.5 my-2">
          {top3.map((item, i) => {
            const isBest = item.highlight || i === 0;
            const barWidthPct = Math.round((item.value / maxVal) * 100);

            return (
              <div key={item.label} className="space-y-1">
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className={`font-sans ${isBest ? 'font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]' : 'text-[#4A4A45] dark:text-[#B4B3AC]'}`}>
                    {item.label}
                  </span>
                  <span className="font-mono tabular-nums font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                    {item.value.toFixed(2)}
                  </span>
                </div>
                <div className="h-4 w-full bg-[#E4E2DC] dark:bg-[#1E231E] overflow-hidden">
                  <div
                    className={`h-full ${isBest ? 'bg-[#0B5A4D] dark:bg-[#3FB59B]' : 'bg-[#8C897E] dark:bg-[#5A635A]'}`}
                    style={{ width: `${barWidthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote link */}
        <div className="pt-2 border-t border-[#E4E2DC] dark:border-[#2E332E] text-[12px] font-mono text-[#0B5A4D] dark:text-[#3FB59B] font-semibold shrink-0 leading-tight">
          Full results in the case study →
        </div>
      </div>
    );
  }

  // FULL VARIANT (Case Study figure)
  const maxVal = Math.max(...sortedData.map((d) => d.value)) * 1.12;

  return (
    <div className="w-full h-full p-5 sm:p-6 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between select-none">
      <div>
        <div className="font-mono text-[14px] text-[#0B5A4D] dark:text-[#3FB59B] uppercase font-semibold tracking-[0.06em]">
          AeroTwin // Model Benchmarks
        </div>
        <div className="text-[14px] font-sans text-[#4A4A45] dark:text-[#B4B3AC] mt-0.5">
          Prediction error by model (RMSE, lower is better)
        </div>
        <div className="h-px bg-[#E4E2DC] dark:border-[#2E332E] my-3" />
      </div>

      <div className="space-y-3 my-2 flex-1 flex flex-col justify-center">
        {sortedData.map((item, i) => {
          const isBest = item.highlight || i === 0;
          const barWidthPct = Math.round((item.value / maxVal) * 100);

          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-baseline justify-between text-[13px]">
                <span className={`font-sans ${isBest ? 'font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]' : 'text-[#4A4A45] dark:text-[#B4B3AC]'}`}>
                  {item.label}
                </span>
                <span className="font-mono tabular-nums font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                  {item.value.toFixed(2)}
                </span>
              </div>
              <div className="h-4 sm:h-5 w-full bg-[#E4E2DC] dark:bg-[#1E231E] overflow-hidden">
                <div
                  className={`h-full ${isBest ? 'bg-[#0B5A4D] dark:bg-[#3FB59B]' : 'bg-[#8C897E] dark:bg-[#5A635A]'}`}
                  style={{ width: `${barWidthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-[#E4E2DC] dark:border-[#2E332E] text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
        Dataset: NASA C-MAPSS FD001 test set (100 engines)
      </div>
    </div>
  );
}

/**
 * 3b. PipelineDiagram:
 *   - COMPACT: Step numbers and short labels only (no sublabels), stacked, no small header
 *   - FULL: All 5 nodes, step numbers, titles, sublabels, horizontal or stacked below 700px, >= 13px labels
 */
export function PipelineDiagram({
  projectSlug = 'sensorstream',
  variant = 'compact'
}: {
  projectSlug?: string;
  variant?: 'compact' | 'full';
}) {
  const project = content.projects.find((p) => p.slug === projectSlug) || content.projects[1];
  const nodes: ArchitectureNode[] = project.architecture.nodes;

  if (variant === 'compact') {
    return (
      <div className="w-full h-full p-3 sm:p-4 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between select-none">
        <div className="text-[13px] sm:text-[14px] font-serif font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-tight shrink-0">
          System Architecture Pipeline
        </div>

        {/* 5 steps with numbers and short labels only */}
        <div className="flex flex-col justify-between gap-1 flex-1 my-1.5 min-h-0">
          {nodes.map((node, i) => (
            <div
              key={node.id}
              className="flex items-center justify-between gap-1.5 px-2.5 py-0.5 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] leading-snug"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-mono text-[12px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] tracking-[0.06em] shrink-0">
                  0{i + 1}.
                </span>
                <span className="font-sans text-[12px] sm:text-[13px] font-semibold text-[#1B1B1B] dark:text-[#ECEBE6] truncate">
                  {node.label}
                </span>
              </div>
              {i < nodes.length - 1 && (
                <span className="text-[12px] text-[#0B5A4D] dark:text-[#3FB59B] font-bold shrink-0 leading-none" aria-hidden="true">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="pt-1.5 border-t border-[#E4E2DC] dark:border-[#2E332E] text-[12px] font-mono text-[#4A4A45] dark:text-[#B4B3AC] shrink-0 leading-tight">
          5-stage data pipeline
        </div>
      </div>
    );
  }

  // FULL VARIANT (Case Study figure)
  return (
    <div className="w-full h-full p-5 sm:p-6 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between select-none">
      <div>
        <div className="font-mono text-[14px] text-[#0B5A4D] dark:text-[#3FB59B] uppercase font-semibold tracking-[0.06em]">
          System Architecture // Pipeline Flow
        </div>
        <div className="text-[14px] font-sans text-[#4A4A45] dark:text-[#B4B3AC] mt-0.5">
          {project.architecture.title}: {project.architecture.description}
        </div>
        <div className="h-px bg-[#E4E2DC] dark:border-[#2E332E] my-3" />
      </div>

      {/* Nodes Flow: 5 columns on desktop/wide, stacked on mobile (< 700px) */}
      <div className="grid grid-cols-1 min-[700px]:grid-cols-5 gap-2.5 my-3 flex-1 items-stretch">
        {nodes.map((node, i) => (
          <div
            key={node.id}
            className="p-3 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-[#E4E2DC] dark:border-[#2E332E]">
                <span className="font-mono text-[13px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] tracking-[0.06em]">
                  Step 0{i + 1}
                </span>
                {i < nodes.length - 1 && (
                  <span className="hidden min-[700px]:inline text-[13px] text-[#0B5A4D] dark:text-[#3FB59B] font-bold">
                    →
                  </span>
                )}
              </div>
              <p className="font-serif font-bold text-[14px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-snug mt-2">
                {node.label}
              </p>
              {node.sublabel && (
                <p className="font-sans text-[13px] text-[#4A4A45] dark:text-[#B4B3AC] mt-1.5 leading-normal">
                  {node.sublabel}
                </p>
              )}
            </div>
            {i < nodes.length - 1 && (
              <div className="min-[700px]:hidden text-center text-[#0B5A4D] dark:text-[#3FB59B] text-[13px] font-bold pt-1">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#E4E2DC] dark:border-[#2E332E] text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
        Diagram: Sequential data ingestion, processing, model inference, and output display
      </div>
    </div>
  );
}

/**
 * 3c. ExplainabilityDiagram (AeroTwin Figure 2):
 * One prediction linked to 4 labelled methods.
 * Rendered in HTML so text never scales below 13px.
 */
export function ExplainabilityDiagram() {
  return (
    <div className="w-full h-full p-5 sm:p-6 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between select-none">
      <div>
        <div className="font-mono text-[14px] text-[#0B5A4D] dark:text-[#3FB59B] uppercase font-semibold tracking-[0.06em]">
          AeroTwin // Explainability Framework
        </div>
        <div className="text-[14px] font-sans text-[#4A4A45] dark:text-[#B4B3AC] mt-0.5">
          Attribution, local surrogates, counterfactual scenarios, and confidence intervals
        </div>
        <div className="h-px bg-[#E4E2DC] dark:border-[#2E332E] my-3" />
      </div>

      {/* 4 Pillars around Center Prediction */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 flex-1">
        {/* SHAP */}
        <div className="p-3 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between">
          <span className="font-mono text-[14px] font-bold text-[#0B5A4D] dark:text-[#3FB59B]">
            SHAP
          </span>
          <p className="font-sans text-[13px] text-[#1B1B1B] dark:text-[#ECEBE6] mt-1 leading-snug">
            Which sensors pushed the prediction
          </p>
        </div>

        {/* LIME */}
        <div className="p-3 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between">
          <span className="font-mono text-[14px] font-bold text-[#0B5A4D] dark:text-[#3FB59B]">
            LIME
          </span>
          <p className="font-sans text-[13px] text-[#1B1B1B] dark:text-[#ECEBE6] mt-1 leading-snug">
            Local check of the explanation
          </p>
        </div>

        {/* Counterfactuals */}
        <div className="p-3 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between">
          <span className="font-mono text-[14px] font-bold text-[#0B5A4D] dark:text-[#3FB59B]">
            Counterfactuals
          </span>
          <p className="font-sans text-[13px] text-[#1B1B1B] dark:text-[#ECEBE6] mt-1 leading-snug">
            What change would alter the outcome
          </p>
        </div>

        {/* Monte Carlo Uncertainty */}
        <div className="p-3 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between">
          <span className="font-mono text-[14px] font-bold text-[#0B5A4D] dark:text-[#3FB59B]">
            Monte Carlo Uncertainty
          </span>
          <p className="font-sans text-[13px] text-[#1B1B1B] dark:text-[#ECEBE6] mt-1 leading-snug">
            Statistical confidence range
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-[#E4E2DC] dark:border-[#2E332E] text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
        Diagram: Four-pillar verification preventing model hallucination and opaque decisions
      </div>
    </div>
  );
}

/**
 * 3d. DashboardSketch (SensorStream Figure 2):
 * Wireframe panels with telemetry wave and illustration tag.
 * Text minimum 13px. High contrast.
 */
export function DashboardSketch() {
  return (
    <div className="w-full h-full p-5 sm:p-6 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between select-none">
      <div className="flex items-center justify-between pb-2 border-b border-[#E4E2DC] dark:border-[#2E332E]">
        <span className="font-mono text-[14px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
          SensorStream // Dashboard Layout Wireframe
        </span>
        <span className="font-mono text-[13px] text-[#4A4A45] dark:text-[#B4B3AC] px-2 py-0.5 border border-[#E4E2DC] dark:border-[#2E332E] bg-[#FFFFFF] dark:bg-[#1C201C]">
          Illustration
        </span>
      </div>

      {/* 4 wireframe panels */}
      <div className="grid grid-cols-2 gap-3 my-2 flex-1">
        {/* Panel 1 */}
        <div className="p-3 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between">
          <span className="font-mono text-[14px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B]">
            Active power
          </span>
          <div className="h-6 w-full flex items-center">
            <svg viewBox="0 0 100 20" className="w-full h-full stroke-[#0B5A4D] dark:stroke-[#3FB59B]" fill="none">
              <polyline points="0,15 20,8 40,16 60,4 80,12 100,6" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="p-3 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between">
          <span className="font-mono text-[14px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B]">
            Voltage
          </span>
          <div className="h-6 w-full flex items-center">
            <svg viewBox="0 0 100 20" className="w-full h-full stroke-[#1B1B1B] dark:stroke-[#ECEBE6]" fill="none">
              <polyline points="0,10 25,12 50,9 75,11 100,10" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="p-3 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between">
          <span className="font-mono text-[14px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B]">
            Sub-metering
          </span>
          <div className="flex items-end gap-1.5 h-6">
            <div className="w-1/3 bg-[#EDECE6] dark:bg-[#2E332E] h-4" />
            <div className="w-1/3 bg-[#EDECE6] dark:bg-[#2E332E] h-6" />
            <div className="w-1/3 bg-[#0B5A4D] dark:bg-[#3FB59B] h-5" />
          </div>
        </div>

        {/* Panel 4 */}
        <div className="p-3 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between">
          <span className="font-mono text-[14px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B]">
            MQTT messages
          </span>
          <div className="space-y-1">
            <div className="h-1.5 bg-[#E4E2DC] dark:bg-[#2E332E] w-full" />
            <div className="h-1.5 bg-[#E4E2DC] dark:bg-[#2E332E] w-3/4" />
            <div className="h-1.5 bg-[#0B5A4D] dark:bg-[#3FB59B] w-5/6" />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#E4E2DC] dark:border-[#2E332E] text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
        Illustration: Quad-panel telemetry monitor interface specification
      </div>
    </div>
  );
}

/**
 * 3e. ProofTiles:
 *   - COMPACT: Title line only (no sub-lines), 2x2 grid, no small header
 *   - FULL: Titles + exact 4 sub-lines:
 *       "Validated in a test environment"
 *       "Value stream mapping"
 *       "Found during value stream mapping"
 *       "User research"
 *     Caption: "Diagram: confirmed figures from the attachment".
 */
export function ProofTiles({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const tiles = [
    { title: "200+ rule test cases", sub: "Validated in a test environment" },
    { title: "12 departments interviewed", sub: "Value stream mapping" },
    { title: "7 duplicated steps found", sub: "Found during value stream mapping" },
    { title: "12 personas · 6 journey maps", sub: "User research" }
  ];

  if (variant === 'compact') {
    return (
      <div className="w-full h-full p-4 sm:p-5 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between select-none">
        <div className="text-[14px] font-serif font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-tight">
          KaribuTech Deliverables
        </div>

        {/* 4 tiles in 2x2 grid showing title line only */}
        <div className="grid grid-cols-2 gap-2 flex-1 my-2">
          {tiles.map((tile, i) => (
            <div
              key={tile.title}
              className="p-2 sm:p-2.5 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-center"
            >
              <span className="font-mono text-[12px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] tracking-[0.06em]">
                0{i + 1}.
              </span>
              <span className="font-mono text-[13px] font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-tight mt-0.5">
                {tile.title}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#E4E2DC] dark:border-[#2E332E] text-[12px] font-mono text-[#4A4A45] dark:text-[#B4B3AC] shrink-0 leading-tight">
          Confirmed figures from the attachment
        </div>
      </div>
    );
  }

  // FULL VARIANT (Case Study figure)
  return (
    <div className="w-full h-full p-5 sm:p-6 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between select-none">
      <div>
        <div className="font-mono text-[14px] text-[#0B5A4D] dark:text-[#3FB59B] uppercase font-semibold tracking-[0.06em]">
          KaribuTech AI // Commercial Banking Systems
        </div>
        <div className="text-[14px] font-sans text-[#4A4A45] dark:text-[#B4B3AC] mt-0.5">
          Key verification deliverables and departmental milestones
        </div>
        <div className="h-px bg-[#E4E2DC] dark:border-[#2E332E] my-3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 flex-1">
        {tiles.map((tile, i) => (
          <div
            key={tile.title}
            className="p-3.5 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between"
          >
            <span className="font-mono text-[13px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] tracking-[0.06em]">
              0{i + 1}.
            </span>
            <p className="font-mono text-[15px] sm:text-[16px] font-bold text-[#1B1B1B] dark:text-[#ECEBE6] my-1">
              {tile.title}
            </p>
            <p className="font-sans text-[13px] text-[#4A4A45] dark:text-[#B4B3AC]">
              {tile.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#E4E2DC] dark:border-[#2E332E] text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
        Diagram: confirmed figures from the attachment
      </div>
    </div>
  );
}

/**
 * 3f. ProfileMonogram:
 * Shows only "KJC", the line, and "Al Wakra, Qatar" (no repeated full name or identity line),
 * so nothing can be squeezed.
 */
export function ProfileMonogram({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-square overflow-hidden bg-[#F4F3EE] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] p-6 sm:p-8 flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Hairline inner square */}
      <div className="w-full h-full border border-[#E4E2DC]/80 dark:border-[#2E332E]/80 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0B5A4D] dark:text-[#3FB59B] tracking-wider">
          KJC
        </div>
        <div className="w-16 sm:w-24 h-px bg-[#0B5A4D]/60 dark:bg-[#3FB59B]/60" />
        <div className="font-mono text-[13px] sm:text-[14px] text-[#4A4A45] dark:text-[#B4B3AC]">
          {content.profile.location}
        </div>
      </div>
    </div>
  );
}

/**
 * Neutral architectural blueprint sketch
 */
export function NeutralSketch({ label = 'Project Blueprint' }: { label?: string }) {
  return (
    <div className="w-full h-full p-5 sm:p-6 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between select-none">
      <div className="h-px bg-[#E4E2DC]/60 dark:bg-[#2E332E]/60 border-dashed" />
      <div className="p-4 bg-[#FFFFFF] dark:bg-[#1C201C] border border-[#0B5A4D] dark:border-[#3FB59B] text-center my-4">
        <div className="font-mono text-[15px] font-bold text-[#1B1B1B] dark:text-[#ECEBE6]">
          {label}
        </div>
        <div className="font-sans text-[13px] text-[#4A4A45] dark:text-[#B4B3AC] mt-1">
          Architecture & Research Specification
        </div>
      </div>
      <div className="h-px bg-[#E4E2DC]/60 dark:bg-[#2E332E]/60 border-dashed" />
    </div>
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
  className = '',
  variant = 'compact'
}: VisualSlotProps) {
  const { effectiveUrl, isPreview } = usePictureSlot(slotId, imageUrl);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const aspectClass = aspectRatio === '1:1' ? 'aspect-square' : 'aspect-[16/10]';

  const renderFallback = () => {
    switch (fallbackType) {
      case 'resultsMiniChart':
        return <ResultsMiniChart variant={variant} />;
      case 'pipelineDiagram':
        return <PipelineDiagram projectSlug={projectSlug} variant={variant} />;
      case 'explainability':
        return <ExplainabilityDiagram />;
      case 'dashboardSketch':
        return <DashboardSketch />;
      case 'proofTiles':
        return <ProofTiles variant={variant} />;
      case 'profileMonogram':
        return <ProfileMonogram />;
      default:
        if (projectSlug === 'aerotwin') return <ResultsMiniChart variant={variant} />;
        if (projectSlug === 'sensorstream') return <PipelineDiagram projectSlug="sensorstream" variant={variant} />;
        if (projectSlug === 'kaributech-banking') return <ProofTiles variant={variant} />;
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
