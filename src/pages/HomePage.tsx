/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { content } from '../content.ts';
import { ProjectCard } from '../components/ProjectCard.tsx';
import { ArrowRight, FileText, Mail } from 'lucide-react';

export function HomePage() {
  const featuredProjects = content.projects.filter((p) => p.featured);

  return (
    <div className="space-y-20 sm:space-y-24">
      
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 pb-4 border-b border-[#E4E2DC] dark:border-[#272B27]" aria-labelledby="hero-title">
        <div className="max-w-4xl space-y-6">
          
          {/* Identity line */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <p className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              {content.profile.identityLine}
            </p>
          </div>

          {/* Full Name & Headline */}
          <h1 id="hero-title" className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.15] text-balance">
            {content.profile.fullName}
          </h1>

          {/* Pitch */}
          <p className="text-lg sm:text-xl text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed max-w-[68ch]">
            {content.profile.pitch}
          </p>

          {/* Location and immediate status */}
          <div className="text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96] flex flex-wrap items-center gap-x-2">
            <span>Location: {content.profile.location}</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              {content.profile.availability}
            </span>
          </div>

          {/* Action buttons: Download CV with Email me right beside it */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#FAFAF7] bg-[#0E6B5C] hover:bg-[#0A4F44] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Download CV</span>
            </a>

            <a
              href={`mailto:${content.profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#1B1B1B] dark:text-[#ECEBE6] bg-transparent border border-[#E4E2DC] dark:border-[#272B27] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Email me</span>
            </a>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

    </div>
  );
}
