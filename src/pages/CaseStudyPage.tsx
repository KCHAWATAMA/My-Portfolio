/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { content, Project } from '../content.ts';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram.tsx';
import { ResultsChart } from '../components/ResultsChart.tsx';
import { VisualSlot } from '../components/VisualSlot.tsx';
import { LightboxModal } from '../components/LightboxModal.tsx';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

interface CaseStudyPageProps {
  slug: string;
}

export function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const projectIndex = content.projects.findIndex((p) => p.slug === slug);
  const project: Project | undefined = content.projects[projectIndex];
  
  const [activeLightboxImage, setActiveLightboxImage] = useState<{
    imageUrl: string;
    altText: string;
    title?: string;
    caption?: string;
  } | null>(null);

  if (!project) {
    return (
      <div className="py-16 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
          Page Not Found
        </h1>
        <p className="text-[17px] text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6]">
          This project does not exist. Go back to the projects catalog.
        </p>
        <a
          href="#/projects"
          className="inline-flex items-center gap-1.5 min-h-[44px] px-4 text-[15px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to all projects</span>
        </a>
      </div>
    );
  }

  const prevProject = projectIndex > 0 ? content.projects[projectIndex - 1] : content.projects[content.projects.length - 1];
  const nextProject = projectIndex < content.projects.length - 1 ? content.projects[projectIndex + 1] : content.projects[0];

  const isAeroTwin = project.id === 'aerotwin';
  const hasLiveDemo = Boolean(project.links?.liveDemo && project.links.liveDemo !== '[ADD LINK]' && project.links.liveDemo !== '[ADD]');
  const hasGithub = Boolean(project.links?.github && project.links.github !== '[ADD LINK]' && project.links.github !== '[ADD]');
  const hasKeyMetric = Boolean(project.keyMetric && project.keyMetric !== '[ADD]');
  const hasLessons = Boolean(project.lessons && project.lessons.length > 0);
  const hasNextSteps = Boolean(project.nextSteps && project.nextSteps.trim());
  const galleryItems = project.gallery || [];

  return (
    <article className="space-y-16 sm:space-y-20 py-4" aria-labelledby="case-study-title">
      
      {/* Breadcrumb & Navigation */}
      <nav aria-label="Breadcrumb" className="text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC] flex items-center gap-2">
        <a href="#/projects" className="hover:text-[#0B5A4D] dark:hover:text-[#3FB59B] flex items-center gap-1 min-h-[24px] py-1">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Projects</span>
        </a>
        <span aria-hidden="true">/</span>
        <span className="text-[#1B1B1B] dark:text-[#ECEBE6] truncate max-w-xs sm:max-w-md font-semibold">
          {project.title}
        </span>
      </nav>

      {/* Case Study Header */}
      <header className="space-y-6 border-b border-[#E4E2DC] dark:border-[#2E332E] pb-8">
        
        {/* 1. Reading time & Status metadata at the very top */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 text-[13px] font-mono">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold" style={{ letterSpacing: '0.06em' }}>
              Status: {project.status}
            </span>
            {project.simulationLabel && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-sans">
                  {project.simulationLabel}
                </span>
              </>
            )}
            {project.confidentialityNote && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-[#4A4A45] dark:text-[#B4B3AC] italic font-sans flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-[#0B5A4D] dark:text-[#3FB59B]" aria-hidden="true" />
                  {project.confidentialityNote}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[#4A4A45] dark:text-[#B4B3AC] font-mono text-[13px]">
            <Clock className="w-4 h-4 text-[#0B5A4D] dark:text-[#3FB59B]" aria-hidden="true" />
            <span>{project.readingTime || '4 min read'}</span>
          </div>
        </div>

        {/* Title */}
        <h1 id="case-study-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2] text-balance">
          {project.title}
        </h1>

        {/* Summary */}
        <p className="text-lg sm:text-xl text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6] max-w-[68ch]">
          {project.summary}
        </p>

        {/* Clean unboxed tags with typographic dot separators */}
        <div className="flex flex-wrap items-center gap-x-2 text-[13px] text-[#4A4A45] dark:text-[#B4B3AC] pt-1">
          <span className="font-mono text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold" style={{ letterSpacing: '0.06em' }}>Tags:</span>
          {project.tags.map((tag, i) => (
            <React.Fragment key={tag}>
              <span>{tag}</span>
              {i < project.tags.length - 1 && <span aria-hidden="true">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* 2. Summary Box (My role, Tools, Outcome, Links) - consistent 24px padding */}
        <div className="mt-8 p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] space-y-4">
          <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold block">
            Summary Overview
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[15px]">
            <div className="space-y-3">
              <div>
                <span className="font-mono text-[#4A4A45] dark:text-[#B4B3AC] block uppercase tracking-[0.06em] text-[13px] mb-0.5">
                  My Role
                </span>
                <p className="font-serif text-base font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                  {project.role}
                </p>
              </div>

              <div>
                <span className="font-mono text-[#4A4A45] dark:text-[#B4B3AC] block uppercase tracking-[0.06em] text-[13px] mb-0.5">
                  Tools
                </span>
                <p className="text-[14px] text-[#1B1B1B] dark:text-[#ECEBE6] font-mono">
                  {project.tools}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {hasKeyMetric && (
                <div>
                  <span className="font-mono text-[#4A4A45] dark:text-[#B4B3AC] block uppercase tracking-[0.06em] text-[13px] mb-0.5">
                    Outcome
                  </span>
                  <p className="font-mono font-semibold text-base text-[#0B5A4D] dark:text-[#3FB59B]">
                    {project.keyMetric}
                  </p>
                </div>
              )}

              {(hasGithub || hasLiveDemo || isAeroTwin) && (
                <div>
                  <span className="font-mono text-[#4A4A45] dark:text-[#B4B3AC] block uppercase tracking-[0.06em] text-[13px] mb-1">
                    Links
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {hasGithub && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center min-h-[44px] gap-2 px-4 py-2 text-[14px] font-medium text-[#FAFAF7] bg-[#1B1B1B] hover:bg-[#333333] dark:bg-[#ECEBE6] dark:text-[#121412] dark:hover:bg-[#FFFFFF] transition-colors focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {hasLiveDemo ? (
                      <a
                        href={project.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center min-h-[44px] gap-2 px-4 py-2 text-[14px] font-medium text-[#FAFAF7] bg-[#0B5A4D] hover:bg-[#08453B] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span>Live demo</span>
                      </a>
                    ) : isAeroTwin ? (
                      <span className="inline-flex items-center min-h-[44px] gap-2 px-4 py-2 text-[13px] font-mono text-[#0B5A4D] dark:text-[#3FB59B] border border-[#0B5A4D]/30 dark:border-[#3FB59B]/30 bg-[#0B5A4D]/5 dark:bg-[#3FB59B]/10">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        <span>Live demo coming soon</span>
                      </span>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </header>

      {/* Case Study Sections in Exact D12 Order */}
      <div className="space-y-16">
        
        {/* 3. The Problem */}
        <section className="space-y-4" aria-labelledby="section-problem">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-problem" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
              01. The Problem
            </h2>
          </div>
          <div className="max-w-[68ch]">
            <p className="text-[17px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.6]">
              {project.problem}
            </p>
          </div>
        </section>

        {/* 4. What I Built */}
        <section className="space-y-6" aria-labelledby="section-built">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-built" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
              02. What I Built
            </h2>
          </div>
          <div className="max-w-[68ch]">
            <p className="text-[17px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.6]">
              {project.whatIBuilt}
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="pt-2">
            <ArchitectureDiagram
              title={project.architecture.title}
              description={project.architecture.description}
              nodes={project.architecture.nodes}
            />
          </div>
        </section>

        {/* 5. Data */}
        <section className="space-y-4" aria-labelledby="section-data">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-data" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
              03. Dataset and Inputs
            </h2>
          </div>
          <div className="max-w-[68ch]">
            <p className="text-[17px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.6]">
              {project.data}
            </p>
          </div>
        </section>

        {/* 6. Approach */}
        <section className="space-y-4" aria-labelledby="section-approach">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-approach" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
              04. Technical Approach
            </h2>
          </div>
          <div className="max-w-[68ch]">
            <p className="text-[17px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.6]">
              {project.approach}
            </p>
          </div>
        </section>

        {/* 7. Results (ResultsChart with F24 chart specs) */}
        <section className="space-y-4" aria-labelledby="section-results">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-results" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
              05. Empirical Results and Benchmark
            </h2>
          </div>
          <ResultsChart results={project.results} />
        </section>

        {/* 8. Challenges and what I learned (conditional: shown ONLY when filled) */}
        {hasLessons && (
          <section className="space-y-4" aria-labelledby="section-lessons">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
              <h2 id="section-lessons" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
                06. Challenges and what I learned
              </h2>
            </div>
            <ul className="space-y-2 text-[17px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.6] list-disc list-inside max-w-[68ch]">
              {project.lessons?.map((lesson, i) => (
                <li key={i}>{lesson}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 9. How AI Tools Were Used & Checked */}
        <section className="space-y-4" aria-labelledby="section-ai">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="section-ai" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
              {hasLessons ? "07. How AI Tools Were Used and Verified" : "06. How AI Tools Were Used and Verified"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] space-y-2">
              <span className="text-[13px] font-mono uppercase tracking-[0.06em] text-[#4A4A45] dark:text-[#B4B3AC] block font-semibold">
                Assistance Scope
              </span>
              <p className="text-[15px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.6]">
                {project.aiToolsUsage.toolsUsed}
              </p>
            </div>

            <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0B5A4D] dark:text-[#3FB59B]" aria-hidden="true" />
                <span className="text-[13px] font-mono uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
                  Verification Method
                </span>
              </div>
              <p className="text-[15px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.6]">
                {project.aiToolsUsage.verificationMethod}
              </p>
            </div>
          </div>
        </section>

        {/* 10. Visual Artifact Gallery (using VisualSlot in fixed 16:10 frame with slotId) */}
        {galleryItems.length > 0 && (
          <section className="space-y-6" aria-labelledby="section-gallery">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
              <h2 id="section-gallery" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
                {hasLessons ? "08. Visual Artifact Gallery" : "07. Visual Artifact Gallery"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {galleryItems.map((item) => (
                <figure key={item.id} className="w-full space-y-2">
                  <div className="border border-[#E4E2DC] dark:border-[#2E332E]">
                    <VisualSlot
                      slotId={item.slotId}
                      imageUrl={item.imageUrl}
                      altText={item.altText}
                      fallbackType={item.fallbackType}
                      projectSlug={project.slug}
                      variant="full"
                      aspectRatio="16:10"
                      objectFit="contain"
                      enableLightbox={true}
                    />
                  </div>
                  {item.caption && (
                    <figcaption className="text-[13px] text-[#4A4A45] dark:text-[#B4B3AC] font-sans leading-relaxed">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* 11. Next steps */}
        {hasNextSteps && (
          <section className="space-y-4" aria-labelledby="section-next-steps">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
              <h2 id="section-next-steps" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
                {hasLessons ? "09. Next Steps" : "08. Next Steps"}
              </h2>
            </div>
            <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] space-y-2">
              <p className="text-[17px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.6] max-w-[68ch]">
                {project.nextSteps}
              </p>
            </div>
          </section>
        )}

      </div>

      {/* 12. Previous and Next Project Navigation Links - consistent 24px padding & hover lift */}
      <div className="pt-12 border-t border-[#E4E2DC] dark:border-[#2E332E] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`#/projects/${prevProject.slug}`}
            className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] hover:-translate-y-0.5 transition-all duration-150 motion-reduce:hover:translate-y-0 motion-reduce:transition-none group focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
          >
            <span className="block font-mono text-[13px] uppercase tracking-[0.06em] text-[#4A4A45] dark:text-[#B4B3AC] mb-1 flex items-center gap-1.5 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
              <span>Previous Project</span>
            </span>
            <span className="font-serif text-base font-bold text-[#1B1B1B] dark:text-[#ECEBE6] group-hover:text-[#0B5A4D] dark:group-hover:text-[#3FB59B] transition-colors line-clamp-1 leading-[1.2]">
              {prevProject.title}
            </span>
          </a>

          <a
            href={`#/projects/${nextProject.slug}`}
            className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] hover:-translate-y-0.5 transition-all duration-150 motion-reduce:hover:translate-y-0 motion-reduce:transition-none text-right group focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
          >
            <span className="block font-mono text-[13px] uppercase tracking-[0.06em] text-[#4A4A45] dark:text-[#B4B3AC] mb-1 flex items-center justify-end gap-1.5 font-semibold">
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span className="font-serif text-base font-bold text-[#1B1B1B] dark:text-[#ECEBE6] group-hover:text-[#0B5A4D] dark:group-hover:text-[#3FB59B] transition-colors line-clamp-1 leading-[1.2]">
              {nextProject.title}
            </span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <a
            href="#/projects"
            className="inline-flex items-center min-h-[44px] gap-2 text-[15px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] hover:underline focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Return to all projects</span>
          </a>
          <a
            href="#/contact"
            className="inline-flex items-center min-h-[44px] gap-2 text-[15px] font-semibold text-[#1B1B1B] dark:text-[#ECEBE6] hover:text-[#0B5A4D] dark:hover:text-[#3FB59B] focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
          >
            <span>Discuss this project with Kuzivakwashe →</span>
          </a>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <LightboxModal
        isOpen={Boolean(activeLightboxImage)}
        onClose={() => setActiveLightboxImage(null)}
        imageUrl={activeLightboxImage?.imageUrl || ''}
        altText={activeLightboxImage?.altText || ''}
        title={activeLightboxImage?.title}
        caption={activeLightboxImage?.caption}
      />

    </article>
  );
}
