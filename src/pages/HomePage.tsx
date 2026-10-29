/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { content } from '../content.ts';
import { ProjectCard } from '../components/ProjectCard.tsx';
import { VisualSlot, ResultsMiniChart } from '../components/VisualSlot.tsx';
import { ArrowRight, FileText, Mail, Linkedin } from 'lucide-react';

export function HomePage() {
  const featuredProjects = content.projects.filter((p) => p.featured);
  const hasCv = Boolean(content.profile.cvUrl && content.profile.cvUrl.trim());

  return (
    <div className="space-y-20 sm:space-y-24">
      
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 pb-8 border-b border-[#E4E2DC] dark:border-[#272B27]" aria-labelledby="hero-title">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Mobile Profile Photo / Monogram (above the name on mobile, hidden on lg+) */}
          <div className="lg:hidden w-36 h-36">
            <VisualSlot
              slotId="hero-photo"
              imageUrl={content.profile.photoUrl}
              altText={content.profile.photoAlt}
              fallbackType="profileMonogram"
              aspectRatio="1:1"
              enableLightbox={true}
            />
          </div>

          {/* Left Column: Typographic Content (7/12 on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Identity line */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
                {content.profile.identityLine}
              </p>
            </div>

            {/* Full Name & Headline with fluid clamp typography */}
            <h1
              id="hero-title"
              className="font-serif font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.12] text-balance"
              style={{ fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)' }}
            >
              {content.profile.fullName}
            </h1>

            {/* Pitch with fluid clamp typography */}
            <p
              className="text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed max-w-[68ch]"
              style={{ fontSize: 'clamp(1.125rem, 0.6vw + 1rem, 1.375rem)' }}
            >
              {content.profile.pitch}
            </p>

            {/* Quiet Recruiter Proof Strip (three facts in mono type) */}
            <div className="py-2.5 border-y border-[#E4E2DC] dark:border-[#272B27]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#0E6B5C] dark:text-[#3FB59B]">
                {content.profile.proofStrip.map((fact, index) => (
                  <React.Fragment key={fact}>
                    <span className="font-medium">{fact}</span>
                    {index < content.profile.proofStrip.length - 1 && (
                      <span className="text-[#5A5A55] dark:text-[#9E9D96]" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Location and immediate availability */}
            <div className="text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96] flex flex-wrap items-center gap-x-2">
              <span>Location: {content.profile.location}</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
                {content.profile.availability}
              </span>
            </div>

            {/* Action buttons: Download CV (ONLY when cvUrl is set) and Email me */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {hasCv && (
                <a
                  href={content.profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#FAFAF7] bg-[#0E6B5C] hover:bg-[#0A4F44] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              )}

              <a
                href={`mailto:${content.profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#1B1B1B] dark:text-[#ECEBE6] bg-transparent border border-[#E4E2DC] dark:border-[#272B27] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email me</span>
              </a>

              <a
                href={content.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#5A5A55] dark:text-[#9E9D96] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6] transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual (5/12 on lg) */}
          {/* On lg: hero-photo above framed ResultsMiniChart with header "AeroTwin results" */}
          <div className="hidden lg:flex lg:col-span-5 flex-col space-y-6">
            <div className="w-64 h-64 xl:w-72 xl:h-72 aspect-square border border-[#E4E2DC] dark:border-[#272B27]">
              <VisualSlot
                slotId="hero-photo"
                imageUrl={content.profile.photoUrl}
                altText={content.profile.photoAlt}
                fallbackType="profileMonogram"
                aspectRatio="1:1"
                enableLightbox={true}
              />
            </div>

            <div className="border border-[#E4E2DC] dark:border-[#272B27] bg-[#FFFFFF] dark:bg-[#181B18] overflow-hidden">
              <div className="px-4 py-2 border-b border-[#E4E2DC] dark:border-[#272B27] flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
                  AeroTwin results
                </span>
                <span className="font-mono text-[11px] text-[#5A5A55] dark:text-[#9E9D96]">
                  RMSE 14.00
                </span>
              </div>
              <div className="aspect-[16/10] w-full">
                <ResultsMiniChart />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Currently Section (learning and availability) */}
      <section className="bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] p-6 sm:p-8" aria-labelledby="currently-title">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="currently-title" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              01. Currently
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5A5A55] dark:text-[#9E9D96] block mb-1">
                Active Certifications in Progress
              </span>
              <p className="font-serif text-base font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                {content.profile.currently.learning.join(', ')}
              </p>
            </div>

            <div className="md:col-span-8">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5A5A55] dark:text-[#9E9D96] block mb-1">
                Availability
              </span>
              <p className="text-sm text-[#5A5A55] dark:text-[#9E9D96]">
                {content.profile.currently.status}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-8" aria-labelledby="featured-projects-title">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E4E2DC] dark:border-[#272B27] pb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
                02. Selected Work
              </span>
            </div>
            <h2 id="featured-projects-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6]">
              Featured Projects
            </h2>
          </div>

          <a
            href="#/projects"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0E6B5C] dark:text-[#3FB59B] hover:underline"
          >
            <span>View all projects</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Exactly 3 project cards in specified order */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Skills Strip Section */}
      <section className="space-y-6" aria-labelledby="skills-strip-title">
        <div className="border-b border-[#E4E2DC] dark:border-[#272B27] pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              03. Technical Capabilities
            </span>
          </div>
          <h2 id="skills-strip-title" className="font-serif text-2xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6]">
            Skills and Tooling
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.skills.slice(0, 4).map((categoryGroup) => (
            <div
              key={categoryGroup.category}
              className="p-5 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-3"
            >
              <h3 className="font-serif text-sm font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                {categoryGroup.category}
              </h3>
              <ul className="text-xs text-[#5A5A55] dark:text-[#9E9D96] space-y-1.5">
                {categoryGroup.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section: Hiring for a data role in Qatar? Let's talk. */}
      <section className="p-8 sm:p-12 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] text-center space-y-6">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold block">
            Direct Inquiry
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6]">
            Hiring for a data role in Qatar? Let&apos;s talk.
          </h2>
          <p className="text-sm text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed">
            I am located in Al Wakra, Qatar and available immediately for full-time data science, machine learning, and backend positions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={`mailto:${content.profile.email}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-medium text-[#FAFAF7] bg-[#0E6B5C] hover:bg-[#0A4F44] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Email me directly</span>
          </a>

          <a
            href={content.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-medium text-[#1B1B1B] dark:text-[#ECEBE6] bg-transparent border border-[#E4E2DC] dark:border-[#272B27] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] transition-colors cursor-pointer"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </section>

    </div>
  );
}
