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
    <div className="space-y-16 lg:space-y-24">
      
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 pb-8 border-b border-[#E4E2DC] dark:border-[#2E332E]" aria-labelledby="hero-title">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Mobile Profile Photo / Monogram (above name on mobile, hidden on lg+) */}
          <div className="lg:hidden w-36 h-36 border border-[#E4E2DC] dark:border-[#2E332E]">
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
              <span className="w-8 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
              <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
                {content.profile.identityLine}
              </p>
            </div>

            {/* Full Name & Headline with fluid clamp typography */}
            <h1
              id="hero-title"
              className="font-serif font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2] text-balance"
              style={{ fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)' }}
            >
              {content.profile.fullName}
            </h1>

            {/* Pitch with fluid clamp typography */}
            <p
              className="text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6] max-w-[68ch]"
              style={{ fontSize: 'clamp(1.125rem, 0.6vw + 1rem, 1.375rem)' }}
            >
              {content.profile.pitch}
            </p>

            {/* Quiet Recruiter Proof Strip (three facts in mono type) */}
            <div className="py-3 border-y border-[#E4E2DC] dark:border-[#2E332E]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-mono text-[#0B5A4D] dark:text-[#3FB59B]" style={{ letterSpacing: '0.06em' }}>
                {content.profile.proofStrip.map((fact, index) => (
                  <React.Fragment key={fact}>
                    <span className="font-semibold">{fact}</span>
                    {index < content.profile.proofStrip.length - 1 && (
                      <span className="text-[#4A4A45] dark:text-[#B4B3AC]" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Location and immediate availability */}
            <div className="text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC] flex flex-wrap items-center gap-x-2">
              <span>Location: {content.profile.location}</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
                {content.profile.availability}
              </span>
            </div>

            {/* Action buttons: Min 44px height */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {hasCv && (
                <a
                  href={content.profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 text-[15px] font-medium text-[#FAFAF7] bg-[#0B5A4D] hover:bg-[#08453B] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              )}

              <a
                href={`mailto:${content.profile.email}`}
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 text-[15px] font-medium text-[#1B1B1B] dark:text-[#ECEBE6] bg-transparent border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email me</span>
              </a>

              <a
                href={content.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 text-[15px] font-medium text-[#4A4A45] dark:text-[#B4B3AC] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6] transition-colors focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual (5/12 on lg) */}
          {/* C6: Monogram/photo and results panel share the exact same width and left edge, with 24px gap */}
          <div className="hidden lg:flex lg:col-span-5 flex-col space-y-6 w-full max-w-[420px] ml-auto">
            <div className="w-full aspect-square border border-[#E4E2DC] dark:border-[#2E332E] overflow-hidden">
              <VisualSlot
                slotId="hero-photo"
                imageUrl={content.profile.photoUrl}
                altText={content.profile.photoAlt}
                fallbackType="profileMonogram"
                aspectRatio="1:1"
                enableLightbox={true}
              />
            </div>

            <div className="w-full border border-[#E4E2DC] dark:border-[#2E332E] bg-[#FFFFFF] dark:bg-[#181B18] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#E4E2DC] dark:border-[#2E332E] flex items-center justify-between">
                <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
                  AeroTwin results
                </span>
                <span className="font-mono text-[13px] text-[#4A4A45] dark:text-[#B4B3AC]">
                  RMSE 14.00
                </span>
              </div>
              <div className="aspect-[16/10] w-full">
                <ResultsMiniChart variant="compact" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Currently Section (learning and availability) */}
      <section className="bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] p-6 sm:p-8" aria-labelledby="currently-title">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="currently-title" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
              01. Currently
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-[13px] font-mono uppercase tracking-[0.06em] text-[#4A4A45] dark:text-[#B4B3AC] block mb-1">
                Active Certifications in Progress
              </span>
              <p className="font-serif text-lg font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
                {content.profile.currently.learning.join(', ')}
              </p>
            </div>

            <div className="md:col-span-8">
              <span className="text-[13px] font-mono uppercase tracking-[0.06em] text-[#4A4A45] dark:text-[#B4B3AC] block mb-1">
                Availability
              </span>
              <p className="text-[15px] text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6]">
                {content.profile.currently.status}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-6" aria-labelledby="featured-projects-title">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E4E2DC] dark:border-[#2E332E] pb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
              <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
                02. Selected Work
              </span>
            </div>
            <h2 id="featured-projects-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
              Featured Projects
            </h2>
          </div>

          <a
            href="#/projects"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] hover:underline focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
        <div className="border-b border-[#E4E2DC] dark:border-[#2E332E] pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
            <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
              03. Technical Capabilities
            </span>
          </div>
          <h2 id="skills-strip-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
            Skills and Tooling
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {content.skills.slice(0, 4).map((categoryGroup) => (
            <div
              key={categoryGroup.category}
              className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] hover:-translate-y-0.5 transition-all duration-150 motion-reduce:hover:translate-y-0 motion-reduce:transition-none space-y-3 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2] mb-3">
                  {categoryGroup.category}
                </h3>
                <ul className="text-[15px] text-[#4A4A45] dark:text-[#B4B3AC] space-y-2">
                  {categoryGroup.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section: Hiring for a data role in Qatar? Let's talk. */}
      <section className="p-8 sm:p-12 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] text-center space-y-6">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold block">
            Direct Inquiry
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
            Hiring for a data role in Qatar? Let&apos;s talk.
          </h2>
          <p className="text-[17px] text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6]">
            I am located in Al Wakra, Qatar and available immediately for full-time data science, machine learning, and backend positions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={`mailto:${content.profile.email}`}
            className="inline-flex items-center justify-center min-h-[44px] gap-2 px-6 py-2.5 text-[15px] font-medium text-[#FAFAF7] bg-[#0B5A4D] hover:bg-[#08453B] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Email me directly</span>
          </a>

          <a
            href={content.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] gap-2 px-6 py-2.5 text-[15px] font-medium text-[#1B1B1B] dark:text-[#ECEBE6] bg-transparent border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </section>

    </div>
  );
}
