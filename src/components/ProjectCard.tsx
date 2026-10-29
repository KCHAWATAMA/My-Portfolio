/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Project } from '../content.ts';
import { VisualSlot } from './VisualSlot.tsx';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const caseStudyUrl = `#/projects/${project.slug}`;
  const hasKeyMetric = Boolean(project.keyMetric && project.keyMetric !== '[ADD]');

  return (
    <article className="group relative flex flex-col justify-between h-full bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] hover:-translate-y-0.5 transition-all duration-150 motion-reduce:hover:translate-y-0 motion-reduce:transition-none overflow-hidden focus-within:ring-2 focus-within:ring-[#0B5A4D] dark:focus-within:ring-[#3FB59B]">
      
      {/* Visual slot (fixed 16:10 frame, real image if provided, otherwise theme-aware SVG) */}
      <div className="block overflow-hidden border-b border-[#E4E2DC] dark:border-[#2E332E]">
        <VisualSlot
          slotId={project.cardSlotId}
          imageUrl={project.imageUrl}
          altText={project.title}
          fallbackType={project.fallbackType}
          projectSlug={project.slug}
          objectFit="cover"
        />
      </div>

      {/* Card Body with consistent 24px (p-6) padding and equal height layout */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        
        <div className="space-y-3">
          {/* Editorial index & Special notice labels */}
          <div className="flex flex-wrap items-center gap-x-2 text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
            {typeof index === 'number' && (
              <>
                <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold" style={{ letterSpacing: '0.06em' }}>
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <span aria-hidden="true">/</span>
              </>
            )}
            {project.simulationLabel && (
              <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-sans">
                {project.simulationLabel}
              </span>
            )}
            {project.confidentialityNote && (
              <span className="text-[#4A4A45] dark:text-[#B4B3AC] font-sans italic">
                {project.confidentialityNote}
              </span>
            )}
          </div>

          {/* Title in Source Serif 4 - whole card anchor */}
          <h3 className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2] group-hover:text-[#0B5A4D] dark:group-hover:text-[#3FB59B] transition-colors">
            <a href={caseStudyUrl} className="after:absolute after:inset-0 outline-none focus:outline-none flex items-start justify-between gap-2">
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 shrink-0 mt-0.5 text-[#4A4A45] dark:text-[#B4B3AC] group-hover:text-[#0B5A4D] dark:group-hover:text-[#3FB59B] transition-colors" aria-hidden="true" />
            </a>
          </h3>

          {/* One-line summary */}
          <p className="text-[15px] text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6]">
            {project.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E4E2DC] dark:border-[#2E332E] space-y-3">
          {/* Clean unboxed tags with typographic dot separators */}
          <div className="flex flex-wrap items-center gap-x-2 text-[13px] text-[#4A4A45] dark:text-[#B4B3AC]">
            {project.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {i < project.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Key result in monospace (hidden if empty/missing) */}
          {hasKeyMetric && (
            <div className="flex items-center justify-between text-[13px] pt-1">
              <span className="text-[#4A4A45] dark:text-[#B4B3AC] font-sans">
                Key Metric:
              </span>
              <span className="font-mono tabular-nums font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                {project.keyMetric}
              </span>
            </div>
          )}

          {/* Case study link text */}
          <div className="pt-2">
            <span className="inline-flex items-center text-[13px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] group-hover:underline">
              Read full case study →
            </span>
          </div>
        </div>

      </div>

    </article>
  );
}
