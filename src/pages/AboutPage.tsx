/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { content } from '../content.ts';
import { VisualSlot } from '../components/VisualSlot.tsx';
import { GraduationCap, Briefcase, Globe, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-20 py-4" aria-labelledby="about-page-title">
      
      {/* Header */}
      <section className="space-y-4 border-b border-[#E4E2DC] dark:border-[#272B27] pb-8">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
            Background and History
          </p>
        </div>

        <h1 id="about-page-title" className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6]">
          About Kuzivakwashe Joshua Chawatama
        </h1>

        <p className="text-base text-[#5A5A55] dark:text-[#9E9D96] max-w-[68ch]">
          Data scientist and engineer with academic rigor and hands-on experience in commercial banking software.
        </p>
      </section>

      {/* Story & Photo Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start" aria-labelledby="story-title">
        
        {/* Photo Slot (Square crop, subtle 1px hairline border, no circle, no shadow) */}
        <div className="md:col-span-5 space-y-3">
          <div className="w-full aspect-square border border-[#E4E2DC] dark:border-[#272B27] overflow-hidden">
            <VisualSlot
              slotId="about-photo"
              imageUrl={content.profile.photoUrl}
              altText={content.profile.photoAlt}
              fallbackType="profileMonogram"
              aspectRatio="1:1"
              enableLightbox={true}
            />
          </div>

          <div className="p-4 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#5A5A55] dark:text-[#9E9D96]">Location:</span>
              <span className="text-[#1B1B1B] dark:text-[#ECEBE6]">{content.profile.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5A5A55] dark:text-[#9E9D96]">Status:</span>
              <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">{content.profile.availability}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5A5A55] dark:text-[#9E9D96]">Degree:</span>
              <span className="text-[#1B1B1B] dark:text-[#ECEBE6]">BSc Hons Data Science (2.1)</span>
            </div>
          </div>
        </div>

        {/* 3-Paragraph Story */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="story-title" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
              01. Journey from Zimbabwe to Qatar
            </h2>
          </div>

          <div className="space-y-4 text-base text-[#1B1B1B] dark:text-[#ECEBE6] leading-relaxed max-w-[68ch]">
            {content.about.paragraphs.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

      </section>

      {/* Education Section */}
      <section className="space-y-6 border-t border-[#E4E2DC] dark:border-[#272B27] pt-12" aria-labelledby="education-title">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
          <h2 id="education-title" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
            02. Formal Education
          </h2>
        </div>

        <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E4E2DC] dark:border-[#272B27] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#0E6B5C] dark:text-[#3FB59B]" aria-hidden="true" />
                <h3 className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6]">
                  {content.education.degree}
                </h3>
              </div>
              <p className="text-sm text-[#5A5A55] dark:text-[#9E9D96] mt-1">
                {content.education.institution}
              </p>
            </div>

            <div className="text-xs font-mono text-right">
              <span className="block font-semibold text-[#0E6B5C] dark:text-[#3FB59B]">
                {content.education.classification}
              </span>
              <span className="text-[#5A5A55] dark:text-[#9E9D96]">
                Graduated {content.education.graduationDate}
              </span>
            </div>
          </div>

          {/* Class 1 Results */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0E6B5C] dark:text-[#3FB59B]" aria-hidden="true" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold">
                Class 1 Academic Distinctions:
              </span>
            </div>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-[#5A5A55] dark:text-[#9E9D96]">
              {content.education.class1Results.map((subject) => (
                <li key={subject} className="flex items-start gap-2 p-2 bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27]">
                  <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-mono font-bold" aria-hidden="true">✓</span>
                  <span>{subject}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section (Newest First) */}
      <section className="space-y-6 border-t border-[#E4E2DC] dark:border-[#272B27] pt-12" aria-labelledby="experience-title">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
          <h2 id="experience-title" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
            03. Experience Timeline (Newest First)
          </h2>
        </div>

        <div className="space-y-6">
          {content.timeline.map((entry, index) => (
            <div
              key={`${entry.company}-${index}`}
              className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E4E2DC] dark:border-[#272B27] pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0E6B5C] dark:text-[#3FB59B]" aria-hidden="true" />
                  <h3 className="font-serif text-lg font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                    {entry.role}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96]">
                  {entry.period}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96]">
                <span className="font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">{entry.company}</span>
                <span aria-hidden="true">·</span>
                <span>{entry.type}</span>
              </div>

              {entry.bullets && entry.bullets.length > 0 && (
                <ul className="pt-2 space-y-2 text-xs text-[#5A5A55] dark:text-[#9E9D96] list-disc list-inside">
                  {entry.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section className="space-y-6 border-t border-[#E4E2DC] dark:border-[#272B27] pt-12" aria-labelledby="languages-title">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
          <h2 id="languages-title" className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
            04. Languages
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {content.languages.map((item) => (
            <div
              key={item.language}
              className="p-5 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-1"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0E6B5C] dark:text-[#3FB59B]" aria-hidden="true" />
                <h3 className="font-serif text-base font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                  {item.language}
                </h3>
              </div>
              <p className="text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96]">
                {item.proficiency} Proficiency
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
