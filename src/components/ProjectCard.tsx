/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Project } from '../content.ts';
import { PlaceholderBox } from './PlaceholderBox.tsx';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const caseStudyUrl = `#/projects/${project.slug}`;

  return (
    <article className="group flex flex-col bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] hover:border-[#0E6B5C] dark:hover:border-[#3FB59B] transition-colors">
      
      {/* Screenshot / Visual slot */}
      <a href={caseStudyUrl} className="block overflow-hidden focus:outline-hidden" tabIndex={-1} aria-hidden="true">
        <PlaceholderBox
          label="[ADD SCREENSHOT]"
          aspectRatio="16:9"
          altText={`Screenshot placeholder for ${project.title}`}
          imageUrl={project.gallery?.[0]?.imageUrl}
          className="border-b border-[#E4E2DC] dark:border-[#272B27]"
        />
      </a>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        
        <div className="space-y-3">
          {/* Editorial index & Special notice labels (clean, unboxed text) */}
          <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96]">
            {typeof index === 'number' && (
              <>
                <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <span aria-hidden="true">/</span>
              </>
            )}
            {project.simulationLabel && (
              <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-sans">
                {project.simulationLabel}
              </span>
            )}
            {project.confidentialityNote && (
              <span className="text-[#5A5A55] dark:text-[#9E9D96] font-sans italic">
                {project.confidentialityNote}
              </span>
            )}
          </div>

          {/* Title in Source Serif 4 */}
          <h3 className="font-serif text-xl font-semibold text-[#1B1B1B] dark:text-[#ECEBE6] leading-snug group-hover:text-[#0E6B5C] dark:group-hover:text-[#3FB59B] transition-colors">
            <a href={caseStudyUrl} className="focus:underline flex items-start justify-between gap-2">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0 mt-1 text-[#5A5A55] dark:text-[#9E9D96] group-hover:text-[#0E6B5C] dark:group-hover:text-[#3FB59B] transition-colors" aria-hidden="true" />
            </a>
          </h3>

          {/* One-line summary */}
          <p className="text-sm text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E4E2DC] dark:border-[#272B27] space-y-3">
          {/* Clean unboxed tags with typographic dot separators */}
          <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#5A5A55] dark:text-[#9E9D96]">
            {project.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {i < project.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Key result in monospace */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#5A5A55] dark:text-[#9E9D96] font-sans">
              Key Metric:
            </span>
            <span className="font-mono tabular-nums font-medium text-[#1B1B1B] dark:text-[#ECEBE6]">
              {project.keyMetric}
            </span>
          </div>

          {/* Case study link text */}
          <div className="pt-2">
            <a
              href={caseStudyUrl}
              className="inline-flex items-center text-xs font-medium text-[#0E6B5C] dark:text-[#3FB59B] hover:underline"
            >
              Read full case study →
            </a>
          </div>
        </div>

      </div>

    </article>
  );
}
