/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { content, Project } from '../content.ts';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram.tsx';
import { ResultsChart } from '../components/ResultsChart.tsx';
import { PlaceholderBox } from '../components/PlaceholderBox.tsx';
import { ArrowLeft, ExternalLink, Github, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

interface CaseStudyPageProps {
  slug: string;
}

export function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const project: Project | undefined = content.projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="py-16 text-center space-y-4">
        <span className="font-mono text-xs uppercase text-[#0E6B5C] dark:text-[#3FB59B]">
          404 Not Found
        </span>
        <h1 className="font-serif text-2xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6]">
          Project Not Found
        </h1>
        <p className="text-sm text-[#5A5A55] dark:text-[#9E9D96]">
          No project matches the requested slug: &ldquo;{slug}&rdquo;.
        </p>
        <a
          href="#/projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0E6B5C] dark:text-[#3FB59B] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to all projects</span>
        </a>
      </div>
    );
  }

  const isLiveDemoAvailable =
    project.links.liveDemo &&
    project.links.liveDemo !== '[ADD LINK]' &&
    project.links.liveDemo !== '[ADD]';

  const isGithubAvailable =
    project.links.github &&
    project.links.github !== '[ADD LINK]' &&
    project.links.github !== '[ADD]';

  return (
    <article className="space-y-16 sm:space-y-20 py-4" aria-labelledby="case-study-title">
      
      {/* Breadcrumb & Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96] flex items-center gap-2">
        <a href="#/projects" className="hover:text-[#0E6B5C] dark:hover:text-[#3FB59B] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Projects</span>
        </a>
        <span aria-hidden="true">/</span>
        <span className="text-[#1B1B1B] dark:text-[#ECEBE6] truncate max-w-xs sm:max-w-md">
          {project.title}
        </span>
      </nav>

      {/* Case Study Header */}
      <header className="space-y-6 border-b border-[#E4E2DC] dark:border-[#272B27] pb-8">
        
        {/* Status / Notices */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono">
          <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
            Status: {project.status}
          </span>
          {project.simulationLabel && (
            <>
              <span aria-hidden="true">/</span>
              <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-sans">
                {project.simulationLabel}
              </span>
            </>
          )}
          {project.confidentialityNote && (
            <>
              <span aria-hidden="true">/</span>
              <span className="text-[#5A5A55] dark:text-[#9E9D96] italic font-sans flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#0E6B5C] dark:text-[#3FB59B]" aria-hidden="true" />
                {project.confidentialityNote}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 id="case-study-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] leading-tight text-balance">
          {project.title}
        </h1>

        {/* Summary */}
        <p className="text-lg text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed max-w-[68ch]">
          {project.summary}
        </p>

        {/* Clean unboxed tags with typographic dot separators */}
        <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#5A5A55] dark:text-[#9E9D96] pt-2">
          <span className="font-mono text-[#1B1B1B] dark:text-[#ECEBE6]">Tags:</span>
          {project.tags.map((tag, i) => (
            <React.Fragment key={tag}>
              <span>{tag}</span>
              {i < project.tags.length - 1 && <span aria-hidden="true">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Project Links & Actions */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          {isGithubAvailable ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#FAFAF7] bg-[#1B1B1B] hover:bg-[#333333] dark:bg-[#ECEBE6] dark:text-[#121412] dark:hover:bg-[#FFFFFF] transition-colors"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span>View GitHub Repository</span>
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96] border border-[#E4E2DC] dark:border-[#272B27]">
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Code repository: [ADD]</span>
            </div>
          )}

          {isLiveDemoAvailable ? (
            <a
              href={project.links.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#FAFAF7] bg-[#0E6B5C] hover:bg-[#0A4F44] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>Launch Live Demo</span>
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-[#0E6B5C] dark:text-[#3FB59B] border border-[#0E6B5C]/30 dark:border-[#3FB59B]/30 bg-[#0E6B5C]/5 dark:bg-[#3FB59B]/10">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Live demo coming soon</span>
            </div>
          )}
        </div>

      </header>

      {/* Case Study Sections */}
      <div className="space-y-16">
        
        {/* 01. The Problem */}
        <section className="space-y-4" aria-labelledby="section-problem">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-problem" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              01. The Problem
            </h2>
          </div>
          <div className="prose max-w-[68ch]">
            <p className="text-base text-[#1B1B1B] dark:text-[#ECEBE6] leading-relaxed">
              {project.problem}
            </p>
          </div>
        </section>

        {/* 02. What I Built */}
        <section className="space-y-4" aria-labelledby="section-built">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-built" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              02. What I Built
            </h2>
          </div>
          <div className="prose max-w-[68ch]">
            <p className="text-base text-[#1B1B1B] dark:text-[#ECEBE6] leading-relaxed">
              {project.whatIBuilt}
            </p>
          </div>
        </section>

        {/* 03. Architecture Diagram (HTML/CSS) */}
        <section className="space-y-4" aria-labelledby="section-arch">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-arch" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              03. Architecture and Data Flow
            </h2>
          </div>
          <ArchitectureDiagram
            title={project.architecture.title}
            description={project.architecture.description}
            nodes={project.architecture.nodes}
          />
        </section>

        {/* 04. Data */}
        <section className="space-y-4" aria-labelledby="section-data">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-data" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              04. Dataset and Inputs
            </h2>
          </div>
          <div className="prose max-w-[68ch]">
            <p className="text-base text-[#1B1B1B] dark:text-[#ECEBE6] leading-relaxed">
              {project.data}
            </p>
          </div>
        </section>

        {/* 05. Approach */}
        <section className="space-y-4" aria-labelledby="section-approach">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-approach" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              05. Technical Approach
            </h2>
          </div>
          <div className="prose max-w-[68ch]">
            <p className="text-base text-[#1B1B1B] dark:text-[#ECEBE6] leading-relaxed">
              {project.approach}
            </p>
          </div>
        </section>

        {/* 06. Results (Chart + Table + Summary) */}
        <section className="space-y-4" aria-labelledby="section-results">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-results" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              06. Empirical Results and Benchmark
            </h2>
          </div>
          <ResultsChart results={project.results} />
        </section>

        {/* 07. How AI Tools Were Used & Checked */}
        <section className="space-y-4" aria-labelledby="section-ai">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-ai" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              07. How AI Tools Were Used and Verified
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5A5A55] dark:text-[#9E9D96] block">
                Assistance Scope
              </span>
              <p className="text-sm text-[#1B1B1B] dark:text-[#ECEBE6] leading-relaxed">
                {project.aiToolsUsage.toolsUsed}
              </p>
            </div>

            <div className="p-5 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E6B5C] dark:text-[#3FB59B]" aria-hidden="true" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
                  Verification Method
                </span>
              </div>
              <p className="text-sm text-[#1B1B1B] dark:text-[#ECEBE6] leading-relaxed">
                {project.aiToolsUsage.verificationMethod}
              </p>
            </div>
          </div>
        </section>

        {/* 08. Image Gallery */}
        <section className="space-y-6" aria-labelledby="section-gallery">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-gallery" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              08. Interface and Artifact Gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((item) => (
              <PlaceholderBox
                key={item.id}
                label="[ADD SCREENSHOT]"
                aspectRatio="16:9"
                altText={item.altText}
                caption={item.caption}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Case Study Footer Navigation */}
      <div className="pt-12 border-t border-[#E4E2DC] dark:border-[#272B27] flex items-center justify-between">
        <a
          href="#/projects"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#0E6B5C] dark:text-[#3FB59B] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Return to all projects</span>
        </a>
        <a
          href="#/contact"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#1B1B1B] dark:text-[#ECEBE6] hover:text-[#0E6B5C] dark:hover:text-[#3FB59B]"
        >
          <span>Discuss this project with Kuzivakwashe →</span>
        </a>
      </div>

    </article>
  );
}
